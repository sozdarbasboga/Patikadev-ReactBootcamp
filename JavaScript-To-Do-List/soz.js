darbasboga/Projects/Patikadev-ReactBootcamp/JavaScript-To-Do-List/script.js
document.addEventListener("DOMContentLoaded", loadTasks);

const toast = new bootstrap.Toast(document.getElementById('liveToast'));

function addTask() {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() === '') {
        showToast('Listeye boş ekleme yapamazsınız!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        ${taskInput.value}
        <span class="close">×</span>
    `;

    li.addEventListener('click', function(e) {
        if (!e.target.classList.contains('close')) {
            this.classList.toggle('checked');
            saveTasks();
        }
    });

    li.querySelector('.close').addEventListener('click', function() {
        li.remove();
        saveTasks();
        showToast('Görev silindi!');
    });

    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
    showToast('Görev eklendi!');
}

document.getElementById('task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function showToast(message) {
    const toastBody = document.querySelector(".toast-body");
    toastBody.textContent = message;
    toast.show();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent.trim(),
            completed: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        if (task.completed) li.classList.add("checked");

        li.innerHTML = `
            ${task.text}
            <span class="close">×</span>
        `;

        li.addEventListener("click", function(e) {
            if (!e.target.classList.contains("close")) {
                this.classList.toggle("checked");
                saveTasks();
            }
        });

        li.querySelector('.close').addEventListener('click', function() {
            li.remove();
            saveTasks();
            showToast('Görev silindi!');
        });

        document.getElementById("taskList").appendChild(li);
    });
}