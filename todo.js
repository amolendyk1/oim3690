// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Add task
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
    
    todoList.appendChild(li);
    todoInput.value = '';
}