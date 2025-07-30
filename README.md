# 📋 TaskMaster Pro - Interactive To-Do List Application

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap Icons](https://img.shields.io/badge/Bootstrap_Icons-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> A modern, feature-rich to-do list application built with vanilla JavaScript, offering dark mode, priority management, and seamless user experience.

## ✨ Key Features

### 🎯 Core Functionality
- **➕ Task Management** - Add, edit, delete, and organize tasks
- **🎨 Priority System** - High, Medium, Low priority levels with color coding
- **📅 Due Date Tracking** - Set deadlines with overdue notifications
- **✅ Status Toggle** - Mark tasks as complete/incomplete
- **🔍 Real-time Search** - Instant task filtering
- **📊 Smart Filtering** - View All, Active, or Completed tasks

### 🌟 User Experience
- **🌙 Dark/Light Theme** - Toggle with persistent preference
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile
- **💾 Local Storage** - Data persists between sessions
- **🎭 Smooth Animations** - Modern UI with fluid transitions
- **⌨️ Keyboard Shortcuts** - Quick actions with hotkeys
- **🔔 Toast Notifications** - Visual feedback for all actions

### 🚀 Advanced Features
- **⚠️ Overdue Alerts** - Visual indicators for past-due tasks
- **🗑️ Bulk Operations** - Clear all completed tasks at once
- **📤 Data Export/Import** - Backup and restore functionality
- **🎯 Sample Data** - Pre-loaded demo tasks for new users

## 🛠️ Installation & Setup

### Prerequisites
```bash
# No dependencies required! Just a modern web browser
- Chrome 60+ | Firefox 55+ | Safari 12+ | Edge 79+
```

### Quick Start
```bash
# 1️⃣ Clone or download the repository
git clone [repository-url]

# 2️⃣ Navigate to project directory
cd todo

# 3️⃣ Open in your favorite browser
open index.html
```
## 📁 Project Architecture

```
todo/
├── 📄 index.html          # Main application structure
├── 🎨 styles.css          # Responsive CSS with dark mode
├── ⚙️ script.js           # JavaScript application logic
├── 📋 README.md           # Project documentation
└── 📸 screenshots/        # Application screenshots
    ├── light-mode.png
    └── dark-mode.png
```

## 🎮 Usage Guide

### ➕ Adding Tasks
1. Click **"+ Add New Task"** button
2. Fill in task details:
   - **Title** (required)
   - **Due Date** (required)
   - **Priority Level** (High/Medium/Low)
3. Click **"Add Task"** to save

### 🔧 Managing Tasks
| Action | Method |
|--------|--------|
| Complete Task | Click checkbox ☑️ |
| Edit Task | Click pencil icon ✏️ |
| Delete Task | Click trash icon 🗑️ |
| Search Tasks | Use header search bar 🔍 |

### 🎛️ Filtering & Views
- **Tab Filters**: All • Active • Completed
- **Dropdown Filter**: Additional filtering options
- **Search Bar**: Real-time task search
- **Bulk Actions**: Clear all completed tasks

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Open Add Task modal |
| `Escape` | Close modal/cancel action |
| `Tab` | Navigate form fields |

## 🎨 Customization

### Color Scheme
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #00d4aa;
  --success-color: #16a34a;
  --warning-color: #d97706;
  --danger-color: #dc2626;
}
```

### Priority Colors
```css
.priority-high { background: #fee2e2; color: #dc2626; }
.priority-medium { background: #fef3c7; color: #d97706; }
.priority-low { background: #dcfce7; color: #16a34a; }
```

## 🔧 Technical Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Structure & Semantics | Latest |
| **CSS3** | Styling & Animations | Latest |
| **JavaScript (ES6+)** | Application Logic | Latest |
| **Bootstrap Icons** | UI Icons | 1.11.0 |
| **LocalStorage API** | Data Persistence | Native |

## 📊 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ 60+ |
| Firefox | ✅ 55+ |
| Safari | ✅ 12+ |
| Edge | ✅ 79+ |
| Opera | ✅ 47+ |

## 🐛 Troubleshooting

<details>
<summary><strong>🔧 Common Issues & Solutions</strong></summary>

### Tasks Not Saving
- **Issue**: Tasks disappear after browser refresh
- **Solution**: Check if localStorage is enabled (disabled in incognito mode)

### Dark Mode Not Persisting
- **Issue**: Theme resets to light mode
- **Solution**: Clear browser cache and ensure localStorage permissions

### Mobile Layout Issues
- **Issue**: UI elements overlapping on mobile
- **Solution**: Update to latest browser version, check viewport settings

### Performance Issues
- **Issue**: App running slowly with many tasks
- **Solution**: Clear completed tasks regularly, refresh page if needed

</details>

## 🚀 Future Enhancements

- [ ] **Categories & Tags** - Organize tasks by project/category
- [ ] **Recurring Tasks** - Set up repeating task schedules
- [ ] **Cloud Sync** - Sync across devices with user accounts
- [ ] **Team Collaboration** - Share tasks with team members
- [ ] **Task Templates** - Pre-defined task templates
- [ ] **Analytics Dashboard** - Productivity insights and statistics
- [ ] **Offline Support** - PWA with offline functionality
- [ ] **Voice Commands** - Add tasks via voice input


### Contribution Guidelines
- 📝 Follow existing code style and conventions
- 🧪 Test changes across different browsers
- 📚 Update documentation for new features
- 🚀 Keep the application lightweight and fast
- ✅ Ensure responsive design principles

## 📈 Performance Metrics

| Metric | Score |
|--------|-------|
| **Lighthouse Performance** | 98/100 |
| **First Contentful Paint** | < 1.2s |
| **Largest Contentful Paint** | < 2.5s |
| **Cumulative Layout Shift** | < 0.1 |

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Beautiful icon library
- **[MDN Web Docs](https://developer.mozilla.org/)** - Excellent web development resources
- **[CSS Gradient Generator](https://cssgradient.io/)** - Stunning gradient designs



<div align="center">

**[⭐ Star this repository](https://github.com/yrlwijesekara/todo)** if you found it helpful!

Made with ❤️ by [Chanodya Praveen)

</div>
