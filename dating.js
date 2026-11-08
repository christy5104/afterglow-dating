const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      navLinks.classList.remove("is-open");
    }
  });
}

const profileCards = Array.from(document.querySelectorAll(".profile-card"));
const filterButtons = document.querySelectorAll(".filter-chip");
const filterStatus = document.querySelector("#filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });

    profileCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.intention === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = `Showing ${visibleCount} sample profile${visibleCount === 1 ? "" : "s"}. Names, photos, and details are illustrative only.`;
    }
  });
});

document.querySelectorAll(".like-button").forEach((button) => {
  button.addEventListener("click", () => {
    const liked = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!liked));
    button.setAttribute("aria-label", button.getAttribute("aria-label").replace(liked ? "Unlike" : "Like", liked ? "Like" : "Unlike"));
    button.innerHTML = `<i class="bi ${liked ? "bi-heart" : "bi-heart-fill"}"></i>`;
  });
});

const signupForm = document.querySelector("#signup-form");
const signupBirthday = document.querySelector("#signup-birthday");
const signupStatus = document.querySelector("#form-status");

function isAtLeastEighteen(value) {
  if (!value) return false;
  const [year, month, day] = value.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const birthdayHasPassed = today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!birthdayHasPassed) age -= 1;
  return age >= 18;
}

if (signupForm && signupBirthday && signupStatus) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupStatus.classList.remove("is-error");

    if (!signupForm.reportValidity()) return;

    if (!isAtLeastEighteen(signupBirthday.value)) {
      signupStatus.textContent = "Sorry, you must be 18 or older to join.";
      signupStatus.classList.add("is-error");
      signupBirthday.focus();
      return;
    }

    signupStatus.textContent = "You're on the demo list! No information was sent or saved.";
    signupForm.reset();
  });
}
