const previousOperandTxt = document.querySelector("[data-previous-operand]");
const currentOperandTxt = document.querySelector("[data-current-operand]");

const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");

const numberBtns = document.querySelectorAll("[data-number]");

const operationsBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");

class Calculator {
    constructor(previousOperandTxt, currentOperandTxt) {
        this.previousOperandTxt = previousOperandTxt;
        this.currentOperandTxt = currentOperandTxt;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
    
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
    
        let integerDisplay;
    
        if (isNaN(integerDigits)) {
          integerDisplay = "";
        } else {
          integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
          });
        }
    
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case "+":
                result = previousOperandFloat + currentOperandFloat;
                break;
            case "-":
                result = previousOperandFloat - currentOperandFloat;
                break;
            case "*":
                result = previousOperandFloat * currentOperandFloat;
                break;
            case "÷":
                result = previousOperandFloat / currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {

        if (this.currentOperand === "") return;

        if (this.previousOperand != "") {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
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
        this.previousOperandTxt.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTxt.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTxt,
    currentOperandTxt
);

for (const operationBtn of operationsBtns) {
    operationBtn.addEventListener("click", () => {
        calculator.chooseOperation(operationBtn.innerHTML);
        calculator.uptadeDisplay();
    })
}

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

equalsBtn.addEventListener("click", () => {
    calculator.calculate();
    calculator.uptadeDisplay();
});

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.uptadeDisplay();
})