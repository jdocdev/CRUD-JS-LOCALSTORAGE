const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;   
    
    if(name && email) {
        const newData = {name,email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('Todos los datos son obligatorios')
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData',JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add("button", 'button--secondary');
        deleteButton.classList.add("button", 'button--tertiary');

        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton)

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();

