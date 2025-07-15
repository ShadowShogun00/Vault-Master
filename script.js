let totalexpense = 0;

const modeButton = document.querySelector('.change-mode');
const modeIcon = modeButton.querySelector('i');

let isDarkMode = false;

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (!isDarkMode) {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeButton.style.backgroundColor = '#333';
    } else {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeButton.style.backgroundColor = 'red'; 
    }

    isDarkMode = !isDarkMode;
});

const expensebtn = document.getElementById('addexpensebtn');
const expenseContainer = document.getElementById('expense-container');
const cbtn = document.getElementById('cancelbtn');
const sbtn = document.getElementById('submitbtn');

expensebtn.addEventListener('click', () => {
    expenseContainer.style.display = 'grid';
    cbtn.style.display = 'block';
    sbtn.style.display = 'block';
    expensebtn.style.display = 'none';
});

cbtn.addEventListener('click', () => {
    expenseContainer.style.display = 'none';
    sbtn.style.display = 'none';
    cbtn.style.display = 'none';
    expensebtn.style.display = 'block';
    // Clear form fields when canceling
    clearExpenseForm();
});

function clearExpenseForm() {
    document.getElementById('datebox').value = '';
    document.getElementById('categorybox').value = '0';
    document.getElementById('itembox').value = '';
    document.getElementById('amountbox').value = '';
}

function updateTotals() {
    const balancecell = document.getElementById('rbalance');
    const expensecell = document.getElementById('texpense');
    const income = document.getElementById('incomebox').value;
    const cleanIncome = income.replace(/[₹\s]/g, '');
    const cincome = parseFloat(cleanIncome) || 0;

    const tbody = document.getElementById('expense-body');
    const rows = tbody.rows;
    let total = 0;
    
    for(let i = 0; i < rows.length; i++){
        const amountCell = rows[i].cells[3];
        const amount = parseFloat(amountCell.innerText) || 0;
        total += amount;
    }
    
    expensecell.innerText = total;
    let bcell = cincome - total;
    balancecell.innerText = bcell;
}

sbtn.addEventListener('click', () => {
    const tbody = document.getElementById('expense-body');
    const date = document.getElementById('datebox').value;
    const categorySelect = document.getElementById('categorybox');
    const category = categorySelect.value;
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
    const item = document.getElementById('itembox').value;
    const amount = document.getElementById('amountbox').value;

    if (date === '') {
        alert('Please enter a date');
        return;
    }
    if (category === '0') {
        alert('Please select a category');
        return;
    }
    if (item === '') {
        alert('Please enter an item');
        return;
    }
    if (amount === '') {
        alert('Please enter an amount');
        return;
    }
    
    if (isNaN(parseFloat(amount))) {
        alert('Please enter a valid amount');
        return;
    }

    const newRow = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.innerText = date;

    const categoryCell = document.createElement('td');
    categoryCell.innerText = categoryText;

    const itemCell = document.createElement('td');
    itemCell.innerText = item;

    const amountCell = document.createElement('td');
    amountCell.innerText = amount;

    newRow.appendChild(dateCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(itemCell);
    newRow.appendChild(amountCell);

    tbody.appendChild(newRow);

    // Clear form fields
    clearExpenseForm();
    
    // Hide form and show add button
    expenseContainer.style.display = 'none';
    sbtn.style.display = 'none';
    cbtn.style.display = 'none';
    expensebtn.style.display = 'block';

    // Update totals
    updateTotals();
});

// Add event listener for income input to update totals when income changes
document.getElementById('incomebox').addEventListener('input', updateTotals);