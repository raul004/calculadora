const previousOperandTxt = document.querySelector("[data-previous-operand]");
const currentOperandTxt = document.querySelector("[data-current-operand]");

const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelectorAll("[data-delete]");

const numberBtns = document.querySelectorAll("[data-number]");

const operationsBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelectorAll("[data-equals]");

class Calculator {
    constructor(previousOperandTxt, currentOperandTxt) {
        this.previousOperandTxt = previousOperandTxt;
        this.currentOperandTxt = currentOperandTxt;
        this.clear();
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    uptadeDisplay() {
        this.previousOperandTxt.innerText = this.previousOperand;
        this.currentOperandTxt.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(
    previousOperandTxt,
    currentOperandTxt
);

for (const numberBtn of numberBtns) {
    numberBtn.addEventListener("click", () => {
        calculator.appendNumber(numberBtn.innerHTML);
        calculator.uptadeDisplay();
    });
}

allClearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.uptadeDisplay();
});