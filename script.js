const text = document.getElementById("output");
const words = text.innerHTML;
let userSeconds = 5;
let timer;
let newText = " ";
let noCorrectWords = 0;
let pos = 0;
document.getElementById("UserTime").innerHTML = userSeconds;

function updateTime() {
    timer = setInterval(time, 1000);
}

function time() {
    --userSeconds;
    if (userSeconds == 0 || pos == words.length) {
        clearInterval(timer);
        displayScore();
    }
    document.getElementById("UserTime").innerHTML = userSeconds;
}
let starGame = 1;
const sizeGreenLetter = 28;
const sizeRedLetter = 26;
let noLetterHtml;
let noUserLetter = 0;
let noCorrectLetter = 0;

function checkPosition(pressedKey) {
    if (userSeconds) {
        if (starGame) {
            updateTime();
            starGame = 0;
        }
    }    
    if (pos < words.length && pressedKey.key !== "Backspace" && pressedKey.key !== " ") {
        if (words[pos] === pressedKey.key) {
            createText(pos, 'green');
            noLetterHtml = sizeGreenLetter;
            ++noCorrectLetter;
        } else {
            createText(pos, 'red');
            noLetterHtml = sizeRedLetter;
        }
        ++pos;
        ++noUserLetter;
    } else if (pressedKey.key === "Backspace") {
        --pos;
        --noUserLetter;
        newText = newText.substring(0, newText.length - noLetterHtml);
    } else if (pressedKey.key == " ") {
        if (noCorrectLetter === noUserLetter) {
            ++noCorrectWords;
            noLetterHtml = 1;
        }
        noCorrectLetter = 0;
        noUserLetter = 0;
        ++pos;
        newText += " ";
    }
    if (words[pos] === ' ' && noCorrectLetter === noUserLetter) {
        ++noCorrectWords;
        noCorrectLetter = 0;
    }
    if (pos === words.length && noCorrectLetter === noUserLetter  ) {
        displayScore();

    }
    text.innerHTML = newText + words.slice(pos);
    if (pos < 1) {
        text.innerHTML = words;
        pos = 0;
    }
}

function createText(pos, color) {
    newText += words.charAt(pos).fontcolor(color);
}

function displayScore () {
    document.getElementById("ScoreBox").innerHTML = noCorrectWords;
}
document.onkeydown = checkPosition;

