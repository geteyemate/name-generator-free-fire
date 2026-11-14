export const INVISIBLE_SPACE = '\u3164';

export const quickSymbols = [
  '꧁', '꧂', '亗', 'Ⓥ', '༒︎', '★', '⚡', '♛', '♚', '鄉', 'ツ', 'メ',
  '『', '』', '【', '】', '╰‿╯', '✿', '☠︎', '⚔︎', '✞', '❖', '✦', '☬',
  '๖ۣۜ', '爪', '༾', '༿', 'ᵀᴹ', 'ᵍᵒᵈ', '𝕯', '♚', ' ⊗ ', ' ℳ ', ' 𝓡 ',
  '🔥', '💎', '🎯', '⚡', '🚀', '👑', '🐉', '⚡', '★', '⚡', '🔥', '🛡️'
];

export const leftSymbols = [
  '꧁༺', '亗', '⚡', '★', '༒︎', '╰‿╯', 'Ⓥ', '♛', '鄉',
  '『', '【', 'ᶦ﹜', '༺', '༒', '♞', 'メ', '爪', '༾',
  '๖ۣۜ', '☠︎', '⚔︎', '❖', '✦', '☬', '𝕯𝖔𝖒', ' ⊗ ', ' ℳ '
];

export const rightSymbols = [
  '༻꧂', '亗', '⚡', '★', '༒︎', '╰‿╯', 'ᵀᴹ', '♛', '鄉',
  '』', '】', 'ᵍᵒᵈ', '༻', '༒', '♚', 'ツ', '爪', '༿',
  '₣', '☠︎', '⚔︎', '❖', '✦', '☬', ' 𝕬𝖗𝖙', ' ⊗ ', ' 𝓡 '
];

const fontMaps = {
  smallCaps: { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ' },
  gothic: { a: '𝖆', b: '𝖇', c: '𝖈', d: '𝖉', e: '𝖊', f: '𝖋', g: '𝖌', h: '𝖍', i: '𝖎', j: '𝖏', k: '𝖐', l: '𝖑', m: '𝖒', n: '𝖓', o: '𝖔', p: '𝖕', q: '𝖖', r: '𝖗', s: '𝖘', t: '𝖙', u: '𝖚', v: '𝖛', w: '𝖜', x: '𝖝', y: '𝖞', z: '𝖟' },
  cursive: { a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃' },
  boldSans: { a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇' },
  circle: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ' }
};

export function transformText(text, fontKey) {
  if (!fontKey || fontKey === 'normal' || !fontMaps[fontKey]) return text;
  const map = fontMaps[fontKey];
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}

export function generateAllPool(baseName) {
  const pool = new Set();

  Object.keys(fontMaps).forEach(fontKey => {
    const styled = transformText(baseName, fontKey);
    pool.add(`亗 ${styled} 亗`);
    pool.add(`꧁༺ ${styled} ༻꧂`);
    pool.add(`『 ${styled} 』`);
    pool.add(`༒︎ ${styled} ༒︎`);
    pool.add(`⚡ ${styled} ⚡`);
    pool.add(`★ ${styled} ★`);
    pool.add(`Ⓥ ${styled}`);
    pool.add(`${styled} ᵀᴹ`);
  });

  for (let i = 0; i < 50; i++) {
    const l = leftSymbols[Math.floor(Math.random() * leftSymbols.length)];
    const r = rightSymbols[Math.floor(Math.random() * rightSymbols.length)];
    const fontKeys = Object.keys(fontMaps);
    const randomFont = fontKeys[Math.floor(Math.random() * fontKeys.length)];
    const variants = [baseName, baseName.toUpperCase(), transformText(baseName, randomFont)];
    const mid = variants[Math.floor(Math.random() * variants.length)];
    pool.add(`${l} ${mid} ${r}`);
  }

  return Array.from(pool);
}
