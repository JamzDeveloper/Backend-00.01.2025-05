class Phone {
    state
    imei
    brand
    model
    report
    constructor(imei, brand, model, state) {
        this.imei = imei
        this.brand = brand
        this.model = model
        this.state = state
        this.report = this.updateReport()
    }
    
    updateReport() {
        if (this.imei === '861393320868554' || this.imei === '490793829702221') {
            return true
        } else {
            return false
        }
    }
}

class Client {
    nombre
    dni
    phone
    constructor(nombre, dni) {
        this.nombre = nombre
        this.dni = dni
        this.phone = null
    }
}

class Branch {
    branchName
    constructor(branchName) {
        this.branchName = branchName
    }
}

class Worker {
    name
    contact
    constructor(name, contact) {
        this.name = name
        this.contact = contact
    }
}

class Ticket {
    id
    phone
    client
    branch
    worker
    diagnosis
    percentageAmount
    finalAmount
    constructor(id, phone, client, branch, worker, diagnosis, percentageAmount, finalAmount) {
        this.id = id
        this.phone = phone
        this.client = client
        this.branch = branch
        this.worker = worker
        this.diagnosis = diagnosis
        this.percentageAmount = percentageAmount
        this.finalAmount = finalAmount
    }
}

const ticketForm = document.getElementById('ticketForm');
const ticketTableBody = document.getElementById('ticketTableBody');
const noTicketsMessage = document.getElementById('noTicketsMessage');
const clearFormBtn = document.getElementById('clearFormBtn');

const phoneImeiInput = document.getElementById('phoneImei');
const phoneBrandInput = document.getElementById('phoneBrand');
const phoneModelInput = document.getElementById('phoneModel');
const phoneStateInput = document.getElementById('phoneState');

const clientNameInput = document.getElementById('clientName');
const clientDniInput = document.getElementById('clientDni');

const branchNameInput = document.getElementById('branchName');

const workerNameInput = document.getElementById('workerName');
const workerContactInput = document.getElementById('workerContact');

const diagnosisInput = document.getElementById('diagnosis');
const percentageAmountInput = document.getElementById('percentageAmount');
const finalAmountInput = document.getElementById('finalAmount');
const ticketIdInput = document.getElementById('ticketId');

let tickets = []; 

function generateUniqueId() {
    return Date.now().toString();
}

function saveTickets() {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

function loadTickets() {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets);
        tickets = parsedTickets.map(data => {
            const phone = new Phone(data.phone.imei, data.phone.brand, data.phone.model, data.phone.state);
            const client = new Client(data.client.nombre, data.client.dni);
            const branch = new Branch(data.branch.branchName);
            const worker = new Worker(data.worker.name, data.worker.contact);
            return new Ticket(data.id, phone, client, branch, worker, data.diagnosis, data.percentageAmount, data.finalAmount);
        });
    }
}

function renderTickets() {
    ticketTableBody.innerHTML = '';
    if (tickets.length === 0) {
        noTicketsMessage.style.display = 'block';
        ticketTableBody.style.display = 'none';
        return;
    } else {
        noTicketsMessage.style.display = 'none';
        ticketTableBody.style.display = 'table-row-group';
    }

    tickets.forEach(ticket => {
        const row = ticketTableBody.insertRow();
        row.dataset.id = ticket.id;

        row.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.phone.imei} / ${ticket.phone.brand} / ${ticket.phone.model} (${ticket.phone.state})</td>
            <td>${ticket.client.nombre} / ${ticket.client.dni}</td>
            <td>${ticket.branch.branchName}</td>
            <td>${ticket.worker.name} / ${ticket.worker.contact}</td>
            <td>${ticket.diagnosis}</td>
            <td>${ticket.percentageAmount}%</td>
            <td>$${ticket.finalAmount}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editTicket('${ticket.id}')">Editar</button>
                <button class="delete-btn" onclick="deleteTicket('${ticket.id}')">Borrar</button>
            </td>
        `;
    });
}

function clearForm() {
    ticketForm.reset();
    ticketIdInput.value = '';
}

ticketForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const imei = phoneImeiInput.value;
        const brand = phoneBrandInput.value;
        const model = phoneModelInput.value;
        const state = phoneStateInput.value;
        const phone = new Phone(imei, brand, model, state);

        if (phone.report === true) {
        alert('¡Atención! Este teléfono está reportado y no se puede guardar el ticket.');
        return; 
    }
        const clientName = clientNameInput.value;
        const clientDni = clientDniInput.value;
        const client = new Client(clientName, clientDni);

        const branchName = branchNameInput.value;
        const branch = new Branch(branchName);

        const workerName = workerNameInput.value;
        const workerContact = workerContactInput.value;
        const worker = new Worker(workerName, workerContact);

        const diagnosis = diagnosisInput.value;
        const percentageAmount = parseInt(percentageAmountInput.value);
        const finalAmount = parseFloat(finalAmountInput.value);

        const id = ticketIdInput.value;

        if (id) {
            // Update existing ticket
            const index = tickets.findIndex(ticket => ticket.id === id);
            if (index !== -1) {
                tickets[index] = new Ticket(id, phone, client, branch, worker, diagnosis, percentageAmount, finalAmount);
            }
        } else {
            // Create new ticket
            const newId = generateUniqueId();
            const newTicket = new Ticket(newId, phone, client, branch, worker, diagnosis, percentageAmount, finalAmount);
            tickets.push(newTicket);
        }

        saveTickets();
        renderTickets();
        clearForm();
    
});

function editTicket(id) {
    const ticketToEdit = tickets.find(ticket => ticket.id === id);
    if (ticketToEdit) {
        // Populate form fields
        phoneImeiInput.value = ticketToEdit.phone.imei;
        phoneBrandInput.value = ticketToEdit.phone.brand;
        phoneModelInput.value = ticketToEdit.phone.model;
        phoneStateInput.value = ticketToEdit.phone.state;

        clientNameInput.value = ticketToEdit.client.nombre;
        clientDniInput.value = ticketToEdit.client.dni;

        branchNameInput.value = ticketToEdit.branch.branchName;

        workerNameInput.value = ticketToEdit.worker.name;
        workerContactInput.value = ticketToEdit.worker.contact;

        diagnosisInput.value = ticketToEdit.diagnosis;
        percentageAmountInput.value = ticketToEdit.percentageAmount;
        finalAmountInput.value = ticketToEdit.finalAmount;

        ticketIdInput.value = ticketToEdit.id;
    }
}

function deleteTicket(id) {
    if (confirm('Are you sure you want to delete this ticket?')) {
        tickets = tickets.filter(ticket => ticket.id !== id);
        saveTickets();
        renderTickets();
    }
}

clearFormBtn.addEventListener('click', clearForm);

document.addEventListener('DOMContentLoaded', () => {
    loadTickets();
    renderTickets();
});