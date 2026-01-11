// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("text-purple-400");
      });
      if (navLink) {
        navLink.classList.add("text-purple-400");
      }
    }
  });
});

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".card-hover, .timeline-item, .certificate-card")
  .forEach((el) => {
    observer.observe(el);
  });
const words = ["Lưu Đức Dũng", "Web Developer", "UI Designer"];

const textEl = document.getElementById("type-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const deletingSpeed = 60;
const pauseAfterType = 1500;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // Đang gõ
    textEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), pauseAfterType);
    }
  } else {
    // Đang xóa
    textEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeLoop, speed);
}

typeLoop();

// back-to-top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//   slider
const track = document.querySelector(".projects-track");
const prevBtn = document.getElementById("projPrev");
const nextBtn = document.getElementById("projNext");
const cards = document.querySelectorAll(".project-card");

let index = 0;

function getVisibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function updateSlider() {
  const visible = getVisibleCount();
  const cardWidth = cards[0].offsetWidth;
  const moveX = index * cardWidth;
  track.style.transform = `translateX(-${moveX}px)`;
}

nextBtn.addEventListener("click", () => {
  const visible = getVisibleCount();
  const maxIndex = cards.length - visible;

  if (index >= maxIndex) {
    index = 0; // quay lại đầu
  } else {
    index += visible;
  }

  updateSlider();
});

prevBtn.addEventListener("click", () => {
  const visible = getVisibleCount();
  const maxIndex = cards.length - visible;

  if (index <= 0) {
    index = maxIndex; // nhảy về cuối
  } else {
    index -= visible;
  }

  updateSlider();
});

window.addEventListener("resize", updateSlider);
setInterval(() => {
  nextBtn.click();
}, 4500);

// Project modal popup
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const status = card.dataset.status;
    const desc = card.dataset.desc;
    const tech = card.dataset.tech;
    const demo = card.dataset.demo;
    const code = card.dataset.code;
    let statusClass = "";
    let statusDotClass = "";

    if (status === "Hoàn thành") {
      statusClass = "bg-green-600/20 text-green-400";
      statusDotClass = "status-Hoàn thành";
    } else if (status === "Đang làm") {
      statusClass = "bg-yellow-600/20 text-yellow-400";
      statusDotClass = "status-progress";
    } else {
      statusClass = "bg-gray-600/20 text-gray-400";
      statusDotClass = "status-pending";
    }

    modalContent.innerHTML = `
        <div class="popup-overlay">
    <div class="popup-container">
      <button class="close-btn" id="closeModal">×</button>
      
      <div class="popup-content">
        <h2 class="project-title">${title}</h2>
        
        <span class="status-badge ${statusClass} ${statusDotClass}">${status}</span>
        
        <p class="project-description">
          ${desc}
        </p>
        
        <div class="tech-section">
          <h4 class="tech-title">Technologies</h4>
          <p class="tech-list">${tech}</p>
        </div>
        
        <div class="button-group">
          <a href="${demo}" class="btn btn-primary">
            <span>🔗</span>
            <span>Live Demo</span>
          </a>
          <a href="${code}" class="btn btn-secondary">
            <span>💻</span>
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  </div>
      `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.getElementById("closeModal").addEventListener("click", close);
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) close();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") close();
});

function close() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
