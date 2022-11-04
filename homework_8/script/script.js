'use strict';

let operations = new Set(['+','-','*','/']);
let errorSet = new Set([NaN,Infinity,null]);
document.getElementById('operand1').addEventListener('input' , (event) =>{document.getElementById('result').click()})
document.getElementById('operand2').addEventListener('input' , (event) =>{document.getElementById('result').click()})
document.getElementById('operation').addEventListener('input' , (event) =>{document.getElementById('result').click()})

document.getElementById('result').addEventListener('click' , (event) => {
    const operand1 = String(document.getElementById('operand1').value).replaceAll(' ','');
    const operand2 = String(document.getElementById('operand2').value).replaceAll(' ','');
    const operation = String(document.getElementById('operation').value).replaceAll(' ','');
    let operand1Error = '';
    let operand2Error = '';
    let operationError = '';
    event.preventDefault();       
   
    if  (operand1 === '') {
        operand1Error='Первое число не указано. ';
    } else if (errorSet.has(Number(operand1))) {
        operand1Error='Некорректный ввод 1-го числа. ';
    };
    
    if  (operand2 === '') {
        operand2Error = 'Второе число не указано. ';
    } else if (errorSet.has(Number(operand2))) {
        operand2Error = 'Некорректный ввод 2-го числа. ';
    };
    
    if  (operation === '') {
        operationError = 'Не введен знак операции.';
    } else if (!((operation.length === 1) && (operations.has(operation)))) {
        operationError = 'Программа не поддерживает такую операцию.';
    };
    
    let error = (operand1Error + operand2Error + operationError);
    if (error) {
        document.getElementById('result').setAttribute('style','font-size: ' + Math.min((Math.round(1.5*(55/(`Результат: ${Error}` + 'px').length) * 10) / 10), 1.45) + 'rem;');
        document.getElementById('result').value = error;
    } else {
        document.getElementById('result').setAttribute('style','font-size: 1.5rem;');
    };
    
    let resVar =0.0;
    if (!error) {
        switch (operation) {
            case '*': 
                resVar=Number(operand1) * Number(operand2);
                document.getElementById('result').value = `Результат: ${resVar}`;
                break;
            case '/': 
                if (Number(operand2) === 0) {
                    document.getElementById('result').value = 'Делить на ноль нельзя!';
                    break;
                } else {
                resVar=Number(operand1) / Number(operand2);
                document.getElementById('result').value = `Результат: ${resVar}`;
                break;
                }
            case '-': 
                resVar=Number(operand1) - Number(operand2);
                document.getElementById('result').value = `Результат: ${resVar}`;
                break;
            case '+': 
                resVar=Number(operand1) + Number(operand2);
                document.getElementById('result').value = `Результат: ${resVar}`;
                break;
        };
    };
});
