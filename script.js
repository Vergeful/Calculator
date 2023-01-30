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
    const operations = document.querySelectorAll('.operation');

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
                buttons.forEach(button => {
                    button.classList.remove('disabled');
                });
    

            } else if (button.textContent === "DEL"){
                if (displayValue.slice(-1) === "."){
                    decimal.classList.remove('disabled');
                }

                if (displayValue.slice(-1) === "+" || displayValue.slice(-1) === "-" || displayValue.slice(-1) === "x" || displayValue.slice(-1) === "/"){
                    operations.forEach(operation => {
                        operation.classList.remove('disabled');
                    })
                }

                displayValue = displayValue.substring(0, displayValue.length-1);
                output.innerText = displayValue;


            }else if(button.textContent === "="){
                result = doOperations(displayValue);
                output.innerText = displayValue + " = " + result;
                buttons.forEach(button => {
                    if (button.textContent !== "C"){
                        button.classList.add('disabled');
                    }
                });

            }else if(button.textContent === "."){
                displayValue += button.textContent;
                output.innerText = displayValue;
                decimal.classList.add('disabled');


            }else{

                if (button.classList.contains('operation')){

                    decimal.classList.remove('disabled');
                    operations.forEach(operation => {
                        operation.classList.add('disabled');
                    });

                    if (displayValue.indexOf('0') !== -1 || displayValue.indexOf('1') !== -1 || displayValue.indexOf('2') !== -1 || displayValue.indexOf('3') !== -1 || displayValue.indexOf('4') !== -1 || displayValue.indexOf('5') !== -1 || displayValue.indexOf('6') !== -1 || displayValue.indexOf('7') !== -1 || displayValue.indexOf('8') !== -1 || displayValue.indexOf('9') !== -1){
                        displayValue += button.textContent;
                        output.innerText = displayValue;
                    }
                }


                if (button.classList.contains('number')){

                    operations.forEach(operation => {
                        operation.classList.remove('disabled');
                    })

                    displayValue += button.textContent;
                    output.innerText = displayValue;
                }
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
            displayArray.push(+arrayItem);
            arrayItem = "";
            displayArray.push(displayValue[i]);
        }

        displayRemainder = displayRemainder.substring(1);

        if (displayRemainder.indexOf('+') === -1 && displayRemainder.indexOf('-') === -1 && displayRemainder.indexOf('x') === -1 && displayRemainder.indexOf('/') === -1  ){
            displayArray.push(+displayRemainder);
            break;
        }
    }

    let result;
    let i = 0;
    while (i < displayArray.length){
        if (i === 0){
            if (displayArray[i+1] === '+'){
                result = add(displayArray[i],displayArray[i+2]);
            }else if (displayArray[i+1] === '-'){
                result = substract(displayArray[i],displayArray[i+2]);
            }else if (displayArray[i+1] === 'x'){
                result = multiply(displayArray[i],displayArray[i+2]);
            }else if (displayArray[i+1] === '/'){
                result = divide(displayArray[i], displayArray[i+2]);
            }
        }else{
            if (displayArray[i+1] === '+'){
                result = add(result,displayArray[i+2]);
            }else if (displayArray[i+1] === '-'){
                result = substract(result,displayArray[i+2]);
            }else if (displayArray[i+1] === 'x'){
                result = multiply(result,displayArray[i+2]);
            }else if (displayArray[i+1] === '/'){
                result = divide(result, displayArray[i+2]);
            }
        }
        i = i + 2;
    }

    return result;
}