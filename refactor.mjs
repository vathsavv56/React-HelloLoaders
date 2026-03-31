import fs from 'fs';
import path from 'path';

const loadersDir = './src/loaders';
const files = fs.readdirSync(loadersDir).filter(f => f.endsWith('.tsx'));

const oldRegex1 = /className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0 relative"/g;
const oldRegex2 = /className="w-full h-screen bg-black flex justify-center items-center overflow-hidden m-0 p-0"/g;

const newClass = 'className="w-full min-h-[400px] sm:min-h-[500px] h-full bg-black flex flex-col justify-center items-center overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative"';

let changedCount = 0;

for (const file of files) {
  const filePath = path.join(loadersDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (oldRegex1.test(content) || oldRegex2.test(content)) {
    content = content.replace(oldRegex1, newClass);
    content = content.replace(oldRegex2, newClass);
    fs.writeFileSync(filePath, content, 'utf-8');
    changedCount++;
  }
}

console.log(`Refactored ${changedCount} files successfully.`);
