document.addEventListener("DOMContentLoaded", () => {
  // ===== Burger menu =====
  const burger = document.querySelector(".burger");
  const panel = document.querySelector(".mobile-panel");
  const mobileLinks = document.querySelectorAll(".nav--mobile .nav__link");

  function setPanel(open) {
    if (!burger || !panel) return;
    burger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  if (burger && panel) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      setPanel(!isOpen);
    });

    mobileLinks.forEach((a) => {
      a.addEventListener("click", () => setPanel(false));
    });
  }

  // ===== FAQ (незалежні відкриття, без автозакриття інших) =====
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");
  const icon = item.querySelector(".icon");

  if (!btn) return;

  // стартово закрито через CSS (max-height: 0)
  btn.setAttribute("aria-expanded", "false");
  if (icon) icon.textContent = "+";

  btn.addEventListener("click", () => {
    item.classList.toggle("active");
    const isOpen = item.classList.contains("active");

    btn.setAttribute("aria-expanded", String(isOpen));
    if (icon) icon.textContent = isOpen ? "–" : "+";
  });
});


  // ===== Footer year =====
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ===== Booking modal =====
  const bookingModal = document.getElementById("bookingModal");
  const openBookingBtns = document.querySelectorAll(".js-open-booking");
  const closeModalEls = bookingModal
    ? bookingModal.querySelectorAll("[data-close-modal]")
    : [];

  let lastFocusedEl = null;

  function openModal() {
    if (!bookingModal) return;
    lastFocusedEl = document.activeElement;

    bookingModal.hidden = false;
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const closeBtn = bookingModal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!bookingModal) return;

    bookingModal.hidden = true;
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
  }

  openBookingBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeModalEls.forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bookingModal && !bookingModal.hidden) {
      closeModal();
    }
  });
});

// === Instagram link Android fix ===
(function () {
  const IG_HOST = 'www.instagram.com';

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    let url;
    try {
      url = new URL(link.href);
    } catch {
      return;
    }

    // тільки Instagram-профілі
    if (url.host !== IG_HOST) return;

    const path = url.pathname.replace(/^\/|\/$/g, '');
    if (!path || path.includes('/')) return;

    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);

    if (!isAndroid) return;

    // Android → пробуємо апку
    e.preventDefault();

    const username = path;
    const appUrl = `instagram://user?username=${username}`;
    const webUrl = url.href;

    window.location.href = appUrl;

    setTimeout(() => {
      window.location.href = webUrl;
    }, 700);
  });
})();

