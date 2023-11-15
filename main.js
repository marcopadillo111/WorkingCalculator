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

const container = document.getElementById('con');

let mainDisplay = document.getElementById("mainText");
let subDisplay = document.getElementById("subText");

let currentInput = "";


function lastChar(string, i) {
    temp = currentInput.charAt(currentInput.length - i)
    return temp;
}

function updateDisplay(display, string) {
    display.textContent = string.toLocaleString("en-US");
}

function subTotal() {
    if (!/^[.0]?\d+$/.test(currentInput)) {
        temp = convertDisplay(currentInput);
        const result = eval(temp);
        updateDisplay(subDisplay, result);
    }
}

function convertDisplay(string) {
    let convertedDisplay = string;
    const replacements = {
        "×": "*",
        "÷": "/"
    };
    for (const currentOps in replacements) {
        if (string.includes(currentOps)) {
            convertedDisplay = convertedDisplay.replace(new RegExp(currentOps, 'g'), replacements[currentOps]);
        }
    }
    return convertedDisplay;
}

function clearInput() {
    currentInput = "";
    mainDisplay.textContent = "";    
    subDisplay.textContent = "";
}

function removeLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(mainDisplay, currentInput);
    if (currentInput.length == 0) {
        return;
    }
    
    if (!isNaN(lastChar(currentInput, 1))) {
        subTotal();
    } else {
        subDisplay.textContent = "";
    }
}

function appendNumber(number) {
    if (container.scrollWidth > container.clientWidth) {
        return;
    }

    if (number == "." && lastChar(currentInput, 1) == ".") {
        return;
    }
    
    currentInput += number;
    updateDisplay(mainDisplay, currentInput);
}

function appendOperator(operator) {
    if (container.scrollWidth > container.clientWidth) {
        return;
    }

    if (currentInput == "" && operator !== "-") {
        return;
    }
    if (isNaN(lastChar(currentInput, 1))) {
        let tempArray = currentInput.split("");
        tempArray[tempArray.length - 1] = operator;
        currentInput = tempArray.join("");
        updateDisplay(mainDisplay, currentInput);
        return;
    }
    currentInput += operator;
    updateDisplay(mainDisplay, currentInput);
    subDisplay.textContent = "";
}

function calculate() {
    if (isNaN(lastChar(currentInput, 1))) {
        currentInput = currentInput.slice(0, -1);
    }

    if (currentInput.length > 0) {
        currentInput = convertDisplay(currentInput);
        const result = eval(currentInput);
        updateDisplay(mainDisplay, result);
        currentInput = result.toString();
        subDisplay.textContent = "";
    }
}


