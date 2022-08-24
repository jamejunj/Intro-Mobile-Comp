const form = document.forms[0];
const total_income = document.querySelector('input[name=total-income]');
const rate = document.querySelector('input[name=tax]');
const output = document.querySelector('input[name=output]');
const alert_msg = document.querySelector('div.alert-text');
const container = document.querySelector('.income-container')
const income = [...document.querySelectorAll('input[name=income]')];
// next index
let i = 0;

income.forEach(ic=>{
    ic.addEventListener('change', calculateTotalIncome);
})

function template(i){
    return `<label contenteditable>รายได้ (บาท)</label>
        <div class="input-group">
            <input class="form-control" type="text" name="income" id="income">
            <button type="button" class="btn add-button" onclick="addIncome();">+</button>
            <button type="button" class="btn remove-button" onclick="removeIncome(${i});">-</button>
        </div>`
}

function addIncome(){
    if ([...container.querySelectorAll('input[name=income]')].length >= 3) return;
    const div = document.createElement('div')
    div.className = 'income form-group'
    div.dataset.index = i;
    div.innerHTML = template(i);
    div.querySelector('input[name=income]').addEventListener('change', calculateTotalIncome);
    container.appendChild(div);
    i+=1;
}

function removeIncome(index){
    if (index){
        let income = container.querySelector(`div.income[data-index="${index}"]`);
        let recalculate = income.querySelector('input[name=income]').value;
        income.remove();
        if (recalculate) calculateTotalIncome();
    }
}

function checkInputValid(){
    let error = false;
    [...container.querySelectorAll('input[name=income]')].forEach(ic=>{
        let incomeValue = Number(ic.value);
        if (incomeValue < 0){
            alert_msg.parentElement.className = 'alert alert-danger';
            alert_msg.innerText = 'กรุณากรอกข้อมูลให้ถูกต้อง';
            alert_msg.parentElement.removeAttribute('hidden')
            ic.classList.add('error')
            error = true;
            return;
        }
        ic.classList.remove('error');
    })
    return error;
}

function calculateTotalIncome(){
    let total = 0;
    if (checkInputValid()) return;
    [...container.querySelectorAll('input[name=income]')].forEach(ic=>{
        ic.value = toggleComma(ic.value, 'remove');
        ic.value = toggleComma(ic.value, 'add');
        let incomeValue = Number(ic.value.replace(/,/g, ''));
        total += incomeValue;
    })
    total_income.value = toggleComma('' + Number(total.toFixed(2)));
    form.dispatchEvent(new Event('submit'));
}

function getTexesRate(income){
    if (income <= 150000){
        return 0;
    }
    else if (income <= 300000){
        return 0.05;
    }
    else if (income <= 500000){
        return 0.1;
    }
    else if (income <= 750000){
        return 0.15;
    }
    else if (income <= 1000000){
        return 0.2;
    }
    else if (income <= 2000000){
        return 0.25;
    }
    else if (income <= 5000000){
        return 0.3;
    }
    else{
        return 0.35;
    }
}

function toggleComma(input, action='auto'){
    switch (action){
        case 'remove':
            input = input.replace(/,/g, '');
            break;
        case 'add':
            const parts = input.split('.');
            input = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
            break;
        default:
            if (input.includes(',')){
                input = input.replace(/,/g, '');
            }else{
                const parts = input.split('.');
                input = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
            }
    }
    return input;
}

function calculateTax(e){
    e.preventDefault();
    if (checkInputValid()) return;
    let incomeValue = Number(toggleComma(total_income.value, 'remove'));
    let taxesRate = getTexesRate(incomeValue)
    let taxes = incomeValue * taxesRate;
    rate.value = taxesRate * 100;
    output.value = toggleComma('' + Number(taxes.toFixed(2)));
    alert_msg.parentElement.className = 'alert alert-success';
    alert_msg.innerText = 'คำนวณค่าสำเร็จ';
    alert_msg.parentElement.removeAttribute('hidden')
}

form.addEventListener('submit', calculateTax)

addIncome();