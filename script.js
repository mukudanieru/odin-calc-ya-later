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

const errorMessages = {
  DIVISION_ERROR: "Error: Division by zero.",
  DECIMAL_ERROR: "Error: Only one decimal point allowed.",
  PERCENT_ERROR: "Error: Percentage is only allowed after a number.",
  PERCENT_MULTIPLE_ERROR: "Error: Multiple percentage signs not allowed.",
  PERCENT_FIRST_OPERAND_ERROR:
    "Error: Percentage is only allowed for the first operand.",
  SQUARED_ERROR: "Error: Squared is only allowed after a number.",
  SQUARED_MULTIPLE_ERROR: "Error: Multiple squared symbols not allowed.",
  SQUARED_FIRST_OPERAND_ERROR:
    "Error: Squared is only allowed for the first operand.",
  SQRT_ERROR: "Error: Square root is only allowed before a number.",
  SQRT_MULTIPLE_ERROR: "Error: Multiple square root symbols not allowed.",
  SQRT_FIRST_OPERAND_ERROR:
    "Error: Square root is only allowed for the first operand.",
  SQRT_MISSING_NUMBER_ERROR: "Error: Square root must contain a number inside.",
};
const DECIMAL_PLACES = 4;

let firstOperand = null;
let symbol = "";
let operation = null;
let secondOperand = null;
let isResultDisplayed = false;
let hasSqrtPending = false;
let hasSquaredPending = false;
let hasPercentagePending = false;

let isThereAnError = false;
let errorType = null;

let calculationHistory = [];

let calculation = {
  firstOperand: firstOperand,
  symbol: symbol,
  operation: operation,
  secondOperand: secondOperand,
  isResultDisplayed: isResultDisplayed,
  hasSqrtPending: hasSqrtPending,
  hasSquaredPending: hasPercentagePending,
  hasPercentagePending: hasPercentagePending,
};

const inputContainer = document.querySelector("#input-container");
const [input, warning] = inputContainer.querySelectorAll("div");

function debug() {
  console.log("First Operand: ", firstOperand);
  console.log("Symbol: ", symbol);
  console.log("Operation: ", operation);
  console.log("Second Operand: ", secondOperand);
  console.log("Result: ", isResultDisplayed);
  console.log("isThereAnError: ", isThereAnError);
  console.log("errorType: ", errorType);
  console.log("hasSqrtPending: ", hasSqrtPending);
  console.log("hasSquaredPending: ", hasSquaredPending);
  console.log("hasPercentagePending: ", hasPercentagePending);
  console.log("INPUT:", input.textContent);
  console.log(" ");
}

function processPercentage() {
  let calculation = {
    firstOperand: firstOperand,
    symbol: "",
    operation: "",
    secondOperand: "",
    isResultDisplayed: isResultDisplayed,
    hasSqrtPending: hasSqrtPending,
    hasSquaredPending: hasPercentagePending,
    hasPercentagePending: hasPercentagePending,
  };

  let result = parseFloat(firstOperand) / 100;
  firstOperand = result.toFixed(DECIMAL_PLACES);
  input.textContent = firstOperand;
  hasPercentagePending = false;

  saveToHistory(calculation, firstOperand);
}

function processSqrt() {
  let calculation = {
    firstOperand: firstOperand,
    symbol: "",
    operation: "",
    secondOperand: "",
    isResultDisplayed: isResultDisplayed,
    hasSqrtPending: hasSqrtPending,
    hasSquaredPending: hasPercentagePending,
    hasPercentagePending: hasPercentagePending,
  };

  let result = Math.sqrt(parseFloat(firstOperand.replace("√", "")));
  firstOperand = result.toFixed(DECIMAL_PLACES);
  input.textContent = firstOperand;
  hasSqrtPending = false;

  saveToHistory(calculation, firstOperand);
}

function processSquared() {
  let calculation = {
    firstOperand: firstOperand,
    symbol: "",
    operation: "",
    secondOperand: "",
    isResultDisplayed: isResultDisplayed,
    hasSqrtPending: hasSqrtPending,
    hasSquaredPending: hasPercentagePending,
    hasPercentagePending: hasPercentagePending,
  };

  let result = Math.pow(parseFloat(firstOperand), 2);
  firstOperand = result.toFixed(DECIMAL_PLACES);
  input.textContent = firstOperand;
  hasSquaredPending = false;

  saveToHistory(calculation, firstOperand);
}

function setError(type) {
  isThereAnError = true;
  errorType = type;
  warning.textContent = errorMessages[errorType];
}

function clearError() {
  isThereAnError = false;
  errorType = null;
  warning.textContent = "";
}

function handleDigit(digit) {
  if (isResultDisplayed) {
    firstOperand = null;
    isResultDisplayed = false;
  }

  if (isThereAnError) {
    clearError();
  }

  if (hasSquaredPending) {
    // Can't add digit after squared sign.
    setError("SQUARED_ERROR");
    return;
  }

  if (hasPercentagePending) {
    // Can't add digit after percentage.
    setError("PERCENT_ERROR");
    return;
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
  if (isResultDisplayed) {
    isResultDisplayed = false;
  }

  if (isThereAnError) {
    clearError();
  }

  if (firstOperand !== null && hasSqrtPending) {
    if (firstOperand === "√" || firstOperand === "√.") {
      setError("SQRT_MISSING_NUMBER_ERROR");
      return;
    }

    processSqrt();
  }

  if (firstOperand !== null && hasSquaredPending) {
    processSquared();
  }

  if (firstOperand !== null && hasPercentagePending) {
    processPercentage();
  }

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
  if (isResultDisplayed) {
    firstOperand = null;
    isResultDisplayed = false;
  }

  if (hasSquaredPending) {
    // Can't add digit after squared sign.
    setError("SQUARED_ERROR");
    return;
  }

  if (hasPercentagePending) {
    // Can't add decimal after percentage.
    setError("PERCENT_ERROR");
    return;
  }

  if (operation == null) {
    if (firstOperand === null) {
      firstOperand = value;
    } else {
      if (firstOperand.includes(value)) {
        setError("DECIMAL_ERROR");
        return;
      }

      firstOperand += value;
    }

    input.textContent = firstOperand;
  }

  if (operation !== null) {
    if (secondOperand === null) {
      secondOperand = value;
    } else {
      if (secondOperand.includes(value)) {
        setError("DECIMAL_ERROR");
        return;
      }

      secondOperand += value;
    }

    input.textContent = firstOperand + symbol + secondOperand;
  }
}

function calculateResult() {
  if (isThereAnError) {
    clearError();
  }

  if (firstOperand !== null && hasSqrtPending) {
    if (!/\d/.test(firstOperand) || firstOperand[0] !== "√") {
      setError("SQRT_MISSING_NUMBER_ERROR");
      return;
    }

    processSqrt();
  }

  if (firstOperand !== null && hasSquaredPending) {
    processSquared();
  }

  if (firstOperand !== null && hasPercentagePending) {
    processPercentage();
  }

  if (firstOperand !== null && secondOperand !== null) {
    evaluateExpression();
  }

  if (!isThereAnError) {
    isResultDisplayed = true;
  }
}

function evaluateExpression() {
  /**
   * Evaluates the current expression using firstOperand, operation, and secondOperand.
   */
  let calculation = {
    firstOperand: firstOperand,
    symbol: symbol,
    operation: operation,
    secondOperand: secondOperand,
    isResultDisplayed: isResultDisplayed,
    hasSqrtPending: hasSqrtPending,
    hasSquaredPending: hasPercentagePending,
    hasPercentagePending: hasPercentagePending,
  };

  const num1 = parseFloat(firstOperand);
  const num2 = parseFloat(secondOperand);

  if (operation === "divide" && num2 === 0) {
    setError("DIVISION_ERROR");
    return;
  }

  let rawResult = calculate(num1, num2);

  let result = Number.isInteger(rawResult)
    ? String(rawResult)
    : rawResult.toFixed(DECIMAL_PLACES);

  saveToHistory(calculation, result);
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
  const START_INDEX = 0;
  const LAST_CHAR = -1;

  if (isThereAnError) {
    clearError();
    return;
  }

  if (isResultDisplayed) {
    firstOperand = firstOperand.slice(START_INDEX, LAST_CHAR);
    input.textContent = firstOperand;

    if (firstOperand === "") {
      firstOperand = null;
    }

    isResultDisplayed = false;
  } else if (secondOperand !== null) {
    secondOperand = secondOperand.slice(START_INDEX, LAST_CHAR);
    input.textContent = firstOperand + symbol + secondOperand;

    if (secondOperand === "") {
      secondOperand = null;
    }
  } else if (operation !== null && secondOperand === null) {
    symbol = "";
    input.textContent = firstOperand;
    operation = null;
  } else if (
    firstOperand !== null &&
    operation === null &&
    secondOperand === null
  ) {
    if (hasSquaredPending) {
      hasSquaredPending = false;
    }

    if (hasPercentagePending) {
      hasPercentagePending = false;
    }

    firstOperand = firstOperand.slice(START_INDEX, LAST_CHAR);
    input.textContent = firstOperand;

    if (hasSqrtPending && firstOperand === "") {
      hasSqrtPending = false;
    }

    if (firstOperand === "") {
      firstOperand = null;
    }
  }
}

function clearAll() {
  firstOperand = null;
  operation = null;
  secondOperand = null;
  isResultDisplayed = false;
  hasSqrtPending = false;
  hasSquaredPending = false;
  hasPercentagePending = false;
  input.textContent = "";
  clearError();
}

function handlePercent() {
  if (operation === null) {
    if (firstOperand !== null) {
      if (firstOperand.includes("%") && hasPercentagePending) {
        setError("PERCENT_MULTIPLE_ERROR");
        return;
      }

      hasPercentagePending = true;
      firstOperand += "%";
      input.textContent = firstOperand;
    } else {
      setError("PERCENT_ERROR");
      return;
    }
  }

  if (operation !== null) {
    setError("PERCENT_FIRST_OPERAND_ERROR");
    return;
  }
}

function handleSqrt(value) {
  if (operation !== null) {
    setError("SQRT_FIRST_OPERAND_ERROR");
    return;
  }

  if (hasSqrtPending) {
    setError("SQRT_MULTIPLE_ERROR");
    return;
  } else if (firstOperand !== null) {
    setError("SQRT_ERROR");
    return;
  } else {
    hasSqrtPending = true;
    firstOperand = value;
    input.textContent = firstOperand;
  }
}

function handleSquared(value) {
  if (operation === null) {
    if (firstOperand !== null) {
      if (firstOperand.includes(value) && hasSquaredPending) {
        setError("SQUARED_MULTIPLE_ERROR");
        return;
      }

      hasSquaredPending = true;
      firstOperand += value;
      input.textContent = firstOperand;
    } else {
      setError("SQUARED_ERROR");
      return;
    }
  }

  if (operation !== null) {
    setError("SQUARED_FIRST_OPERAND_ERROR");
    return;
  }
}

function saveToHistory(calculation, value) {
  calculation["result"] = value;
  let idx = calculationHistory.push(calculation);

  addToHistoryDOM(calculation, idx);
}

function addToHistoryDOM(calculation, idx) {
  const historyTab = document.querySelector("#history");

  const historyEntry = document.createElement("div");
  historyEntry.setAttribute("data-entry-id", idx);
  historyEntry.className = "history-entry";

  const equation = document.createElement("div");
  equation.className = "equation";
  equation.textContent =
    calculation["firstOperand"] +
    calculation["symbol"] +
    calculation["secondOperand"];

  const equals = document.createElement("div");
  equals.className = "equals";
  equals.textContent = "=";

  const result = document.createElement("div");
  result.className = "result";
  result.textContent = calculation["result"];

  historyEntry.appendChild(equation);
  historyEntry.appendChild(equals);
  historyEntry.appendChild(result);

  historyTab.appendChild(historyEntry);
}

function handleHistoryClick() {}

function restoreFromHistory() {}

function setResultAsFirstOperand() {}

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
        handleOperator(value, target.textContent.trim());
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
      case "sqrt":
        handleSqrt(value);
        break;
      case "squared":
        handleSquared(value);
        break;
    }

    debug();
  });
});
