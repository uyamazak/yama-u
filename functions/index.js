/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 1});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const {AuthorizationCode} = require("simple-oauth2");

const app = express();


// --- Secret を使用する設定 ---
exports.oauth = onRequest({
  secrets: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"], // ここで使用するSecret名を指定
}, (req, res) => {
  console.log("process.env.GITHUB_CLIENT_ID", process.env.GITHUB_CLIENT_ID);
  console.log("process.env.GITHUB_CLIENT_SECRET.length",
      process.env.GITHUB_CLIENT_SECRET.length);
  const config = {
    client: {
      id: process.env.GITHUB_CLIENT_ID, // Client IDは公開情報なので直書きでもOK
      // process.env から Secret を取得
      secret: process.env.GITHUB_CLIENT_SECRET,
    },
    auth: {
      tokenHost: "https://github.com",
      tokenPath: "/login/oauth/access_token",
      authorizePath: "/login/oauth/authorize",
    },
  };

  const client = new AuthorizationCode(config);

  /**
   * 認証開始エンドポイント: [base_url]/auth
   */
  app.get("/auth", (req, res) => {
    const authorizationUri = client.authorizeURL({
      // ここのURLは GitHub 側の 'Authorization callback URL' と一致させる必要があります
      redirect_uri: `https://us-central1-yama-u.cloudfunctions.net/oauth/callback`,
      scope: "repo,user",
    });
    res.redirect(authorizationUri);
  });

  /**
   * コールバックエンドポイント: [base_url]/callback
   */
  app.get("/callback", async (req, res) => {
    const {code} = req.query;

    try {
      const accessToken = await client.getToken({
        code,
        redirect_uri: `https://us-central1-yama-u.cloudfunctions.net/oauth/callback`,
      });

      const token = accessToken.token.access_token;
      if (!token) {
        throw new Error("Token not found in response");
      }
      // Decap CMS が待機しているウィンドウにポストメッセージを送るためのHTMLを返す
      res.send(`
        <!DOCTYPE html>
        <html>
        <body>
          <script>
            (function() {
              function recieveMessage(e) {
                // GitHubへの認証成功を CMS 側に伝える
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({
    token: token,
    provider: "github",
  })}',
                  e.origin
                );
              }
              window.addEventListener("message", recieveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
        </body>
        </html>
      `);
    } catch (error) {
      console.error("Access Token Error", error.message);
      res.status(500).send("Authentication failed");
    }
  });
  // Expressをハンドリング
  return app(req, res);
});
