/**
 * @see https://github.com/zamorluz/curso-coder-js-1.git
 */

/**
 * @var La primera cuota puede ser bonificada?
 */
const primeraCuotaBonificada = true;
const NOTIFICATION_TYPE_ERROR = 'error';
const NOTIFICATION_TYPE_SUCCESS = 'success';
const NOTIFICATION_TYPE_NEUTRAL = 'neutral';

const annual_interest = 15;
const amount_min = 100;
const amount_max = 10000;

const payments_amount_min = 1;
const payments_amount_max = 48;

let calculate = true,
    simulations = {},
    free = [];

const init = () => {
    while(calculate){
        let loan_amount = prompt("ingresa al monto a solicitar"),
            payments_amount = prompt ("ingrese cantidad de cuotas"),
            calculation = loan_calculate(loan_amount, payments_amount);
        if(primeraCuotaBonificada){
            let free_payment = calculation[0];
            free.push(free_payment);
            calculation.shift();
            notify(`Se te ha bonificado la cuota:\n ${paymentToText(free_payment)}`,NOTIFICATION_TYPE_SUCCESS);
        }
        notify(loanToMessage(calculation),NOTIFICATION_TYPE_SUCCESS);
        calculate = confirm(`Deseas hacer otro cálculo?`);
    }
};

function loan_calculate(loan_amount, payments_amount){
    if(validateLoan(loan_amount, payments_amount)){
        loan_amount = parseFloat(loan_amount);
        payments_amount = parseInt(payments_amount);
    }
    if(is_set(simulations[payments_amount]) && is_set(simulations[payments_amount][loan_amount])){
        return simulations[payments_amount][loan_amount];
    }
    if(empty(simulations[payments_amount])){
        simulations[payments_amount] = {};
    }
    if(empty(simulations[payments_amount][loan_amount])){
        simulations[payments_amount][loan_amount] = [];
    }
    let monthly_payment_base = parseFloat(loan_amount / payments_amount),
        monthly_interest_perc = annual_interest / 100 / 12, 
        monthly_interest_amount = loan_amount * monthly_interest_perc,
        monthly_payment_base_current = parseFloat(monthly_payment_base + monthly_interest_amount),
        total_interest = payments_amount * monthly_interest_amount,
        total_to_pay = loan_amount + total_interest;
    for(let i = 0 ; i < payments_amount ; i++){
        let accum_interest = i * monthly_interest_amount,
            accum_principal = i * monthly_payment_base_current;
        simulations[payments_amount][loan_amount].push({
            payment: {
                interest: monthly_interest_amount,
                capital: monthly_payment_base,
                full: monthly_payment_base_current,
                number: i + 1
            },
            interest: {
                annual_interest,
                monthly_interest_perc,
                monthly_interest_amount,
                paid   : accum_interest,
                to_pay : total_interest - accum_interest,
                total  : total_interest
            },
            principal: {
                total: loan_amount,
                total_with_interest: total_to_pay,
                paid: accum_principal,
                to_pay: total_to_pay - (i * monthly_payment_base_current),
            }
        });
    }
    return simulations[payments_amount][loan_amount];
}
const paymentToText = (payment) => {
    return `Cuota ${payment.payment.number}: 
    Total a pagar: ${payment.payment.full}, 
    Capital ${payment.payment.capital}, 
    Interes: ${payment.payment.interest}.
    Restante por pagar: ${payment.principal.to_pay}
    Pagado: ${payment.principal.paid}`;
};
const loanToMessage = (simulation) => {
    let message = '';
    for(let z = 0 ; z < simulation.length ; z++){
        message += paymentToText(simulation[z]) + "\n";
    }
    return message;
};
const validateNumber = (variable)   => isNaN(variable);
const validateMin = (variable, min) => validateNumber(variable) && validateNumber(min) && variable >= min;
const validateMax = (variable, max) => validateNumber(variable) && validateNumber(max) && variable <= max;
const validateLoan = (loan_amount, payments_amount) => {
    if(validateNumber(loan_amount)){
        return notify("el monto del prestamo debe ser un numero. Recibido " + loan_amount, NOTIFICATION_TYPE_ERROR);
    }
    loan_amount = parseFloat(loan_amount);
    if(validateMin(loan_amount, amount_min)){
        return notify("el monto del prestamo debe ser mayor a " + amount_min + ". Recibido " + loan_amount, NOTIFICATION_TYPE_ERROR);
    }
    if(validateMax(loan_amount, amount_max)){
        return notify("el monto del prestamo debe ser menor o igual a " + amount_max + ". Recibido " + loan_amount, NOTIFICATION_TYPE_ERROR);
    }
    if(validateNumber(payments_amount)){
        return notify("la cantidad de cuotas debe ser un numero. Recibido: " + payments_amount, NOTIFICATION_TYPE_ERROR);
    }
    payments_amount = parseInt(payments_amount);
    if(validateMax(payments_amount, payments_amount_max)){
        return notify('la cantidad de cuotas debe ser menor a ' + payments_amount_max + '. Recibido: ' + payments_amount, NOTIFICATION_TYPE_ERROR);
    }
    if(validateMax(payments_amount, payments_amount_min)){
        return notify('la cantidad de cuotas debe ser mayor o igual a ' + payments_amount_min + '. Recibido: ' + payments_amount, NOTIFICATION_TYPE_ERROR);
    }
    return true;
};
const is_set = (variable) => typeof variable !== typeof undefined;
const empty = (variable) => !is_set(variable);
const notify = (message, type = NOTIFICATION_TYPE_NEUTRAL) => {
    alert(message);
    let return_value;
    switch(type){
        case NOTIFICATION_TYPE_ERROR:
            console.error(message);
            return_value = false;
            break;
        case NOTIFICATION_TYPE_SUCCESS:
            console.info(message);
            return_value = true;
            break;
        default: 
            console.log(message);
            return_value = null;
            break;
    }
    return return_value;
};

init();