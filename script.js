/* ============================================
REDUCED MOTION
============================================ */

const reduceMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

/* ============================================
ELEMENTS
============================================ */

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const cancelBtn = document.getElementById("cancelBtn");

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

/* ============================================
THEME
============================================ */

function applyTheme(theme) {

if (theme === "dark") {

body.classList.add("dark-theme");

themeIcon.classList.remove("fa-moon");
themeIcon.classList.add("fa-sun");

themeToggle.setAttribute(
  "aria-label",
  "Switch to light mode"
);

themeToggle.setAttribute(
  "title",
  "Switch to light mode"
);

} else {

body.classList.remove("dark-theme");

themeIcon.classList.remove("fa-sun");
themeIcon.classList.add("fa-moon");

themeToggle.setAttribute(
  "aria-label",
  "Switch to dark mode"
);

themeToggle.setAttribute(
  "title",
  "Switch to dark mode"
);

}
}

/*
Check saved theme.
Light mode is the default.
*/

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
applyTheme("dark");
} else {
applyTheme("light");
}

/*
Toggle theme.
*/

themeToggle.addEventListener("click", () => {

const isDark = body.classList.contains("dark-theme");

if (isDark) {

applyTheme("light");

localStorage.setItem(
  "portfolio-theme",
  "light"
);

} else {

applyTheme("dark");

localStorage.setItem(
  "portfolio-theme",
  "dark"
);

}

});

/* ============================================
MOBILE MENU
============================================ */

function openMenu() {

menu.classList.add("active");

body.style.overflow = "hidden";
}

function closeMenu() {

menu.classList.remove("active");

body.style.overflow = "";
}

menuBtn.addEventListener(
"click",
openMenu
);

cancelBtn.addEventListener(
"click",
closeMenu
);

document.querySelectorAll(".menu a").forEach((link) => {

link.addEventListener(
"click",
closeMenu
);

});

/* ============================================
HERO TERMINAL TYPING
============================================ */

function typeText(
element,
text,
speed,
onDone
) {

if (reduceMotion) {

element.textContent = text;

if (onDone) {
  onDone();
}

return;

}

let i = 0;

const timer = setInterval(() => {

element.textContent =
  text.slice(0, i + 1);

i++;


if (i >= text.length) {

  clearInterval(timer);

  if (onDone) {
    onDone();
  }

}

}, speed);

}

/* ============================================
DOM LOADED
============================================ */

window.addEventListener(
"DOMContentLoaded",
() => {

const line1 =
  document.getElementById("typeLine1");

const line2 =
  document.getElementById("typeLine2");

const cursor1 =
  document.getElementById("cursor1");

const cursor2 =
  document.getElementById("cursor2");


typeText(
  line1,
  "whoami",
  90,
  () => {

    cursor1.classList.add(
      "hidden"
    );


    setTimeout(() => {

      cursor2.classList.remove(
        "hidden"
      );


      typeText(
        line2,
        "Peer Mohammed A — Software Developer",
        35
      );

    }, 250);

  }
);

}
);

/* ============================================
SKILL BAR ANIMATION
============================================ */

const bars =
document.querySelectorAll(".bar-fill");

const barObserver =
new IntersectionObserver(

(entries, observer) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      const element =
        entry.target;


      element.style.width =
        element.dataset.percent + "%";


      observer.unobserve(
        element
      );

    }

  });

},

{
  threshold: 0.4
}

);

bars.forEach((bar) => {

barObserver.observe(bar);

});

/* ============================================
PROJECT CARD REVEAL
============================================ */

const cards =
document.querySelectorAll(
".project-card"
);

const cardObserver =
new IntersectionObserver(

(entries, observer) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      const delay =
        reduceMotion
          ? 0
          : Array.from(cards).indexOf(
              entry.target
            ) * 90;


      setTimeout(() => {

        entry.target.classList.add(
          "in-view"
        );

      }, delay);


      observer.unobserve(
        entry.target
      );

    }

  });

},

{
  threshold: 0.15
}

);

cards.forEach((card) => {

cardObserver.observe(card);

});



/* ============================================
   SECTION SCROLL REVEAL
   ============================================ */

const revealSections = document.querySelectorAll("section:not(.hero)");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-section");
        entry.target.classList.add("visible");

        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealSections.forEach((section) => {
  section.classList.add("reveal-section");
  sectionObserver.observe(section);
});

/* ============================================
   V2 — NAV: SCROLL STATE + LIQUID ACTIVE PILL
   ============================================ */

const navEl = document.getElementById("top");
const pill = document.querySelector(".nav-pill");
const navLinks = Array.from(document.querySelectorAll(".menu li a"));
const spySections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function movePill(link) {
  if (!link || window.innerWidth <= 750) {
    pill.style.opacity = 0;
    return;
  }
  pill.style.width = link.offsetWidth + "px";
  pill.style.height = link.offsetHeight + "px";
  pill.style.transform =
    "translate(" + link.offsetLeft + "px, " + link.offsetTop + "px)";
  pill.style.opacity = 1;
}

let currentId = null;

function updateNav() {
  navEl.classList.toggle("scrolled", window.scrollY > 20);

  const probe = window.innerHeight * 0.35;
  let active = null;
  spySections.forEach((s) => {
    if (s.getBoundingClientRect().top <= probe) active = s;
  });

  const id = active ? active.id : null;
  if (id !== currentId) {
    currentId = id;
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", on);
      if (on) movePill(a);
    });
    if (!id) pill.style.opacity = 0;
  }
}

window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", () => {
  const a = navLinks.find((l) => l.classList.contains("active"));
  movePill(a);
});
window.addEventListener("load", updateNav);

/* Nav links also get a soft hover-follow on the pill */
navLinks.forEach((a) => {
  a.addEventListener("mouseenter", () => movePill(a));
  a.addEventListener("mouseleave", () => {
    const cur = navLinks.find((l) => l.classList.contains("active"));
    if (cur) movePill(cur);
    else pill.style.opacity = 0;
  });
});

/* ============================================
   V2 — STAGGERED REVEAL + COUNT-UP + SHIMMER
   ============================================ */

document
  .querySelectorAll(".service-grid, .contact-grid, .timeline, .about-facts")
  .forEach((group) => {
    const items = group.querySelectorAll(
      ".service-box, .contact-card, .timeline-item, .fact"
    );
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        items.forEach((el, i) => {
          setTimeout(() => el.classList.add("in-view"), reduceMotion ? 0 : i * 110);
        });
        io.disconnect();
      },
      { threshold: 0.15 }
    );
    io.observe(group);
  });

document.querySelectorAll(".fact-num").forEach((el) => {
  const raw = el.textContent.trim();
  const target = parseFloat(raw);
  const decimals = (raw.split(".")[1] || "").length;
  el.textContent = raw;
  if (reduceMotion) return;
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const dur = 1100;
    (function tick(now) {
      const k = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (k < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    })(t0);
  });
  io.observe(el);
});

document.querySelectorAll(".bar-fill").forEach((b) => {
  b.addEventListener("transitionend", () => b.classList.add("done"), { once: true });
});

/* ============================================
   V3 — HERO PARTICLE NETWORK
   ============================================ */

(function () {
  const canvas = document.getElementById("heroNet");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  let w = 0, h = 0, dpr = 1, pts = [], running = true;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.floor((w * h) / 15000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8
    }));
  }

  function draw() {
    if (!running) return;
    const dark = body.classList.contains("dark-theme");
    const rgb = dark ? "140,190,255" : "0,102,204";
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (!reduceMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 160 && d > 1) { p.x -= (dx / d) * 0.6; p.y -= (dy / d) * 0.6; }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(" + rgb + ",0.7)";
      ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.strokeStyle = "rgba(" + rgb + "," + (0.22 * (1 - d / 120)) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      const md = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (md < 180) {
        ctx.strokeStyle = "rgba(" + rgb + "," + (0.45 * (1 - md / 180)) + ")";
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  window.addEventListener("resize", resize);
  new IntersectionObserver((e) => {
    const vis = e[0].isIntersecting;
    if (vis && !running) { running = true; draw(); }
    running = vis;
  }).observe(hero);

  resize();
  draw();
})();

/* ============================================
   V3 — CURSOR GLOW ON GLASS CARDS
   ============================================ */

document
  .querySelectorAll(".project-card, .service-box, .fact, .contact-card")
  .forEach((card) => {
    const spot = document.createElement("span");
    spot.className = "spot";
    card.classList.add("has-spot");
    card.prepend(spot);
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });