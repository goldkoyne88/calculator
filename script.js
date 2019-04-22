//Functions to Set-Up Calculator
const historyDisplay = document.querySelector("#history-display");
const workingDisplay = document.querySelector("#working-display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const plusMinusButton = document.querySelector("#plus-minus");

let tempValue = "";
let xValue = "";
let yValue = "";
let operator = "";
let evaluated = false;

let historyValue = "";
let workingValue = "";

historyDisplay.textContent = "";
workingDisplay.textContent = "";

//DOM Event Listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    };
    if (e.key === "Delete") {
        clearCalculator();
    } else {
        getValue(e.key);
    };
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        getValue(button.value);
    });
});

clearButton.addEventListener("click", () => {
    clearCalculator();
});

deleteButton.addEventListener("click", () => {
    getValue("Backspace");
});

plusMinusButton.addEventListener("click", () => {
    getValue("Insert");
});


//Display Functions
function displayWorking(value) {
    workingDisplay.textContent = value;
};

function displayHistory(value) {
    if (value.toString().length > 13) {
        historyDisplay.style.fontSize = "24px";
    } else {
        historyDisplay.style.fontSize = "32px";
    };
    historyDisplay.textContent = value;
};

function clearCalculator() {
    tempValue = "";
    xValue = "";
    yValue = "";
    operator = "";
    evaluated = false;

    historyValue = "";
    workingValue = "";

    historyDisplay.textContent = "";
    workingDisplay.textContent = "";

    historyDisplay.click();
};

//Functions to Manage User Input
function inputOperator(operatorChoice) {
    const x = Number(xValue);
    const y = Number(yValue);

    switch (operatorChoice) {
        case "+":
            workingValue = add(x, y);
            break;
        case "-":
            workingValue = subtract(x, y);
            break;
        case "*":
            workingValue = multiply(x, y);
            break;
        case "/":
            workingValue = divide(x, y);
            break;
    };
    operator = "";
    xValue = workingValue;
    yValue = "";
    tempValue = "";
    evaluated = true;
    displayWorking(workingValue);
};

function getValue(value) {
    const ops = "+-*/=";
    const values = "0123456789";

    if (value === "x") value = "*";
    if (value === "÷") value = "/";
    if (value === "Enter") value = "=";

    if(value === "Insert" && tempValue) {
        tempValue = (tempValue * -1).toString();
        tempStartPos = (historyValue.length - tempValue.length) + 1;

        if (tempValue < 0) {
            historyValue = historyValue.slice(0, tempStartPos) + `(${tempValue})`;
        } else {
            historyValue = historyValue.slice(0, tempStartPos - 1) + tempValue;
        };
    };

    if (value === "Backspace" && tempValue && !workingValue) {
        tempValue = tempValue.slice(0, -1);
        historyValue = historyValue.slice(0, -1);
        displayWorking(historyValue);
        return
    };

    if (values.includes(value)) {
        if ((xValue && operator) || !xValue) {
            tempValue = tempValue.concat(value);
            historyValue = historyValue.concat(value);
        };
    };

    if (value === "." && !tempValue.includes(".")) {
        tempValue = tempValue.concat(value);
        historyValue = historyValue.concat(value);
    };

    if (ops.includes(value) && (tempValue || evaluated) && value !== "=") {
        if (xValue && !yValue) {
            yValue = tempValue;
            inputOperator(operator);
        } else {
            xValue = tempValue;
            evaluated = false;
        };

        operator = value;
        historyValue = historyValue.concat(value);
        tempValue = "";
        workingValue = "";
    };

    if (ops.includes(value) && operator && value !== "=") {
        evaluated = false;
        operator = value;
        historyValue = historyValue.slice(0, -1).concat(value);
    };

    if (value === "=" && (xValue && tempValue)) {
        yValue = tempValue;
        inputOperator(operator);
        xValue = workingValue;
    };

    displayHistory(historyValue);
};



//Basic Mathematical Functions
function add(x, y) {
    return x + y
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    //throws division with 0 error
    if (x ===0 || y===0) {
        return "Error - Cannot divide by 0";
    };
    return x / y;
};



