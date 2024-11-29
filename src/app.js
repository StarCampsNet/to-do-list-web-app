// Select elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Retrieve tasks from Local Storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to Local Storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks from Local Storage
function renderTasks() {
    const tasks = getTasksFromLocalStorage();

    tasks.forEach((taskText) => {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
    });
}

// Create a task DOM element
function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    // Add event listener to the delete button
    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
        deleteTaskFromLocalStorage(taskText);
    });

    return listItem;
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task element and add it to the list
    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);

    // Save the new task to Local Storage
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    saveTasksToLocalStorage(tasks);

    // Clear the input field
    taskInput.value = '';
}

// Delete a task from Local Storage
function deleteTaskFromLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter((task) => task !== taskText);
    saveTasksToLocalStorage(updatedTasks);
}

// Add event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', renderTasks);

