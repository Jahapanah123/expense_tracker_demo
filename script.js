const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const addExpense = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;

// Add or update expense
addExpense.addEventListener("click", function() {

    const expense = {
        amount: amount.value,
        description: description.value,
        category: category.value
    };

    if (editIndex === null) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = null;
        addExpense.textContent = "Add Expense";
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    amount.value = "";
    description.value = "";
    category.value = "";
});

// Display expenses
function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(function(expense, index) {
        expenseList.innerHTML += `
            <div>
                ${expense.amount} | ${expense.description} | ${expense.category}
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
    });
}

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

// Edit expense
function editExpense(index) {
    const expense = expenses[index];

    amount.value = expense.amount;
    description.value = expense.description;
    category.value = expense.category;

    editIndex = index;
    addExpense.textContent = "Update Expense";
}

// Initial display
displayExpenses();