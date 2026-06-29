// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Add task
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Global variables
let currentFilter = 'all';

// Add task with category
function addTask() {
    const taskText = todoInput.value.trim();
    const category = document.getElementById('category-select').value;
    
    if (taskText === '') return;

    const li = document.createElement('li');
    li.classList.add(`task-${category}`);
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    
    // Add completion date element
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });
    
    const taskWrapper = document.createElement('div');
    taskWrapper.appendChild(taskContent);
    taskWrapper.appendChild(dateSpan);
    
    li.appendChild(taskWrapper);
    li.appendChild(deleteBtn);
    
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        dateSpan.textContent = li.classList.contains('completed') 
            ? new Date().toLocaleDateString() 
            : '';
    });
    
    todoList.appendChild(li);
    todoInput.value = '';
    filterTasks();
}

// Filter tasks by category
function filterTasks() {
    const tasks = document.querySelectorAll('#todo-list li');
    tasks.forEach(task => {
        const visible =
            currentFilter === 'all' || 
            task.classList.contains(`task-${currentFilter}`);
        task.style.display = visible ? 'flex' : 'none';
    });
}

// Initialize filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => 
            b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterTasks();
    });
});