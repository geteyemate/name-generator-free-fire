// Massive Free Fire Symbol & Decoration Library
const leftSymbols = [
  '꧁༺', '亗', '⚡', '★', '༒︎', '🔥', '╰‿╯', 'Ⓥ', '♛', '鄉', 
  '『', '【', ' ᶦ﹜', '𝕯𝖔𝖒', '༺', ' ༒ ', '♞', 'M', 'メ', ' _ ॣ', 
  '爪', '』', '༾', '๖ۣۜ', '๖ۣۜG', ' devil ༒', ' ⊗ ', ' ℳ ', ' 𝓡 '
];

const rightSymbols = [
  '༻꧂', '亗', '⚡', '★', '༒︎', '🔥', '╰‿╯', 'ᵀᴹ', '♛', '鄉', 
  '』', '】', 'ᵍᵒᵈ', '𝕬𝖗𝖙', '༻', ' ༒ ', '♚', ' 乡', 'ツ', ' ॣ_', 
  ' 爪', '『', '༿', '₣', ' ঔ', ' ༒ 𝑲𝒊𝒍𝒍', ' ⊗ ', ' ℳ ', ' 𝓡 '
];

// Rich Unicode Font Styles
const fontMaps = {
  smallCaps: { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: '🇽', y: 'ʏ', z: 'ᴢ' },
  gothic: { a: '𝖆', b: '𝖇', c: '𝖈', d: '𝖉', e: '𝖊', f: '𝖋', g: '𝖌', h: '𝖍', i: '𝖎', j: '𝖏', k: '𝖐', l: '𝖑', m: '𝖒', n: '𝖓', o: '𝖔', p: '𝖕', q: '𝖖', r: '𝖗', s: '𝖘', t: '𝖙', u: '𝖚', v: '𝖛', w: '𝖜', x: '𝖝', y: '𝖞', z: '𝖟' },
  cursive: { a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃' },
  boldSans: { a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇' },
  circle: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ' },
  superscript: { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: '۹', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ' }
};

function transformText(text, map) {
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}

export function generateUniqueBatch(baseName) {
  const generatedSet = new Set();

  // 1. Random Complex Symbols Combination (15 styles)
  while (generatedSet.size < 15) {
    const l = leftSymbols[Math.floor(Math.random() * leftSymbols.length)];
    const r = rightSymbols[Math.floor(Math.random() * rightSymbols.length)];
    const midStyles = [
      baseName, 
      baseName.toUpperCase(), 
      transformText(baseName, fontMaps.smallCaps)
    ];
    const mid = midStyles[Math.floor(Math.random() * midStyles.length)];
    generatedSet.add(`${l} ${mid} ${r}`);
  }

  // 2. Font Map Based Unique Combinations
  Object.values(fontMaps).forEach(map => {
    const styled = transformText(baseName, map);
    generatedSet.add(`亗 ${styled} 亗`);
    generatedSet.add(`⚡ ${styled} ⚡`);
    generatedSet.add(`★ ${styled} ★`);
    generatedSet.add(`༒︎ ${styled} ༒︎`);
    generatedSet.add(`🔥 ${styled} 🔥`);
  });

  return Array.from(generatedSet);
}
