/* ============================
   NAV MENU TOGGLE
============================ */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("primary-navigation");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* ============================
   SMOOTH SCROLL
============================ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("open");
    }
  });
});

/* ============================
   TYPED TEXT EFFECT
============================ */
(function typedText() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const phrases = [
    "modern web experiences",
    "fast, clean & intelligent apps",
    "AI + Cloud powered solutions",
  ];

  let index = 0;
  let char = 0;
  let forward = true;

  function type() {
    const current = phrases[index];

    if (forward) {
      char++;
      el.textContent = current.slice(0, char);
      if (char === current.length) {
        forward = false;
        setTimeout(type, 800);
        return;
      }
    } else {
      char--;
      el.textContent = current.slice(0, char);
      if (char === 0) {
        forward = true;
        index = (index + 1) % phrases.length;
      }
    }
    setTimeout(type, 70);
  }

  type();
})();

/* ============================
   SCROLL REVEAL
============================ */
(function revealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  function reveal() {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add("is-visible");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  window.addEventListener("load", reveal);
})();

/* ============================
   CONTACT FORM + VALIDATION
============================ */
const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const messageField = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

/* VALIDATION FUNCTIONS */
function validateName() {
  const name = nameField.value.trim();
  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters";
    nameField.classList.add("error");
    nameField.classList.remove("success");
    return false;
  }
  nameError.textContent = "";
  nameField.classList.remove("error");
  nameField.classList.add("success");
  return true;
}

function validateEmail() {
  const email = emailField.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    emailError.textContent = "Enter a valid email address";
    emailField.classList.add("error");
    emailField.classList.remove("success");
    return false;
  }
  emailError.textContent = "";
  emailField.classList.remove("error");
  emailField.classList.add("success");
  return true;
}

function validateMessage() {
  const msg = messageField.value.trim();
  if (msg.length < 10) {
    messageError.textContent = "Message must be at least 10 characters";
    messageField.classList.add("error");
    messageField.classList.remove("success");
    return false;
  }
  messageError.textContent = "";
  messageField.classList.remove("error");
  messageField.classList.add("success");
  return true;
}

/* REAL-TIME VALIDATION */
nameField.addEventListener("input", validateName);
emailField.addEventListener("input", validateEmail);
messageField.addEventListener("input", validateMessage);

/* ============================
   NETLIFY FORM SUBMIT
============================ */
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validMessage = validateMessage();

    if (!validName || !validEmail || !validMessage) {
      statusMsg.textContent = "Please fix the errors above.";
      return;
    }

    statusMsg.textContent = "Sending...";

    try {
      const formData = new FormData(form);

      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        statusMsg.textContent = "Message sent successfully!";
        form.reset();

        nameField.classList.remove("success");
        emailField.classList.remove("success");
        messageField.classList.remove("success");
      } else {
        throw new Error();
      }
    } catch (error) {
      statusMsg.textContent = "Error sending message. Try again!";
    }
  });
}
