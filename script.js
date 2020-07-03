const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Fetch words and start game
(async function init() {
  let words = [];

  try {
    const res = await fetch(
      'https://random-word-api.herokuapp.com/word?number=20'
    );

    const data = await res.json();

    words = [...data];
  } catch (err) {
    console.log('Something went wrong!', err);
  }

  // init word
  let randomWord;

  // init score
  let score = 0;

  // init time
  let time = 10;

  // get random word
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // add word to DOM
  function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  // Update score
  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }

  addWordToDOM();

  // Event listeners
  text.addEventListener('input', (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
      addWordToDOM();
      updateScore();

      // clear
      e.target.value = '';
    }
  });
})();
