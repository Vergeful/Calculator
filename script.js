window.onload = populateScreen();
let displayValue = "";

function add(x,y){
    return x+y;
}

function substract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    return x/y;
}

function operate(operator, x, y){
    if (operator === "+") return add(x,y);
    if (operator === "-") return substract(x,y);
    if (operator === "x") return multiply(x,y);
    if (operator === "/") return divide(x,y);
}

function populateScreen(){
    const buttons = document.querySelectorAll('.button');
    const output = document.querySelector('.output');
    const decimal = document.querySelector('.decimal');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hovered');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hovered');
        });

        button.addEventListener('click', () => {

            if (button.textContent === "C"){
                displayValue = "";
                output.innerText = displayValue;
                decimal.classList.remove('disabled');

            } else if (button.textContent === "DEL"){
                if (displayValue.slice(-1) === "."){
                    decimal.classList.remove('disabled');
                }
                displayValue = displayValue.substring(0, displayValue.length-1);
                output.innerText = displayValue;

            }else if(button.textContent === "="){
                doOperations(displayValue);

            }else if(button.textContent === "."){
                displayValue += button.textContent;
                output.innerText = displayValue;
                decimal.classList.add('disabled');

            }else{
                if (button.textContent === "+" || button.textContent === "-" || button.textContent === "x" || button.textContent === "/"){
                    decimal.classList.remove('disabled');
                }
                displayValue += button.textContent;
                output.innerText = displayValue;
            }

        });
    });

}

function doOperations(displayValue){
    let displayArray = [];
    let arrayItem = "";
    displayRemainder = displayValue;

    for (let i =0; i<displayValue.length; i++){
        if (displayValue[i] !== '+' && displayValue[i] !== '-' && displayValue[i] !== 'x' && displayValue[i] !== '/'){
            arrayItem += displayValue[i];
        }else{
            displayArray.push(arrayItem);
            arrayItem = "";
            displayArray.push(displayValue[i]);
        }

        displayRemainder = displayRemainder.substring(1);

        if (displayRemainder.indexOf('+') === -1 && displayRemainder.indexOf('-') === -1 && displayRemainder.indexOf('x') === -1 && displayRemainder.indexOf('/') === -1  ){
            displayArray.push(displayRemainder);
            break;
        }
    }

    return displayArray;
}


