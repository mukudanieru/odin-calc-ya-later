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

let symbol = "";
let firstOperand = null;
let operation = null;
let secondOperand = null;

const input = document.querySelector("#input");

function handleDigit(digit) {
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
  if (firstOperand !== null && operation !== null && secondOperand !== null) {
    console.log(operation);
    let result = calculate(parseFloat(firstOperand), parseFloat(secondOperand));

    input.textContent = result;
    firstOperand = String(result);
    secondOperand = null;
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
    console.log(operation);
    let result = calculate(parseFloat(firstOperand), parseFloat(secondOperand));

    input.textContent = result;
    firstOperand = String(result);
    secondOperand = null;
  }
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

    // console.log(type);
    // console.log(value);

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
  });
});
