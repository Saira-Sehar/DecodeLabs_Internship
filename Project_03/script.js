// ========== STATE MANAGEMENT ==========
let tasks = [];
let currentFilter = 'all';
let currentPriority = 'medium';
let isDarkMode = false;

// ========== DOM REFERENCES (const) ==========
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyMessage = document.getElementById('emptyMessage');
const taskCounter = document.getElementById('taskCounter');
const listTitle = document.getElementById('listTitle');
const priorityBtn = document.getElementById('priorityBtn');
const priorityDropdown = document.getElementById('priorityDropdown');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const searchInput = document.getElementById('searchInput');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const toastContainer = document.getElementById('toastContainer');
const dateDisplay = document.getElementById('dateDisplay');

// ========== INITIALIZATION ==========
function init() {
    loadFromStorage();
    updateDate();
    renderAll();
    updateStats();
    updateCounts();
}

// ========== DATE DISPLAY ==========
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
}

// ========== LOCAL STORAGE ==========
function saveToStorage() {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    localStorage.setItem('taskflow-darkmode', JSON.stringify(isDarkMode));
}

function loadFromStorage() {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    const savedDarkMode = localStorage.getItem('taskflow-darkmode');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    if (savedDarkMode) {
        isDarkMode = JSON.parse(savedDarkMode);
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Light Mode';
        }
    }
}

// ========== TASK CRUD OPERATIONS ==========
function addTask(text, priority = currentPriority) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        important: false,
        priority: priority,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(task);
    saveToStorage();
    renderAll();
    updateStats();
    updateCounts();
    showToast('Task added successfully!');
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToStorage();
    renderAll();
    updateStats();
    updateCounts();
    showToast('Task deleted');
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToStorage();
        renderAll();
        updateStats();
        updateCounts();
    }
}

function toggleImportant(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.important = !task.important;
        saveToStorage();
        renderAll();
        updateCounts();
    }
}

function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
        showToast('No completed tasks to clear');
        return;
    }
    tasks = tasks.filter(task => !task.completed);
    saveToStorage();
    renderAll();
    updateStats();
    updateCounts();
    showToast(`${completedCount} completed task(s) cleared`);
}

// ========== FILTERING ==========
function getFilteredTasks() {
    let filtered = [...tasks];
    
    // Apply category filter
    switch(currentFilter) {
        case 'active':
            filtered = filtered.filter(t => !t.completed);
            break;
        case 'completed':
            filtered = filtered.filter(t => t.completed);
            break;
        case 'important':
            filtered = filtered.filter(t => t.important);
            break;
    }
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(t => t.text.toLowerCase().includes(searchTerm));
    }
    
    return filtered;
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update sidebar nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.filter === filter) item.classList.add('active');
    });
    
    // Update mobile tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) tab.classList.add('active');
    });
    
    // Update title
    const titles = {
        all: 'All Tasks',
        active: 'Active Tasks',
        completed: 'Completed Tasks',
        important: 'Important Tasks'
    };
    listTitle.textContent = titles[filter] || 'All Tasks';
    
    renderAll();
    updateCounts();
}

// ========== RENDERING ==========
function renderAll() {
    const filtered = getFilteredTasks();
    
    // Update task list
    if (filtered.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.add('show');
        taskCounter.textContent = '0 tasks';
        
        const messages = {
            all: 'Add a new task to get started!',
            active: 'No active tasks. Great job!',
            completed: 'No completed tasks yet.',
            important: 'No important tasks marked.'
        };
        emptyMessage.textContent = messages[currentFilter] || 'No tasks found';
    } else {
        emptyState.classList.remove('show');
        taskCounter.textContent = `${filtered.length} task${filtered.length !== 1 ? 's' : ''}`;
        
        taskList.innerHTML = filtered.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <button class="task-checkbox js-toggle-complete" data-id="${task.id}">
                    ${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}
                </button>
                <span class="task-text">${escapeHTML(task.text)}</span>
                <span class="task-priority ${task.priority}"></span>
                <button class="task-important js-toggle-important ${task.important ? 'is-important' : ''}" data-id="${task.id}">
                    <i class="fa-${task.important ? 'solid' : 'regular'} fa-star"></i>
                </button>
                <button class="task-delete js-delete-task" data-id="${task.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Attach event listeners
        attachTaskEvents();
    }
}

function attachTaskEvents() {
    // Toggle complete
    document.querySelectorAll('.js-toggle-complete').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            toggleComplete(id);
        });
    });
    
    // Toggle important
    document.querySelectorAll('.js-toggle-important').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            toggleImportant(id);
        });
    });
    
    // Delete task
    document.querySelectorAll('.js-delete-task').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            deleteTask(id);
        });
    });
}

function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statActive').textContent = active;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statProductivity').textContent = `${productivity}%`;
}

function updateCounts() {
    document.getElementById('countAll').textContent = tasks.length;
    document.getElementById('countActive').textContent = tasks.filter(t => !t.completed).length;
    document.getElementById('countCompleted').textContent = tasks.filter(t => t.completed).length;
    document.getElementById('countImportant').textContent = tasks.filter(t => t.important).length;
}

// ========== UTILITY FUNCTIONS ==========
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========== EVENT LISTENERS ==========

// Add Task Form
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTask(text, currentPriority);
        taskInput.value = '';
        taskInput.focus();
    }
});

// Priority Button
priorityBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    priorityDropdown.classList.toggle('show');
});

// Priority Options
document.querySelectorAll('.priority-option').forEach(option => {
    option.addEventListener('click', function() {
        currentPriority = this.dataset.priority;
        const priorityLabels = { low: 'Low', medium: 'Medium', high: 'High' };
        priorityBtn.innerHTML = `<i class="fa-solid fa-flag priority-${currentPriority}"></i> <span>${priorityLabels[currentPriority]}</span>`;
        priorityDropdown.classList.remove('show');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!priorityDropdown.contains(e.target) && e.target !== priorityBtn) {
        priorityDropdown.classList.remove('show');
    }
});

// Theme Toggle
themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    
    if (isDarkMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeText.textContent = 'Dark Mode';
    }
    
    saveToStorage();
});

// Search Input
searchInput.addEventListener('input', function() {
    renderAll();
});

// Clear Completed
document.getElementById('clearCompletedBtn').addEventListener('click', clearCompleted);

// Sidebar Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        setFilter(this.dataset.filter);
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });
});

// Mobile Filter Tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        setFilter(this.dataset.filter);
    });
});

// Mobile Menu
menuToggle.addEventListener('click', function() {
    sidebar.classList.add('open');
});

sidebarClose.addEventListener('click', function() {
    sidebar.classList.remove('open');
});

// Close sidebar on overlay click
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        renderAll();
    }
});

// ========== INITIALIZE APP ==========
init();