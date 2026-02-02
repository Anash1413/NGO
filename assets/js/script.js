const testimonial = document.getElementById("testimonial");
const section = document.querySelector(".impact-section");

const MOVE_DISTANCE = 350; // px (change to 300–400 if needed)

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Section visible range
  const start = windowHeight;
  const end = -rect.height;

  if (rect.top < start && rect.bottom > 0) {
    const progress =
      1 - (rect.top / windowHeight);

    const clamped = Math.min(Math.max(progress, 0), 1);
    const translateX = -MOVE_DISTANCE + (MOVE_DISTANCE * clamped);

    testimonial.style.transform = `translateX(${translateX}px)`;
  }
});


const movingImages = document.querySelectorAll(".move-up");
const specialtySection = document.querySelector(".specialty-section");

const MOVE_DISTANCE2 = 170; // px upward

window.addEventListener("scroll", () => {
  const rect = specialtySection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const progress = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1
    );

    const translateY = -MOVE_DISTANCE2 * progress;

    movingImages.forEach(img => {
      img.style.transform = `translateY(${translateY}px)`;
    });
  }
});


const section2 = document.querySelector(".testimonial-section");
const moveUpCol = document.querySelector(".move-up");
const moveDownCol = document.querySelector(".move-down");

const MOVE_DISTANCE3 = 570; // px

window.addEventListener("scroll", () => {
  const rect = section2.getBoundingClientRect();
  const winH = window.innerHeight;

  if (rect.top < winH && rect.bottom > 0) {
    const progress = Math.min(
      Math.max((winH - rect.top) / (winH + rect.height), 0),
      1
    );

    const upY = -MOVE_DISTANCE3 * progress;
    const downY = MOVE_DISTANCE3 * progress;

    moveUpCol.style.transform = `translateY(${upY}px)`;
    moveDownCol.style.transform = `translateY(${downY}px)`;
  }
});
