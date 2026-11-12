import { generateStylishNames } from './nameGenerator.js';

const nameInput = document.getElementById('name-input');
const generateBtn = document.getElementById('generate-btn');
const resultsSection = document.getElementById('results-section');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initial setup: Hide load more button
loadMoreBtn.classList.add('hidden');

function renderNames(names) {
  resultsSection.innerHTML = '';
  if (names.length > 0) {
    resultsSection.classList.remove('hidden');
    loadMoreBtn.classList.remove('hidden');
    
    names.forEach(name => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <span class="name-text">${name}</span>
        <button class="copy-btn" onclick="copyName('${name}', this)">Copy</button>
      `;
      resultsSection.appendChild(card);
    });
  } else {
    // Handling edge case for no names (though input check handles it)
    resultsSection.classList.add('hidden');
    loadMoreBtn.classList.add('hidden');
  }
}

function handleGenerate() {
  const baseName = nameInput.value.trim();
  if (!baseName) {
    alert('Please enter a name first! 😅');
    return;
  }
  
  // Call name generation logic (e.g., in nameGenerator.js)
  const names = generateStylishNames(baseName);
  renderNames(names);
}

// Global copy function with visual feedback
window.copyName = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    // Show 'Copied!' on the button temporarily
    const originalText = btn.innerText;
    btn.innerText = 'Copied! ✅';
    btn.classList.add('copied');
    
    // Reset after a delay
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove('copied');
    }, 1500);
  });
};

generateBtn.addEventListener('click', handleGenerate);
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleGenerate();
});
loadMoreBtn.addEventListener('click', handleGenerate);
