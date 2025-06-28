const toastLive = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastLive);
const toastBody = toastLive.querySelector('.toast-body');

function showToast(message, type = 'primary') {
  toastBody.textContent = message;
  toastLive.className = `toast text-white bg-${type} border-0`;
  toast.show();
}

function addTask() {
  const taskInput = document.getElementById('task');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() === '') {
    showToast('Listeye boş ekleme yapamazsınız!', 'danger');
    return;
  }

  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    <span class="task-text">${taskInput.value}</span>
    <span class="close">&times;</span>
  `;

  li.addEventListener('click', function(e) {
    if (!e.target.classList.contains('close')) {
      this.classList.toggle('checked');
      saveTasks();
    }
  });

  li.querySelector('.close').addEventListener('click', function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
    showToast('Görev silindi!', 'warning');
  });

  taskList.appendChild(li);
  taskInput.value = '';
  taskInput.focus();
  saveTasks();
  showToast('Görev eklendi!', 'success');
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').textContent.trim(),
      completed: li.classList.contains("checked")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (task.completed) li.classList.add("checked");

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <span class="close">&times;</span>
    `;

    li.addEventListener("click", function(e) {
      if (!e.target.classList.contains("close")) {
        this.classList.toggle("checked");
        saveTasks();
      }
    });

    li.querySelector('.close').addEventListener('click', function(e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
      showToast('Görev silindi!', 'warning');
    });

    taskList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById('task').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

