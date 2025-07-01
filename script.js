function add(x, y) {
  return x + y;
}

function subtract(x, y) {
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

let x;
let operation;
let symbol;
let y;

const input = document.querySelector("#input");

function handleDigit(value) {
  if (typeof operation === "undefined") {
    if (typeof x === "undefined") {
      x = value;
    } else {
      x += value;
    }

    input.textContent = x;
  }

  if (typeof operation !== "undefined") {
    if (typeof y === "undefined") {
      y = value;
    } else {
      y += value;
    }

    input.textContent = x + symbol + y;
  }
}

function handleOperator(value, operator) {
  if (typeof x !== "undefined") {
    operation = value;
    symbol = operator;
    input.textContent = x + symbol;
    // console.log(operation);
  }
}

function handleDecimal(value) {
  return;
}

function calculateResult() {
  let result;
  x = parseInt(x);
  y = parseInt(y);

  console.log(operation);

  switch (operation) {
    case "addition":
      result = operate(add, x, y);
      break;
    case "subtract":
      result = operate(subtract, x, y);
      break;
    case "multiply":
      result = operate(multiply, x, y);
      break;
    case "divide":
      result = operate(divide, x, y);
      break;
  }

  input.textContent = result;
  x = "";
  y = "";
}

function clearLast() {
  return;
}

function clearAll() {
  return;
}

function handlePercent() {
  return;
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
