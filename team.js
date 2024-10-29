const employeeForm = document.getElementById('employee-form');
const taskForm = document.getElementById('task-form');
const employeeTableBody = document.getElementById('employee-table-body');
const taskTableBody = document.getElementById('task-table-body');
const assignSelect = document.getElementById('assign');
const taskChart = document.getElementById('taskChart').getContext('2d');

// Employee Data and Task Data
let employees = [];
let tasks = [];

// Add Employee
employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const email = document.getElementById('email').value;

    addEmployee(name, position, department, email);
    employeeForm.reset();
});

function addEmployee(name, position, department, email) {
    employees.push({ name, position, department, email });
    updateEmployeeTable();
    updateAssignSelect();
}

function updateEmployeeTable() {
    employeeTableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.email}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Fire</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            fireEmployee(index);
        });
    });
}

function fireEmployee(index) {
    employees.splice(index, 1);  // Remove employee from array
    updateEmployeeTable();       // Refresh employee table
    updateAssignSelect();        // Refresh task assignment dropdown
}

function updateAssignSelect() {
    assignSelect.innerHTML = '';
    employees.forEach(employee => {
        assignSelect.innerHTML += `<option value="${employee.email}">${employee.name} (${employee.email})</option>`;
    });
}

// Assign Task
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = document.getElementById('task').value;
    const deadline = document.getElementById('deadline').value;
    const assignedTo = document.getElementById('assign').value;
    const aiAssist = document.getElementById('ai-assist').checked;

    addTask(task, deadline, assignedTo, aiAssist);
    taskForm.reset();
});

function addTask(task, deadline, assignedTo, aiAssist) {
    const taskData = {
        task,
        deadline,
        assignedTo,
        status: 'Pending',
        aiAssist
    };
    tasks.push(taskData);
    updateTaskTable();
    updateTaskChart();
}

function updateTaskTable() {
    taskTableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.assignedTo}</td>
            <td>${task.deadline}</td>
            <td>${task.status}</td>
            <td>
                <button class="delete-task-btn" data-index="${index}">Delete</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });

    document.querySelectorAll('.delete-task-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskTable();
    updateTaskChart();
}

// Task Completion Overview Chart
let chartData = {
    labels: ['Pending', 'Completed', 'Overdue'],
    datasets: [{
        label: 'Tasks',
        data: [tasks.filter(t => t.status === 'Pending').length, 0, 0], // Dynamic data
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
    }]
};

let taskCompletionChart = new Chart(taskChart, {
    type: 'pie',
    data: chartData
});

function updateTaskChart() {
    chartData.datasets[0].data = [
        tasks.filter(t => t.status === 'Pending').length,
        tasks.filter(t => t.status === 'Completed').length,
        tasks.filter(t => t.status === 'Overdue').length
    ];
    taskCompletionChart.update();
}
