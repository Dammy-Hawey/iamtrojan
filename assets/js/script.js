console.log('iam÷TroJan site loaded.');

//glowing button start

const menuLinks = document.querySelectorAll('.glow-menu2');

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

// This for nav menu
const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

// Auto & Manual Slide Carousel
// Utility function to init any slider by ID group
function initSlider(config) {
  const {
    sliderId,
    containerId,
    dotsId,
    nextBtnId,
    prevBtnId
  } = config;

  const slider = document.getElementById(sliderId);
  const slideContainer = document.getElementById(containerId);
  const dotsContainer = document.getElementById(dotsId);
  const slides = slideContainer.children;
  const totalSlides = slides.length;

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

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  }

  document.getElementById(nextBtnId).onclick = () => showSlide(index + 1);
  document.getElementById(prevBtnId).onclick = () => showSlide(index - 1);

  // Pause on hover
  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);

  // Touch support
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
}

// Initialize both sliders
initSlider({
  sliderId: "slider",
  containerId: "slideContainer",
  dotsId: "dotsContainer",
  nextBtnId: "nextBtn",
  prevBtnId: "prevBtn"
});

initSlider({
  sliderId: "slider2",
  containerId: "slideContainer2",
  dotsId: "dotsContainer2",
  nextBtnId: "nextBtn2",
  prevBtnId: "prevBtn2"
});

//Dynamic Hero images
  const images = [
    '../../assets/images/keyboardpro.jpeg',
    '../../assets/images/iamtrojanlogoresize.png',
    '../../assets/images/Trojanlogo1.png',
    '../../assets/images/trojanpic1.png',
    '../../assets/images/trojanpic3.png'
  ];

  let current = 0;
  const hero = document.querySelector('.hero-slideshow');

  function changeSlide() {
    hero.style.backgroundImage = `url('${images[current]}')`;
    current = (current + 1) % images.length;
  }

  // Initial load
  changeSlide();
  setInterval(changeSlide, 6000); // Change every 5 seconds

// Dark/Light Mode Toggle
const body = document.body;
  const toggle = document.getElementById("themeToggle");

  toggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  });

  // Load theme preference
  window.onload = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") body.classList.add("light-mode");
  };

  // Trigger modal only once using localStorage
  // const modalShown = localStorage.getItem("feedbackGiven");

  // if (!modalShown) {
  //   window.addEventListener("beforeunload", function (e) {
  //     e.preventDefault();
  //     document.getElementById("feedbackModal").style.display = "flex";
  //     localStorage.setItem("feedbackGiven", "true");
  //     return (e.returnValue = ""); // Required for Chrome
  //   });
  // }

  // ================= Feedback Modal Trigger ===================
(function () {
  const modalShown = localStorage.getItem("feedbackGiven");

  if (!modalShown) {
    window.addEventListener("beforeunload", function (e) {
      const modal = document.getElementById("feedbackModal");
      if (modal) {
        e.preventDefault(); // Cancel the event
        modal.style.display = "flex"; // Show modal
        localStorage.setItem("feedbackGiven", "true");
        e.returnValue = ""; // For Chrome compatibility
        return ""; // For legacy support
      }
    });
  }
})();