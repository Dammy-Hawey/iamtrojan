// ----------  AOS  ----------
AOS.init({ once:false, easing:"ease-out-cubic", duration:850 });

// ----------  Sticky / shrink on scroll ----------
const nav       = document.getElementById("mainNav");
const shrinkPx  = 64;                         // distance before shrink
window.addEventListener("scroll", ()=>{
  nav.dataset.shadow = window.scrollY > shrinkPx ? "1" : "0";
});

// ----------  Smooth scroll & active link ----------
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
            .scrollIntoView({behavior:"smooth", block:"start"});
  });
});
const sections = [...document.querySelectorAll("header, section")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const makeActive = id=>{
  navLinks.forEach(l=>l.classList.toggle("active", l.getAttribute("href")==="#"+id));
};
window.addEventListener("scroll", ()=>{
  const threshold = 0.6*innerHeight;
  const scrolled  = sections.findLast(s=>s.getBoundingClientRect().top <= threshold);
  if(scrolled) makeActive(scrolled.id || "");   // header has no id
});

// ----------  Theme Switch ----------
const current    = localStorage.getItem("theme") || "dark";
document.body.dataset.theme = current;
const themeBtn   = document.getElementById("themeSwitch");
const themeIcon  = document.getElementById("themeIcon");
const setIcon    = t=>themeIcon.className = t==="light" ? "bi bi-brightness-high" : "bi bi-moon-stars-fill";
setIcon(current);

themeBtn.addEventListener("click", ()=>{
  const now = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = now;
  localStorage.setItem("theme", now);
  setIcon(now);
});

// ----------  Hero parallax ----------
const hero = document.querySelector("header");
hero.addEventListener("mousemove", e=>{
  const {innerWidth:w, innerHeight:h} = window;
  const x = (e.clientX-w/2)/w * 20;
  const y = (e.clientY-h/2)/h * 20;
  hero.style.backgroundPosition = `${50-x}% ${100-y}%`;
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

  // ✅ Pause/resume when tab is inactive/active
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSlider();
    else startSlider();
  });

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
// Initialize blog section slider
initSlider({
  sliderId: "slider2",
  containerId: "slideContainer2",
  dotsId: "dotsContainer2",
  nextBtnId: "nextBtn2",
  prevBtnId: "prevBtn2"
});


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