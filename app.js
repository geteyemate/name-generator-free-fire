import { generateAllPool, transformText, INVISIBLE_SPACE, quickSymbols, leftSymbols, rightSymbols } from './nameGenerator.js';

// --- 1. AI NAME GENERATOR (10 PER BATCH) ---
const nameInput = document.getElementById('name-input');
const quickSpaceBtn = document.getElementById('quick-space-btn');
const generateBtn = document.getElementById('generate-btn');
const resultsSection = document.getElementById('results-section');
const refreshBtn = document.getElementById('refresh-btn');

let currentPool = [];
let currentIndex = 0;
const BATCH_SIZE = 10;

quickSpaceBtn.addEventListener('click', () => {
  nameInput.value += INVISIBLE_SPACE;
  nameInput.focus();
});

function renderBatch(isNewSearch = false) {
  if (isNewSearch) {
    const baseName = nameInput.value.trim();
    if (!baseName) {
      nameInput.focus();
      return;
    }
    currentPool = generateAllPool(baseName);
    currentIndex = 0;
    resultsSection.classList.remove('hidden');
  }

  resultsSection.innerHTML = '';
  if (currentIndex >= currentPool.length) currentIndex = 0;

  const nextBatch = currentPool.slice(currentIndex, currentIndex + BATCH_SIZE);

  nextBatch.forEach(name => {
    const card = document.createElement('div');
    card.className = 'result-card';

    const span = document.createElement('span');
    span.className = 'name-text';
    span.textContent = name;

    const btn = document.createElement('button');
    btn.className = 'copy-pill';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => copyWithFeedback(name, btn));

    card.appendChild(span);
    card.appendChild(btn);
    resultsSection.appendChild(card);
  });

  currentIndex += BATCH_SIZE;
  refreshBtn.classList.remove('hidden');
}

generateBtn.addEventListener('click', () => renderBatch(true));
nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') renderBatch(true); });
refreshBtn.addEventListener('click', () => renderBatch(false));


// --- 2. CUSTOM BUILDER ---
const builderName = document.getElementById('builder-name');
const builderOutput = document.getElementById('builder-output');
const builderCopyBtn = document.getElementById('builder-copy-btn');
const fontChips = document.querySelectorAll('.font-chip');
const builderLeftContainer = document.getElementById('builder-left-symbols');
const builderRightContainer = document.getElementById('builder-right-symbols');

let selectedFont = 'normal';
let selectedLeft = '꧁༺';
let selectedRight = '༻꧂';

function updateBuilderOutput() {
  const raw = builderName.value.trim() || 'Vinjex';
  const styled = transformText(raw, selectedFont);
  builderOutput.textContent = `${selectedLeft} ${styled} ${selectedRight}`;
}

fontChips.forEach(chip => {
  chip.addEventListener('click', () => {
    fontChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedFont = chip.getAttribute('data-font');
    updateBuilderOutput();
  });
});

leftSymbols.slice(0, 15).forEach(sym => {
  const pill = document.createElement('button');
  pill.className = 'symbol-pill';
  pill.textContent = sym;
  pill.addEventListener('click', () => {
    selectedLeft = sym;
    updateBuilderOutput();
  });
  builderLeftContainer.appendChild(pill);
});

rightSymbols.slice(0, 15).forEach(sym => {
  const pill = document.createElement('button');
  pill.className = 'symbol-pill';
  pill.textContent = sym;
  pill.addEventListener('click', () => {
    selectedRight = sym;
    updateBuilderOutput();
  });
  builderRightContainer.appendChild(pill);
});

builderName.addEventListener('input', updateBuilderOutput);
builderCopyBtn.addEventListener('click', () => copyWithFeedback(builderOutput.textContent, builderCopyBtn));


// --- 3. BIO & SPACE TOOL ---
const copyInvisibleBtn = document.getElementById('copy-invisible-btn');
const bioInput = document.getElementById('bio-input');
const bioOutput = document.getElementById('bio-output');
const copyBioBtn = document.getElementById('copy-bio-btn');
const colorChips = document.querySelectorAll('.color-chip');
let selectedColorCode = '[FF0000]';

copyInvisibleBtn.addEventListener('click', () => copyWithFeedback(INVISIBLE_SPACE, copyInvisibleBtn, 'Copied!'));

function updateBioPreview() {
  const text = bioInput.value.trim() || '⚡ HEADSHOT KING • INDIA ⚡';
  bioOutput.textContent = `${selectedColorCode} ${text}`;
}

colorChips.forEach(chip => {
  chip.addEventListener('click', () => {
    colorChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedColorCode = chip.getAttribute('data-code');
    updateBioPreview();
  });
});

bioInput.addEventListener('input', updateBioPreview);
copyBioBtn.addEventListener('click', () => copyWithFeedback(bioOutput.textContent, copyBioBtn));


// --- 4. SYMBOL VAULT ---
const symbolGrid = document.getElementById('symbol-grid');
const symbolToast = document.getElementById('symbol-toast');

quickSymbols.forEach(sym => {
  const tile = document.createElement('button');
  tile.className = 'symbol-tile';
  tile.textContent = sym;
  tile.addEventListener('click', () => {
    navigator.clipboard.writeText(sym).then(() => {
      symbolToast.style.opacity = '1';
      setTimeout(() => { symbolToast.style.opacity = '0'; }, 1200);
    });
  });
  symbolGrid.appendChild(tile);
});

function copyWithFeedback(text, btn, successLabel = 'Copied') {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = successLabel;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1400);
  });
}
