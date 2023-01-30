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
            } else if (button.textContent === "DEL"){
                displayValue = displayValue.substring(0, displayValue.length-1);
                output.innerText = displayValue;
            }else if(button.textContent === "="){

            }else{
                displayValue += button.textContent;
                output.innerText = displayValue;
            }
        })
    });

}