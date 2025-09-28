document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="delete-btn">Excluir</button>
            `;
            li.dataset.index = index;
            if(task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
        updateTaskCount();
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            updateAndRender();
        }
    };

    const handleTaskClick = (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.parentElement.dataset.index;
            tasks.splice(index, 1);
            updateAndRender();
        } else if (e.target.tagName === 'SPAN') {
            const index = e.target.parentElement.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            updateAndRender();
        }
    };

    const clearCompleted = () => {
        tasks = tasks.filter(task => !task.completed);
        updateAndRender();
    };

    const updateTaskCount = () => {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = remainingTasks;
    };

    const updateAndRender = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    clearCompletedBtn.addEventListener('click', clearCompleted);

    renderTasks();
});