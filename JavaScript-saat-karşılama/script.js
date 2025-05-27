function askName() {
  let name = localStorage.getItem("username");
  if (!name) {
    name = prompt("Adınızı giriniz:");
    if (!name || name.trim() === "") {
      name = "Ziyaretçi";
    }
    localStorage.setItem("username", name);
  }
  return name;
}

const userName = askName();
document.getElementById("greeting").innerHTML = `Merhaba, <strong>${userName}</strong>! Hoş geldin!`;

function showTime() {
  const now = new Date();
  const options = { weekday: 'long' };
  let day = now.toLocaleDateString('tr-TR', options);
  let time = now.toLocaleTimeString('tr-TR');
  document.getElementById("clock").textContent = `${time} ${day}`;
}

setInterval(showTime, 1000);
showTime();

// Tema değiştirici
function changeTheme() {
  document.body.classList.toggle("dark-theme");
  
  }

