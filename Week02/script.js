const form = document.querySelector('form');
const income = document.querySelector('input[name=income]');
const rate = document.querySelector('input[name=tax]');
const output = document.querySelector('input[name=output]');
const alert_msg = document.querySelector('div.alert-text');

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

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let incomeValue = Number(income.value);
    if (incomeValue < 0){
        alert_msg.parentElement.className = 'alert alert-danger';
        alert_msg.innerText = 'กรุณากรอกข้อมูลให้ถูกต้อง';
        alert_msg.parentElement.removeAttribute('hidden')
        return;
    }
    let taxesRate = getTexesRate(incomeValue)
    let texes = incomeValue * taxesRate;
    rate.value = taxesRate;
    output.value = texes;
    alert_msg.parentElement.className = 'alert alert-success';
    alert_msg.innerText = 'คำนวณค่าสำเร็จ';
    alert_msg.parentElement.removeAttribute('hidden')
})