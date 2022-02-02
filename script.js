const DEFAULT_FONT_SIZE = '50px';
const DEFAULT_MAX_INPUT_LENGTH = 11;

const inputDisplay = document.getElementById('calc-input');
const resultDisplay = document.getElementById('calc-result');

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
let operator;
let operatorSymbol;
let inputUsed = false;

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

    if (inputDisplay.innerText == '0' || inputUsed) { inputDisplay.innerText = ''; inputUsed = false; } //remove starting 0

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
    clearDisplay();
    firstNum = undefined;
    secondNum = undefined;
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

//math operator button event listeners

function operatorPicked() {

    let oldOperatorSymbol = operatorSymbol;
    let oldOperator = operator;

    //if a different operator was pressed, change operators but do no calculation


    operatorSymbol = getOperator(this);
    if (oldOperatorSymbol != undefined && oldOperatorSymbol != operatorSymbol) {
        if (oldOperatorSymbol != operatorSymbol) {
            if (!inputUsed) { //is preexisting operator selected, to that before changing operators
                secondNum = parseInt(inputDisplay.innerText);
                firstNum = oldOperator(firstNum, secondNum);
            }
            resultDisplay.innerText = `${firstNum} ${operatorSymbol}`;
            inputUsed = true;
            return;
        }
    }

    //else if same operator or first time, assign values
    if (firstNum != undefined && secondNum == undefined) {
        secondNum = parseInt(inputDisplay.innerText);
        inputUsed = true;
    }
    else {
        firstNum = parseInt(inputDisplay.innerText);
        inputUsed = true;
        resultDisplay.innerText = `${firstNum} ${operatorSymbol}`;
    }

    if (firstNum && secondNum) {
        firstNum = operator(firstNum, secondNum);
        resultDisplay.innerText = firstNum;
        secondNum = undefined;
        inputUsed = true;
        operator = undefined;
        operatorSymbol = undefined;

    }
}

function calculate() {
    secondNum = parseInt(inputDisplay.innerText);

    if (operator != undefined && firstNum != undefined && secondNum != undefined) {
        resultDisplay.innerText = `${operator(firstNum, secondNum)}`;
        firstNum = undefined;
        secondNum = undefined;
        inputUsed = true;
        operator = undefined;
        operatorSymbol = undefined;
    }
}

//helpers
function clearDisplay() {
    resultDisplay.innerText = '';
    inputDisplay.innerText = '0';
    inputDisplay.style.fontSize = DEFAULT_FONT_SIZE;
    inputMaxLength = DEFAULT_MAX_INPUT_LENGTH;
}

function getOperator(op) {
    switch (op.getAttribute('data-operator')) {
        case 'add':
            operator = add;
            return '+';
        case 'subtract':
            operator = subtract;
            return '-';
        case 'multiply':
            operator = multiply;
            return '×';
        case 'divide':
            operator = divide;
            return '÷';
    }
}

//startup
window.onload = () => {
    Array.from(calcNumbers).forEach((number) =>
        number.addEventListener('click', updateInput));

    clearOperator.addEventListener('click', clearInput);
    delOperator.addEventListener('click', deleteFromInput);
    equalsOperator.addEventListener('click', calculate)

    addOperator.addEventListener('click', operatorPicked);
    subtractOperator.addEventListener('click', operatorPicked);
    multiplyOperator.addEventListener('click', operatorPicked);
    divideOperator.addEventListener('click', operatorPicked);

}