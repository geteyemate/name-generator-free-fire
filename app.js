import { generateAllPool } from './nameGenerator.js';

const nameInput = document.getElementById('name-input');
const generateBtn = document.getElementById('generate-btn');
const resultsSection = document.getElementById('results-section');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentPool = [];
let currentIndex = 0;
const BATCH_SIZE = 10; // Ek baar me sirf 10 names

function renderBatch(isNewSearch = false) {
  if (isNewSearch) {
    const baseName = nameInput.value.trim();
    if (!baseName) {
      alert('Pehle apna naam toh daal bhai! 😅');
      return;
    }
    currentPool = generateAllPool(baseName);
    currentIndex = 0;
    resultsSection.innerHTML = '';
    resultsSection.classList.remove('hidden');
  }

  const nextBatch = currentPool.slice(currentIndex, currentIndex + BATCH_SIZE);
  if (nextBatch.length === 0) {
    loadMoreBtn.classList.add('hidden');
    return;
  }

  nextBatch.forEach(name => {
    const card = document.createElement('div');
    card.className = 'flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-400 transition';
    card.innerHTML = `
      <span class="text-base font-bold tracking-wide text-gray-900 select-all">${name}</span>
      <button class="bg-gray-100 hover:bg-gray-950 hover:text-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95" onclick="copyName('${name.replace(/'/g, "\\'")}', this)">Copy</button>
    `;
    resultsSection.appendChild(card);
  });

  currentIndex += BATCH_SIZE;

  // Agar aur names bache hain toh Load More button dikhao, nahi toh chhipa do
  if (currentIndex < currentPool.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}

window.copyName = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerText;
    btn.innerText = 'Copied! ✅';
    btn.classList.add('bg-emerald-500', 'text-white');
    
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('bg-emerald-500', 'text-white');
    }, 1500);
  });
};

generateBtn.addEventListener('click', () => renderBatch(true));
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') renderBatch(true);
});
loadMoreBtn.addEventListener('click', () => renderBatch(false));
