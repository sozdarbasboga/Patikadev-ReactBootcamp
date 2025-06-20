document.addEventListener("DOMContentLoaded", loadTasks);

// Toast bildirimi için gerekli değişken
const toast = new bootstrap.Toast(document.getElementById('liveToast'));

// Görev ekleme fonksiyonu
function addTask() {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() === '') {
        showToast('Listeye boş ekleme yapamazsınız!');
        return;
    }

    // Yeni liste elemanı oluştur
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <span class="close text-danger">×</span>
    `;

    // Tıklama ile yapıldı işaretleme
    li.addEventListener('click', function(e) {
        if (!e.target.classList.contains('close')) {
            this.classList.toggle('checked');
            saveTasks();
        }
    });

    // Silme işlemi için
    li.querySelector('.close').addEventListener('click', function() {
        li.remove();
        saveTasks();
        showToast('Görev silindi!');
    });

    // Listeye ekle
    taskList.appendChild(li);
    
    // Input'u temizle
    taskInput.value = '';
    
    // Kaydet ve bildirim göster
    saveTasks();
    showToast('Görev başarıyla eklendi!');
}

// Enter tuşu ile ekleme
document.getElementById('task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Toast bildirimi gösterme
function showToast(message) {
    const toastEl = document.getElementById("liveToast");
    const toastBody = toastEl.querySelector(".toast-body");
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Görevleri kaydetme
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent.trim(),
            completed: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görevleri yükleme
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        if (task.completed) li.classList.add("checked");

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="close text-danger">×</span>
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

