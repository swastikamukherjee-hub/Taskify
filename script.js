// Initialize the modern icons (Lucide library)
lucide.createIcons();

// --- CONFIGURATION & ADMIN SECRET ---
const ADMIN_KEY = "TASKIFY_BOSS_2026"; // Your secret key
let clickCount = 0;

// Admin Secret Trigger (Triple click the logo to enter God Mode)
document.getElementById('admin-trigger').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        let key = prompt("Enter Master Admin Key:");
        if (key === ADMIN_KEY) {
            document.getElementById('admin-panel').style.display = 'block';
            alert("Taskify Admin Access Granted. System Online.");
        } else {
            alert("Access Denied.");
        }
        clickCount = 0;
    }
});

// --- AUTHENTICATION FLOW ---
function handleLogin() {
    const overlay = document.getElementById('auth-overlay');
    const app = document.getElementById('main-app');
    
    // Aesthetic fade out
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        app.style.display = 'grid';
    }, 500);
}

// --- TASK LOGIC ---
let tasks = [
    { id: 1, text: "Welcome to Taskify! Click 'Complete' to clear me.", project: "Guide" }
];

function renderTasks() {
    const grid = document.getElementById('taskGrid');
    grid.innerHTML = tasks.map(task => `
        <div class="task-card">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <span class="dot blue"></span>
                <small style="color: #8E8E93; text-transform: uppercase; letter-spacing: 1px;">${task.project}</small>
            </div>
            <h3 style="margin: 0 0 15px 0; font-weight: 600;">${task.text}</h3>
            <button onclick="deleteTask(${task.id})" style="background: none; border: 1px solid #2C2C2E; color: white; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; transition: 0.3s;">Complete</button>
        </div>
    `).join('');
}

function addTask() {
    const input = document.getElementById('mainTaskInput');
    if (input.value.trim() === '') return;
    
    tasks.push({
        id: Date.now(),
        text: input.value,
        project: "Daily Flow"
    });
    
    input.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// --- NAVIGATION LOGIC ---
function showSection(section) {
    const taskWs = document.getElementById('task-workspace');
    const calWs = document.getElementById('calendar-workspace');
    const title = document.getElementById('section-title');

    if (section === 'calendar') {
        taskWs.style.display = 'none';
        calWs.style.display = 'block';
        title.innerText = "Calendar View";
        renderCalendar();
    } else {
        taskWs.style.display = 'block';
        calWs.style.display = 'none';
        title.innerText = "Daily Grind";
    }
}

// --- CALENDAR GENERATOR ---
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    let html = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">';
    
    // Simplified Calendar Grid
    for (let i = 1; i <= 31; i++) {
        html += `<div style="padding: 15px; background: #0F0F12; border: 1px solid #2C2C2E; border-radius: 12px; text-align: center;">${i}</div>`;
    }
    html += '</div>';
    grid.innerHTML = html;
}

// --- INITIALIZATION ---
// Set current date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
document.getElementById('today-date').innerText = new Date().toLocaleDateString('en-US', options);

// Listen for 'Enter' key on input
document.getElementById('mainTaskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial Render
renderTasks();