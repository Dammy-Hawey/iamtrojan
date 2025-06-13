console.log('iam÷TroJan site loaded.');

//glowing button start

const menuLinks = document.querySelectorAll('.glow-menu');

const colors = ['#00f0ff', '#ff00ff', '#00ff88', '#ff8800', '#ff0044'];

function createGlow(link, color) {
  let glow = document.createElement('div');
  glow.classList.add('glow-effect');
  glow.style.background = `linear-gradient(45deg, ${color}, white, ${color})`;
  link.appendChild(glow);
}

function removeGlow(link) {
  const oldGlow = link.querySelector('.glow-effect');
  if (oldGlow) oldGlow.remove();
}

menuLinks.forEach(link => {
  link.style.position = "relative"; // Needed for absolute glow
  link.style.zIndex = 1;

  link.addEventListener('mouseenter', () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    removeGlow(link);
    createGlow(link, color);
  });

  link.addEventListener('click', () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    removeGlow(link);
    createGlow(link, color);
  });

  link.addEventListener('mouseleave', () => {
    removeGlow(link);
  });
});

//glowing button ends

// Auto & Manual Slide Carousel
const slideContainer = document.getElementById("slideContainer");
const totalSlides = slideContainer.children.length;
const dotsContainer = document.getElementById("dotsContainer");
const slider = document.getElementById("slider");

let index = 0;
let interval;

function showSlide(i) {
  index = (i + totalSlides) % totalSlides;
  slideContainer.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startSlider() {
  interval = setInterval(() => showSlide(index + 1), 4000);
}

function stopSlider() {
  clearInterval(interval);
}

// Create dots dynamically
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
}

document.getElementById("nextBtn").onclick = () => showSlide(index + 1);
document.getElementById("prevBtn").onclick = () => showSlide(index - 1);

// Pause on hover
slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);

// Touch swipe
let touchStartX = 0;
slider.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX);
slider.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) showSlide(index + 1);
  else if (touchEndX - touchStartX > 50) showSlide(index - 1);
});

// Init
showSlide(0);
startSlider();
