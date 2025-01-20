document.addEventListener("DOMContentLoaded", function () {
  // Typing animation
  const typingText = document.getElementById("typing-text");
  const phrases = ["UI/UX Designer", "Web Designer"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeText, 500);
    } else {
      setTimeout(typeText, isDeleting ? 50 : 100);
    }
  }

  typeText();

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Active navigation link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        const activeLink = document.querySelector(
          `.nav-links a[href="#${section.id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projects.forEach((project) => {
        const category = project.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert("Thank you for your message! I'll get back to you soon.");
    contactForm.reset();
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress");
  const animateSkills = () => {
    skillBars.forEach((bar) => {
      const percentage = bar.style.width;
      bar.style.width = "0%";
      bar.style.width = percentage;
    });
  };

  const skillsSection = document.getElementById("skills");
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillsObserver.observe(skillsSection);
});


window.addEventListener("load", function () {
  // Menyembunyikan overlay loading setelah halaman selesai dimuat
  document.getElementById("overlay").style.display = "none";
});

const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
