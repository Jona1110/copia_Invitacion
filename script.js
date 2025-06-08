function confirmarAsistencia() {
    const mensaje = encodeURIComponent("¡Hola! Confirmo mi asistencia a la fiesta rojiblanca de Amarilis Jimena 🎉⚽🐐");
    const numero = "52123456789"; // Tu número de WhatsApp con código internacional
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
  }

  // Contador regresivo al 7 de junio
const countdown = () => {
    const targetDate = new Date("2025-09-07T16:00:00"); // Fecha y hora exacta
    const now = new Date();
    const difference = targetDate - now;
  
    if (difference <= 0) {
      document.getElementById("timer").innerHTML = "¡Ya comenzó la fiesta! 🎉";
      clearInterval(timerInterval);
      return;
    }
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
  
    document.getElementById("timer").innerHTML = 
      `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  };
  
  const timerInterval = setInterval(countdown, 1000);
  countdown(); // Ejecutar inmediatamente

const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');

let particlesArray;
const colors = ['#e30613', '#0c1c8c'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }

  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
};

function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


function init() {
  particlesArray = [];
  for (let i = 0; i < 150; i++) { // más partículas
    let size = Math.random() * 4 + 3; // tamaño más grande
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let directionX = (Math.random() - 0.5) * 1.2;
    let directionY = (Math.random() - 0.5) * 1.2;
    let baseColor = colors[Math.floor(Math.random() * colors.length)];
    let color = hexToRgba(baseColor, 0.85); // mayor opacidad

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();

function updateCountdown() {
  const eventDate = new Date('2024-06-07T00:00:00'); // Cambia a la fecha real si es 2025
  const now = new Date();
  const diff = eventDate - now;

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const daysSpan = document.getElementById("days");

  if (parseInt(daysSpan.textContent) !== days) {
    daysSpan.textContent = days;
    daysSpan.classList.remove("animated-number");

    // Re-aplica animación (reflow)
    void daysSpan.offsetWidth;
    daysSpan.classList.add("animated-number");
  }
}

function addGuest(status) {
  const nameInput = document.getElementById("guestName");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Por favor ingresa tu nombre");
    return;
  }

  const key = `guests_${status}`;
  const stored = JSON.parse(localStorage.getItem(key)) || [];
  stored.push(name);
  localStorage.setItem(key, JSON.stringify(stored));

  nameInput.value = "";
  renderGuestLists();
}

function renderGuestLists() {
  const yesList = JSON.parse(localStorage.getItem("guests_yes")) || [];
  const maybeList = JSON.parse(localStorage.getItem("guests_maybe")) || [];
  const noList = JSON.parse(localStorage.getItem("guests_no")) || [];

  document.getElementById("yesList").innerHTML = yesList.map(n => `<li>${n}</li>`).join("");
  document.getElementById("maybeList").innerHTML = maybeList.map(n => `<li>${n}</li>`).join("");
  document.getElementById("noList").innerHTML = noList.map(n => `<li>${n}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", renderGuestLists);
