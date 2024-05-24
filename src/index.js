import './scss/main.scss'

//Dynamic field
let drug = [];
drug[0]={
    name:"Парацетамол",
    price:100.00
}
drug[1]={
    name:"Анантаваті",
    price:300.00
}
drug[2]={
    name:"Німесил",
    price:50.00
}

const addBtn = document.querySelector(".add");
const input = document.querySelector(".inp-group");
const totalSumDiv = document.querySelector(".total_sum");//!


function removeInput(){
    this.parentElement.remove();
    updateTotal();//!
}

function updateTotal() {//!
    let total = 0;
    const flexContainers = document.querySelectorAll('.flex');
    flexContainers.forEach(flex => {
        const select = flex.querySelector('select');
        const quantity = flex.querySelector('input[type="number"]');
        const selectedDrug = drug.find(d => d.name === select.value);
        if (selectedDrug && quantity.value) {
            total += selectedDrug.price * parseInt(quantity.value);
        }
    });
    totalSumDiv.textContent = `Вартість: ${total.toFixed(2)}`;
}
function addInput(){
    const select = document.createElement("select");

    drug.forEach(d => {
        const option = document.createElement("option");
        option.value = d.name;
        option.textContent = d.name;
        select.appendChild(option);
    });

    const quantity = document.createElement("input");
    quantity.type = 'number';
    quantity.placeholder = "Enter Quantity";
    quantity.min = "0";

    //!
    select.addEventListener('change', updateTotal);
    quantity.addEventListener('input', updateTotal);
    //!

    const btn = document.createElement("a");
    btn.className = 'delete';
    btn.innerHTML = "&times";

    btn.addEventListener("click", removeInput);

    const flex = document.createElement("div");
    flex.className = 'flex';

    input.appendChild(flex);
    flex.appendChild(select);
    flex.appendChild(quantity);
    flex.appendChild(btn);

}

addBtn.addEventListener("click", addInput);