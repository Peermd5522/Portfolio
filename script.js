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