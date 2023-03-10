// Dom Elements
const hourEl = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const number0El = document.querySelector('.number-0');

const numberElArray = [number0El, number1El,number2El,number3El,number4El,number5El,number6El,number7El,number8El,number9El];

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// functions
const getValueAsStr = () => displayEl.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length - 1] === '.'){
        displayEl.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if(decimalStr){
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    }else{
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getValueAsStr();
    if(currentDisplayStr === '0'){
        setStrAsValue(numStr);
    }else{
        setStrAsValue(currentDisplayStr + numStr);
    }
};

const getResultOfOperationAsStre = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if(operatorInMemory === 'addition'){
        newValueNum = valueNumInMemory + currentValueNum;
    }else if (operatorInMemory === 'subtraction'){
        newValueNum = valueNumInMemory - currentValueNum;
    }
    else if (operatorInMemory === 'multiplication'){
        newValueNum = valueNumInMemory * currentValueNum;
    }
    else if (operatorInMemory === 'division'){
        newValueNum = valueNumInMemory / currentValueNum;
    }

    return newValueNum.toString();
}

const handleOperatorClick = (operation) => {
    const currentDisplayStr = getValueAsStr();
    if(!valueStrInMemory){
        valueStrInMemory = currentDisplayStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }

    valueStrInMemory = getResultOfOperationAsStre();
    operatorInMemory = operation;
    setStrAsValue('0');
};

// add event listeners to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentDisplayStr = getValueAsStr();

    if(currentDisplayStr === '-0'){
        setStrAsValue('0');
        return;
    }

    if(currentValueNum >= 0){
        setStrAsValue('-' + currentDisplayStr);
    }else{
        setStrAsValue(currentDisplayStr.substring(1));
    }
});

percentEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

//add event listeners to operators
additionEl.addEventListener('click',() => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click',() => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click',() => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click',() => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click',() => {
    if(valueStrInMemory){
        setStrAsValue(getResultOfOperationAsStre());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// add event listeners to numbers and decimal
for(let i=0; i < numberElArray.length; i++){
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}
decimalEl.addEventListener('click', () => {
    const currentDisplayStr = getValueAsStr();
    if(!currentDisplayStr.includes('.')){
        setStrAsValue(currentDisplayStr + '.');
        displayEl.textContent = currentDisplayStr + '.';
    }    
});

// set up the time
const updateTime = () => {
    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minute.textContent = currentMinute.toString().padStart(2,'0');
}
setInterval(updateTime, 1000);
updateTime();