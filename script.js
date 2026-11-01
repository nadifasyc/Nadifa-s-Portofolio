// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
});

// Tandai menu sesuai section yang sedang dibaca
const links = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) =>
          a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + entry.target.id))
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

// Tahun footer otomatis
document.getElementById("tahun").textContent = new Date().getFullYear();
