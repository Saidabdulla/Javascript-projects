class Calculator {
    constructor(prevOperandText, curOperandText){
        this.prevOperandText = prevOperandText;
        this.curOperandText = curOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.prevOperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;

            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumbers(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else return integerDisplay;
    }

    updateDisplay(){
        this.curOperandText.innerText = this.getDisplayNumbers(this.currentOperand);
        if(this.operation != null){
            this.prevOperandText.innerText = `${this.getDisplayNumbers(this.prevOperand)} ${this.operation}`;
        }
        else this.prevOperandText.innerText = '';
    }


}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandText = document.querySelector('[data-pr-operand]');
const curOperandText = document.querySelector('[data-cur-operand]');

const calculator = new Calculator(prevOperandText, curOperandText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});
