// Select elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    // Add the new task to the list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';

    // Add event listener to the delete button
    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
    });
}

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add event listener for pressing Enter in the input field
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

