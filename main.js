
const calculatorWidthInPixels = 360;
const calculatorHeightInPixels = 550;
    
function calculateZoomLevel() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let widthZoomLevel = (windowWidth / calculatorWidthInPixels) * 0.9;
    let heightZoomLevel = (windowHeight / calculatorHeightInPixels) * 0.9;
    let zoomLevel = Math.min(widthZoomLevel, heightZoomLevel);

    document.body.style.zoom = zoomLevel;
}

calculateZoomLevel();
window.addEventListener('resize', calculateZoomLevel);


// FUNCTIONS

let currentInput = "";
let currentOperator = "";

function clearInput() {
    currentInput = "";
    currentOperator = "";
    document.getElementById('mainText').textContent = '';
}

function appendNumber(number) {
    currentInput += number;
    document.getElementById('mainText').textContent = currentInput;
}

function add() {
    currentOperator = "+";
    currentInput += currentOperator;
    document.getElementById('mainText').textContent = currentInput;
}

function minus() {
    currentOperator = "-";
    currentInput += currentOperator;
    document.getElementById('mainText').textContent = currentInput;
}

function multiply() {
    currentOperator = "*";
    currentInput += currentOperator;
    document.getElementById('mainText').textContent = currentInput;
}

function divide() {
    currentOperator = "/";
    currentInput += currentOperator;
    document.getElementById('mainText').textContent = currentInput;
}

function calculate() {
    const result = eval(currentInput);
    document.getElementById('mainText').textContent = result;
    currentInput.toString();
    currentOperator = '';
}

