function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  console.log(x - y);
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  return operator(x, y);
}

let firstOperand = null;
let symbol = "";
let operation = null;
let secondOperand = null;
let isResultDisplayed = false;

const inputContainer = document.querySelector("#input-container");
const [input, warning] = inputContainer.querySelectorAll("div");

function debug() {
  console.log("First Operand: " + firstOperand);
  console.log("Symbol: " + symbol);
  console.log("Operation: " + operation);
  console.log("Second Operand: " + secondOperand);
  console.log("Result: " + isResultDisplayed);
  console.log(" ");
}

function handleDigit(digit) {
  if (isResultDisplayed) {
    firstOperand = null;
    isResultDisplayed = false;
  }

  if (operation === null) {
    if (firstOperand === null) {
      firstOperand = digit;
    } else {
      firstOperand += digit;
    }

    input.textContent = firstOperand;
  }

  if (operation !== null) {
    if (secondOperand === null) {
      secondOperand = digit;
    } else {
      secondOperand += digit;
    }

    input.textContent = firstOperand + symbol + secondOperand;
  }
}

function handleOperator(value, operator) {
  isResultDisplayed = false;

  if (firstOperand !== null && operation !== null && secondOperand !== null) {
    evaluateExpression();
  }

  if (firstOperand !== null) {
    operation = value;
    symbol = operator;
    input.textContent = firstOperand + symbol;
  }
}

function handleDecimal(value) {
  return;
}

function calculateResult() {
  if (firstOperand !== null && secondOperand !== null) {
    evaluateExpression();
    isResultDisplayed = true;
  }
}

function evaluateExpression() {
  /**
   * Evaluates the current expression using firstOperand, operation, and secondOperand.
   */
  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  if (operation === "divide" && num2 === 0) {
    console.log("TEST");
    warning.textContent = "Error: Division by 0";

    firstOperand = null;
    secondOperand = null;
    operation = null;
    symbol = "";
    return;
  }

  let rawResult = calculate(num1, num2);

  let result = Number.isInteger(rawResult)
    ? String(rawResult)
    : rawResult.toFixed(4);

  input.textContent = result;
  firstOperand = result;
  symbol = "";
  operation = null;
  secondOperand = null;
}

function calculate(x, y) {
  let result;

  switch (operation) {
    case "addition":
      result = operate(add, x, y);
      break;
    case "subtraction":
      result = operate(subtract, x, y);
      break;
    case "multiply":
      result = operate(multiply, x, y);
      break;
    case "divide":
      result = operate(divide, x, y);
      break;
  }

  return result;
}

function clearLast() {
  return;
}

function clearAll() {
  firstOperand = null;
  operation = null;
  secondOperand = null;
  input.textContent = "";
  warning.textContent = "";
}

function handlePercent() {
  // if (typeof x !== "undefined") {
  //   if (typeof y === "undefined") {
  //     x = parseInt(x);
  //     x = x / 100;
  //     input.textContent = x;
  //   }
  // }
}

function handleFunction(value) {
  return;
}

// MAIN
document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.querySelector("#button-container");

  buttonContainer.addEventListener("click", (event) => {
    let target = event.target.closest("button");

    if (target === null) {
      return;
    }

    const { type, value } = target.dataset;

    switch (type) {
      case "digit":
        handleDigit(value);
        break;
      case "operator":
        handleOperator(value, target.textContent);
        break;
      case "decimal":
        handleDecimal(value);
        break;
      case "equals":
        calculateResult();
        break;
      case "clear":
        clearLast();
        break;
      case "all-clear":
        clearAll();
        break;
      case "percent":
        handlePercent();
        break;
      case "function":
        handleFunction();
        break;
    }

    debug();
  });
});
