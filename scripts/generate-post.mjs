import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// コマンドライン引数を取得
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('使用方法: node scripts/generate-post.js <カテゴリパス> <ファイル名>');
  console.error('例: node scripts/generate-post.js docs/posts my-new-article');
  process.exit(1);
}

const targetPath = args[0];
const fileName = args[1];


// 今日の日付を YYYY-MM-DD 形式で取得
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
const day = String(today.getDate()).padStart(2, '0');
const fullPath = path.join(process.cwd(), 'src', targetPath, `${year}-${month}-${fileName}.md`);
const formattedDate = `${year}-${month}-${day} 19:00:00`; // 時刻は固定で19:00:00に設定

// Markdownのコンテンツ
const content = `---
title: 
lastUpdated: ${formattedDate}
published: ${formattedDate}
---`

// ディレクトリが存在しない場合は作成
fs.mkdirSync(path.dirname(fullPath), { recursive: true });

// ファイルを書き込み
fs.writeFileSync(fullPath, content, 'utf8');

console.log(`✨ Markdownファイルが生成されました: ${fullPath}`);

