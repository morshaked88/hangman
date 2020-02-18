(function () {
    const hangman = document.querySelector('.hangImg');
    const secertWord = document.querySelector('.secret-word');
    const keyboard = document.querySelector('.keyboard');
    const allLetter = document.querySelectorAll('secret-word');
    const result = document.querySelector('.game-over');
    const btnYes = document.querySelector('.yes');
    const btnNo = document.querySelector('.no');
    const theEnd = document.querySelector('.the-end');

    let word = '';
    let lives = 7;
    let toWin = 0;

    const words = ['menu', 'fact', 'ear', 'cell', 'king', 'union', 'mood', 'wood', 'child', 'city', 'basis', 'topic', 'area', 'law', 'river', 'bonus', 'week', 'pizza', 'piano', 'hall', 'world', 'media', 'year', 'apple', 'hat', 'disk', 'skill', 'uncle', 'poem', 'way', 'beer', 'death', 'chest', 'event', 'shirt', 'honey', 'photo', 'actor', 'tooth', 'dirt', 'desk', 'blood', 'drama', 'mud', 'unit', 'hair', 'mom', 'news', 'song', 'mall'];
    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    //get random word from array
    const getRandomWord = (arr) => {
        const r = Math.round(Math.random() * 49);
        word = words[r].toUpperCase();

    }


    //print the secret word to UI
    const printWord = (w) => {
        const splitWord = w.split('');
        splitWord.map(word => {
            const div = document.createElement('div');
            div.className = 'letter'
            const letter = document.createElement('p');
            letter.className = 'text';
            div.appendChild(letter);
            const txt = document.createTextNode(word);
            letter.appendChild(txt);
            secertWord.appendChild(div)
        })
    }

    const checkLetter = (text) => {
        const letters = document.querySelectorAll('.text');
        //check if key is in secret word
        if (word.split('').includes(text.innerText)) {
            for (const i of letters) {
                if (i.innerText === text.innerText) {
                    i.style.display = 'block';
                    text.style.border = '3px solid green';
                    text.style.color = 'green';
                    text.disabled = true;
                    toWin++;
                }
            }
        } else {
            text.style.border = '3px solid red';
            text.style.color = 'red';
            text.disabled = true;
            lives--;
        }
        //change hangman according to results
        if (lives === 6) hangman.src = './img/2.png';
        if (lives === 5) hangman.src = './img/3.png';
        if (lives === 4) hangman.src = './img/4.png';
        if (lives === 3) hangman.src = './img/5.png';
        if (lives === 2) hangman.src = './img/6.png';
        if (lives === 1) hangman.src = './img/7.png';
        if (lives === 0) {
            hangman.src = './img/8.png';
            keyboard.innerHTML = '';
            result.style.display = 'flex';
            document.querySelector('.result').innerText = 'You Lose!';
        }
        //if wins
        if (toWin === word.length) {
            keyboard.innerHTML = '';
            document.querySelector('.result').innerText = 'You Won!';
            result.style.display = 'flex';

        }
    }

    //Print ket board and add event to keys
    const printKeyboard = (arr) => {
        arr.map(item => {
            const btn = document.createElement('button');
            btn.className = 'abc';
            btn.innerText = item;
            keyboard.appendChild(btn)

        })

        const allLetter = document.querySelectorAll('.abc');

        for (const letter of allLetter) {
            letter.addEventListener('click', () => checkLetter(letter))
        }

    }

    //reset game
    const reset = () => {
        word = '';
        lives = 7;
        toWin = 0;
        result.style.display = 'none';
        secertWord.innerHTML = '';
        keyboard.innerHTML = '';
        hangman.src = './img/1.png';

        startGame();


    }

    btnNo.addEventListener('click', () => {
        document.querySelector('.container').style.display = 'none';
        theEnd.style.display = 'flex';
    })
    btnYes.addEventListener('click', () => {
        reset();
    })


    const startGame = () => {
        //!1. get random word
        getRandomWord(words)

        //!2. print random word
        printWord(word)

        //!3. print keyboard + onclick(keyboard) check if letter is in word(T/F)
        printKeyboard(abc)

    }


    startGame();

})();


