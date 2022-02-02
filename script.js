const DEFAULT_FONT_SIZE = '50px';
const DEFAULT_MAX_INPUT_LENGTH = 11;

const inputDisplay = document.getElementById('calc-input');

const calcNumbers = document.getElementsByClassName('calc-number');
const calcOperators = document.getElementsByClassName('calc-operator');

const divideOperator = document.getElementById('divide');
const multiplyOperator = document.getElementById('multiply');
const addOperator = document.getElementById('add');
const subtractOperator = document.getElementById('subtract');

const clearOperator = document.getElementById('clear');
const delOperator = document.getElementById('del');

const decimalOperator = document.getElementById('decimal');
const equalsOperator = document.getElementById('equals');

let inputMaxLength = DEFAULT_MAX_INPUT_LENGTH; //default 11, input length for resizing
let firstNum;
let secondNum;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}


function divide(num1, num2) {
    return num1 / num2;
}


//input functions 

function updateInput() {
    if (inputDisplay.innerText == '0') { inputDisplay.innerText = '' } //remove starting 0

    //only allow 22 numbers, otherwise not enough room and why would you use so many anyway? this is a basic calc.
    if (inputDisplay.innerText.length == 22) { return }
    inputDisplay.innerText += this.innerText;

    //lower fontsize if the input box is filling up.
    let currentFontSize = parseInt(window.getComputedStyle(inputDisplay).fontSize.split('px'));

    if (inputDisplay.innerText.length > inputMaxLength && currentFontSize > 26) {
        inputDisplay.style.fontSize = `${currentFontSize - 8}px`;
        inputMaxLength += 3;
    }
}

function clearInput() {
    inputDisplay.innerText = '0';
    inputDisplay.style.fontSize = DEFAULT_FONT_SIZE;
    inputMaxLength = DEFAULT_MAX_INPUT_LENGTH;
}

function deleteFromInput() {
    inputArray = Array.from(inputDisplay.innerText);

    if (inputArray.pop()) {
        inputDisplay.innerText = inputArray.join('');
    }

    if (inputArray.length == 0) {
        inputDisplay.innerText = '0';
        return;
    }

    //increase fontsize if needed.
    let currentFontSize = parseInt(window.getComputedStyle(inputDisplay).fontSize.split('px'));

    let defaultFontSize = parseInt(DEFAULT_FONT_SIZE.split('px'));
    if (inputDisplay.innerText.length < inputMaxLength - 2 && currentFontSize < defaultFontSize) {
        inputDisplay.style.fontSize = `${currentFontSize + 8}px`;
        inputMaxLength -= 3;
    }
}

window.onload = () => {
    Array.from(calcNumbers).forEach((number) =>
        number.addEventListener('click', updateInput));

    clearOperator.addEventListener('click', clearInput);
    delOperator.addEventListener('click', deleteFromInput);
}