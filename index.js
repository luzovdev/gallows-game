const gameDashes = document.querySelector('.game__dashes'),
   userInput = document.querySelector('.game__input > input'),
   btn = document.querySelector('.btn'),
   gameImage = document.getElementById('image'),
   gameResult = document.querySelector('.results'),
   gameResultBody = document.querySelector('.results__body'),
   gameResultMessage = document.querySelector('.results__message'),
   restartBtn = document.querySelector('.results__btn');

const words = [
   'банан',
   'абрикос',
   'малина',
   'виноград',
   'яблоко',
   'киви',
   'лимон',
   'дыня',
   'арбуз'
];

const images = [
   'img/2.png',
   'img/3.png',
   'img/4.png',
];

function getRandomWord(arrWords) {
   const randomWord = arrWords[Math.floor(Math.random() * arrWords.length)];
   return randomWord;
}

function renderDashes(dashes) {
   gameDashes.innerHTML = ''
   dashes.forEach((dash) => {
      gameDashes.insertAdjacentHTML('beforeend', `<span>${dash}</span>`)
   });
}

function changeImage(imagesArr, numberOfTries) {
   gameImage.src = imagesArr[numberOfTries]
}

function showResult(message, word) {
   if (message === 'win') {
      gameResultMessage.insertAdjacentHTML('afterbegin',
         `<p>Победа</p>
         <p>Правильное слово - <b>${word}</b> </p>
      `
      )
      gameResultBody.style.backgroundColor = 'green'
      gameResult.classList.add('_open')
   } else if (message = 'loss') {
      gameResultMessage.insertAdjacentHTML('afterbegin',
         `<p>Поражение</p>
      <p>Правильное слово - <b>${word}</b> </p>
   `
      )
      gameResultBody.style.backgroundColor = 'red'
      gameResult.classList.add('_open')
   }
}

function game(randomWords) {
   let numberOfTries = 0;
   const correctWord = getRandomWord(randomWords);
   const correctLetter = correctWord.split('');
   const dashes = correctLetter.map(item => item = '_');

   const onBtnClick = () => {
      correctLetter.forEach((letter, i) => {
         if (letter.toLowerCase() === userInput.value.toLowerCase()) {
            dashes[i] = userInput.value.toLowerCase()
            renderDashes(dashes)
         }
      })

      if (!correctLetter.includes(userInput.value.toLowerCase()) && userInput.value) {
         changeImage(images, numberOfTries)
         numberOfTries++
      }

      if (numberOfTries === images.length) {
         showResult('loss', correctWord);
         userInput.removeEventListener('keydown', onKeyDown);
         btn.removeEventListener('click', onBtnClick);
      } else if (!dashes.includes('_')) {
         showResult('win', correctWord);
         userInput.removeEventListener('keydown', onKeyDown);
         btn.removeEventListener('click', onBtnClick);
      }
      userInput.value = '';
   }

   const onKeyDown = function (e) {
      if (e.keyCode === 13) {
         onBtnClick()
      }
   };

   renderDashes(dashes);
   btn.addEventListener('click', onBtnClick);
   userInput.addEventListener('keydown', onKeyDown)
   restartBtn.addEventListener('click', () => location.reload())
}

game(words)

