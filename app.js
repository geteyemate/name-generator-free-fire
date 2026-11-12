import { generateUniqueBatch } from './nameGenerator.js';

const nameInput = document.getElementById('name-input');
const generateBtn = document.getElementById('generate-btn');
const resultsSection = document.getElementById('results-section');
const loadMoreBtn = document.getElementById('load-more-btn');

loadMoreBtn.classList.add('hidden');

function displayNames() {
  const baseName = nameInput.value.trim();
  if (!baseName) {
    alert('Pehle apna naam toh daal bhai! 😅');
    return;
  }

  resultsSection.innerHTML = '';
  resultsSection.classList.remove('hidden');
  loadMoreBtn.classList.remove('hidden');

  const namesArray = generateUniqueBatch(baseName);

  namesArray.forEach(name => {
    const card = document.createElement('div');
    card.className = 'flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-400 transition';
    card.innerHTML = `
      <span class="text-base font-bold tracking-wide text-gray-900 select-all">${name}</span>
      <button class="bg-gray-100 hover:bg-gray-950 hover:text-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition active:scale-95" onclick="copyName('${name.replace(/'/g, "\\'")}', this)">Copy</button>
    `;
    resultsSection.appendChild(card);
  });
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

generateBtn.addEventListener('click', displayNames);
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') displayNames();
});
loadMoreBtn.addEventListener('click', displayNames);
