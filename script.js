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

// MAIN
document.addEventListener("DOMContentLoaded", () => {
    const buttonContainer = document.querySelector("#button-container");

    x = "";
    y = "";

    buttonContainer.addEventListener("click", (event) => {
        let target = event.target.closest("button");

        if (target) {
            if (target.dataset.type === "number") {
                if (!operation && y.length === 0) {
                    x += target.textContent;
                    input.textContent = x;
                } else if (x && operation) {
                    y += target.textContent;
                    input.textContent = x + operation + y;
                }
            } else if (target.dataset.type === "operator") {
                if (x.length > 0) {
                    operation = target.dataset.value;
                }
                input.textContent = x + operation;
            } else if (target.dataset.type === "control") {
                if (target.dataset.value === "=" && x.length > 0 && operation && y.length > 0) {
                    let result;
                    x = parseInt(x);
                    y = parseInt(y);

                    if (operation === "+") {
                        result = operate(add, x, y);
                    } else if (operate === "-") {
                        result = operate(subtract, x, y);
                    } else if (operation === "*") {
                        result = operate(multiply, x, y);
                    } else if (operation === "/") {
                        result = operate(subtract, x, y);
                    }

                    input.textContent = result;
                    x = "";
                    y = "";         
                }
            }
            console.log(`${x} ${operation} ${y}`)
            console.log(target);
        }

    });
});
