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
let y;

const input = document.querySelector("#input");

function handleDigit(value) {
  return;
}

function handleOperator(value) {
  return;
}

function handleDecimal(value) {
  return;
}

function calculateResult() {
  return;
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

  x = "";
  y = "";

  buttonContainer.addEventListener("click", (event) => {
    let target = event.target.closest("button");
    const { type, value } = target.dataset;

    console.log(type);
    console.log(value);

    switch (type) {
      case "digit":
        handleDigit(value);
        break;
      case "operator":
        handleOperator(value);
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
