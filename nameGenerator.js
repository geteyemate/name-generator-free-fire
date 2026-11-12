// Simple decorative symbols mapping
const leftDecorations = ['꧁༺', '亗', '⚡', '★', '༒︎', '🔥', '╰‿╯', 'Ⓥ', '♛', '鄉'];
const rightDecorations = ['༻꧂', '亗', '⚡', '★', '༒︎', '🔥', '╰‿╯', 'ᵀᴹ', '♛', '鄉'];

// Unicode stylish font mapping
const smallCaps = { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: '🇽', y: 'ʏ', z: 'ᴢ' };

function applyFont(text, fontMap) {
  return text.toLowerCase().split('').map(char => fontMap[char] || char).join('');
}

export function generateStylishNames(baseName) {
  const generatedList = [];
  
  // 1. Decorative styles
  for (let i = 0; i < 8; i++) {
    const lDec = leftDecorations[Math.floor(Math.random() * leftDecorations.length)];
    const rDec = rightDecorations[Math.floor(Math.random() * rightDecorations.length)];
    generatedList.push(`${lDec} ${baseName} ${rDec}`);
  }
  
  // 2. Font applied style example
  const styledBase = applyFont(baseName, smallCaps);
  generatedList.push(`亗 ${styledBase} 亗`);
  generatedList.push(`★ ${styledBase} ★`);
  
  // Add more logic here as needed
  
  return generatedList;
}
