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
    resultsSection.innerHTML = ''; // Nayi search par clear karo
    resultsSection.classList.remove('hidden');
  } else {
    // Agar user "Generate New Styles" dabaye, toh purane wale hata kar agle 10 dikhao
    resultsSection.innerHTML = ''; 
  }

  // Agar pool khatam ho jaye toh wapas shuru se le lo taaki infinite loop chale
  if (currentIndex >= currentPool.length) {
    currentIndex = 0;
  }

  const nextBatch = currentPool.slice(currentIndex, currentIndex + BATCH_SIZE);

  nextBatch.forEach(name => {
    const card = document.createElement('div');
    card.className = 'result-card'; // CSS class use ki hai jo tune di thi
    card.innerHTML = `
      <span class="name-text select-all">${name}</span>
      <button class="copy-btn" onclick="copyName('${name.replace(/'/g, "\\'")}', this)">Copy</button>
    `;
    resultsSection.appendChild(card);
  });

  currentIndex += BATCH_SIZE;

  // Button hamesha visible rahega taaki user jab chahe naye 10 names generate kar sake
  loadMoreBtn.innerText = "Generate New Styles ⚡";
  loadMoreBtn.classList.remove('hidden');
}

window.copyName = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerText;
    btn.innerText = 'Copied! ✅';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('copied');
    }, 1500);
  });
};

generateBtn.addEventListener('click', () => renderBatch(true));
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') renderBatch(true);
});
loadMoreBtn.addEventListener('click', () => renderBatch(false));
