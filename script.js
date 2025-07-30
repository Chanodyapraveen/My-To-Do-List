class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.taskIdCounter = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        
        this.initializeEventListeners();
        this.renderTasks();
    }

    initializeEventListeners() {
        // Add task button
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.showModal();
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal();
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideModal();
        });

        // Click outside modal to close
        document.getElementById('addTaskModal').addEventListener('click', (e) => {
            if (e.target.id === 'addTaskModal') {
                this.hideModal();
            }
        });

        // Task form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTasks(e.target.value);
        });

        // Filter dropdown
        document.getElementById('filterDropdown').addEventListener('change', (e) => {
            const filter = e.target.value === 'pending' ? 'active' : e.target.value;
            this.setFilter(filter);
        });

        // Clear completed button
        document.getElementById('clearCompletedBtn').addEventListener('click', () => {
            this.clearCompletedTasks();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
            if (e.ctrlKey && e.key === 'Enter') {
                this.showModal();
            }
        });

        // Theme toggle functionality
        document.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Load saved theme
        this.loadTheme();
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-toggle i');
        
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeIcon.className = 'bi bi-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'bi bi-moon';
            localStorage.setItem('theme', 'light');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        const themeIcon = document.querySelector('.theme-toggle i');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.className = 'bi bi-sun';
        } else {
            body.classList.remove('dark-mode');
            themeIcon.className = 'bi bi-moon';
        }
    }

    showModal() {
        document.getElementById('addTaskModal').classList.add('show');
        document.getElementById('taskTitle').focus();
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        document.getElementById('addTaskModal').classList.remove('show');
        document.getElementById('taskForm').reset();
        document.body.style.overflow = 'auto';
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const date = document.getElementById('taskDate').value;
        const priority = document.getElementById('taskPriority').value;

        if (!title || !date) {
            alert('Please fill in all required fields');
            return;
        }

        const task = {
            id: this.taskIdCounter++,
            title: title,
            date: date,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.hideModal();
        this.showNotification('Task added successfully!');
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            
            const message = task.completed ? 'Task completed!' : 'Task restored!';
            this.showNotification(message);
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.showNotification('Task deleted successfully!');
        }
    }

    clearCompletedTasks() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'info');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.renderTasks();
            this.showNotification(`${completedCount} completed task${completedCount > 1 ? 's' : ''} cleared successfully!`);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDate').value = task.date;
            document.getElementById('taskPriority').value = task.priority;
            
            // Change form to edit mode
            const form = document.getElementById('taskForm');
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.textContent = 'Update Task';
            
            // Remove existing event listener and add new one for update
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
            
            newForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateTask(taskId);
            });
            
            this.showModal();
        }
    }

    updateTask(taskId) {
        const title = document.getElementById('taskTitle').value.trim();
        const date = document.getElementById('taskDate').value;
        const priority = document.getElementById('taskPriority').value;

        if (!title || !date) {
            alert('Please fill in all required fields');
            return;
        }

        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.title = title;
            task.date = date;
            task.priority = priority;
            task.updatedAt = new Date().toISOString();
            
            this.saveTasks();
            this.renderTasks();
            this.hideModal();
            this.showNotification('Task updated successfully!');
            
            // Reset form back to add mode
            this.resetFormToAddMode();
        }
    }

    resetFormToAddMode() {
        const form = document.getElementById('taskForm');
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.textContent = 'Add Task';
        
        // Re-initialize form event listener
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Update dropdown
        const dropdown = document.getElementById('filterDropdown');
        const dropdownValue = filter === 'active' ? 'pending' : filter;
        dropdown.value = dropdownValue;
        
        this.renderTasks();
    }

    searchTasks(query) {
        this.searchQuery = query.toLowerCase();
        this.renderTasks();
    }

    getFilteredTasks() {
        let filteredTasks = [...this.tasks];

        // Apply filter
        if (this.currentFilter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }

        // Apply search
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(this.searchQuery)
            );
        }

        return filteredTasks;
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    isPastDue(dateString) {
        const taskDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return taskDate < today;
    }

    renderTasks() {
        const container = document.getElementById('tasksContainer');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            container.innerHTML = this.getEmptyStateHTML();
            return;
        }

        const tasksHTML = filteredTasks.map(task => {
            const isPastDue = !task.completed && this.isPastDue(task.date);
            const dueDateClass = isPastDue ? 'past-due' : '';
            
            return `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         onclick="todoApp.toggleTask(${task.id})"></div>
                    
                    <div class="task-content">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <div class="task-meta">
                            <div class="task-date ${dueDateClass}">
                                📅 Due: ${this.formatDate(task.date)}
                                ${isPastDue ? '<span style="color: #dc2626; margin-left: 0.5rem;">⚠️ Past Due</span>' : ''}
                            </div>
                            <div class="priority-badge priority-${task.priority}">
                                ${task.priority}
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-actions">
                        <button class="task-action-btn edit-btn" onclick="todoApp.editTask(${task.id})" title="Edit task">
                            ✏️
                        </button>
                        <button class="task-action-btn delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete task">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = tasksHTML;
    }

    getEmptyStateHTML() {
        const messages = {
            all: {
                icon: '📝',
                title: 'No tasks yet',
                message: 'Create your first task to get started!'
            },
            active: {
                icon: '✅',
                title: 'No active tasks',
                message: 'All caught up! Great job.'
            },
            completed: {
                icon: '🎉',
                title: 'No completed tasks',
                message: 'Complete some tasks to see them here.'
            }
        };

        const state = messages[this.currentFilter] || messages.all;
        
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${state.icon}</div>
                <h3>${state.title}</h3>
                <p>${state.message}</p>
            </div>
        `;
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00d4aa;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
            z-index: 1001;
            transform: translateX(300px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    // Public methods for debugging
    exportTasks() {
        return JSON.stringify(this.tasks, null, 2);
    }

    importTasks(tasksJson) {
        try {
            this.tasks = JSON.parse(tasksJson);
            this.saveTasks();
            this.renderTasks();
            this.showNotification('Tasks imported successfully!');
        } catch (error) {
            alert('Invalid JSON format');
        }
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.showNotification('All tasks cleared!');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
    
    // Add some sample tasks for demo (only if no tasks exist)
    if (todoApp.tasks.length === 0) {
        const sampleTasks = [
            {
                id: 1,
                title: "Conduct user feedback session",
                date: "2025-07-09",
                priority: "high",
                completed: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "Draft social media content for November",
                date: "2025-07-09",
                priority: "medium",
                completed: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                title: "Order new office supplies",
                date: "2025-07-07",
                priority: "medium",
                completed: true,
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            },
            {
                id: 4,
                title: "Plan next sprint meeting agenda",
                date: "2025-07-07",
                priority: "medium",
                completed: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                title: "Update expense report",
                date: "2025-07-26",
                priority: "medium",
                completed: false,
                createdAt: new Date().toISOString()
            }
        ];
        
        todoApp.tasks = sampleTasks;
        todoApp.taskIdCounter = 6;
        todoApp.saveTasks();
        todoApp.renderTasks();
    }
});

// Add some utility CSS for past due items
const style = document.createElement('style');
style.textContent = `
    .task-date.past-due {
        color: #dc2626;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
