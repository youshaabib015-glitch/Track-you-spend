let date = document.getElementById('showdate');
let Add = document.getElementById('addButton');

try {
    const today = new Date();
    const formated = today.toLocaleDateString("en-US", {
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric"
    });
    date.textContent = formated;
} catch(error) {
    console.log("Error displaying date: ", error);
    date.textContent = "Unable to load date";
}

let totalExpensesSpan = document.getElementById("totalExpenses");
let netBalanceSpan = document.getElementById("netBalance");
let totalIncomeSpan = document.getElementById("totalIncome");
let totalExpenses = 0;
let totalIncome = 0;

Add.addEventListener('click',function(e){
    e.preventDefault();
    let description = document.querySelector("input[type='text']").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let tableBody = document.getElementById("elements");
    let row = document.createElement("tr");
    row.innerHTML =`
        <td>${description}</td>
        <td>${category}</td>
        <td>$${parseFloat(amount).toFixed(2)}</td>
        <td><button class="delete">X</button></td>
    `;
    tableBody.appendChild(row);

    let tableBody2 = document.getElementById("element2");
    let row2 = document.createElement("tr");
    row2.innerHTML = `
        <td>${category}: $${parseFloat(amount).toFixed(2)}</td>
    `;
    tableBody2.appendChild(row2);
    if(category.toLowerCase() === "income"){
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }
    let netBalance = totalIncome - totalExpenses;
    totalExpensesSpan.textContent = `$ ${totalExpenses.toFixed(2)}`;
    totalIncomeSpan.textContent = `$ ${totalIncome.toFixed(2)}`;
    netBalanceSpan.textContent = `$ ${netBalance.toFixed(2)}`;
});
let items = document.getElementById("elements");
items.addEventListener("click", function(e){
    if(e.target.classList.contains("delete")){
        let row = e.target.closest("tr");
        let amount = parseFloat(row.children[2].textContent.replace("$",""));
        let category = row.children[1].textContent;
        if(category.toLowerCase() === "income"){
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        let netBalance = totalIncome - totalExpenses;

        totalExpensesSpan.textContent = `$${totalExpenses.toFixed(2)}`;
        totalIncomeSpan.textContent = `$${totalIncome.toFixed(2)}`;
        netBalanceSpan.textContent = `$${netBalance.toFixed(2)}`;
        row.remove();
        let tableBody2 = document.getElementById("element2");
        for(let r of tableBody2.querySelectorAll("tr")){
            if(r.textContent.includes(category)){
        r.remove();
        break;
    }

    }
}

});

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link =>{
    link.addEventListener('click',function(e){
        e.preventDefault();
        let selectedCategory = this.getAttribute("data-category").toLowerCase();
        let rows = document.querySelectorAll("#elements tr");
        rows.forEach(row =>{
            let category = row.children[1].textContent.toLowerCase();
            if(selectedCategory === "all"){
                row.style.display = "";
            } else if(selectedCategory === "expenses"){
                if(category === "income"){
                    row.style.display = "none";
                } else {
                    row.style.display = "";
                }
            } else if(selectedCategory === category){
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});