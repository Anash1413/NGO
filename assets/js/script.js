// ==================== STARTUP ANIMATION ====================
// Play startup animation only once per visit (not on refresh or returning from other pages)
const startupOverlay = document.getElementById("startupOverlay");
const startupVideo = document.getElementById("startupVideo");

// Check if the animation has already been played in this session
const hasPlayedAnimation = sessionStorage.getItem("startupAnimationPlayed");

if (hasPlayedAnimation) {
  // If already played, hide the overlay immediately
  if (startupOverlay) {
    startupOverlay.style.display = "none";
  }
} else {
  // Play the animation
  if (startupVideo && startupOverlay) {
    startupVideo.addEventListener("ended", () => {
      startupOverlay.classList.add("hidden");
      setTimeout(() => {
        startupOverlay.style.display = "none";
      }, 500);
      // Mark animation as played
      sessionStorage.setItem("startupAnimationPlayed", "true");
    });

    // Fallback: hide after 10 seconds in case video doesn't load
    setTimeout(() => {
      if (!hasPlayedAnimation) {
        startupOverlay.classList.add("hidden");
        setTimeout(() => {
          startupOverlay.style.display = "none";
        }, 500);
        sessionStorage.setItem("startupAnimationPlayed", "true");
      }
    }, 10000);
  }
}

// ==================== TESTIMONIAL IMPACT SECTION ====================
const testimonial = document.getElementById("testimonial");
const section = document.querySelector(".impact-section");

const MOVE_DISTANCE = 350; // px (change to 300–400 if needed)

window.addEventListener("scroll", () => {
  if (!section || !testimonial) return;
  
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

// ==================== SPECIALTY SECTION IMAGES ====================
const movingImages = document.querySelectorAll(".move-up");
const specialtySection = document.querySelector(".specialty-section");

const MOVE_DISTANCE2 = 170; // px upward

window.addEventListener("scroll", () => {
  if (!specialtySection) return;
  
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

// ==================== TESTIMONIAL SLIDER ====================
const testimonials = [
  {
    quote: "Helping others<br>is the most<br>rewarding<br>feeling",
    name: "Michael Stevens",
    location: "New York",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "Every donation<br>makes a real<br>difference in<br>people's lives",
    name: "Sarah Johnson",
    location: "Los Angeles",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "Together we can<br>end the stigma<br>and save<br>countless lives",
    name: "David Martinez",
    location: "Chicago",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  }
];

let currentTestimonialIndex = 0;

const testimonialQuote = document.getElementById("testimonialQuote");
const testimonialName = document.getElementById("testimonialName");
const testimonialLocation = document.getElementById("testimonialLocation");
const testimonialImage = document.getElementById("testimonialImage");
const testimonialDots = document.getElementById("testimonialDots");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");

function updateTestimonial(index) {
  if (!testimonialQuote) return;
  
  const testimonial = testimonials[index];
  testimonialQuote.innerHTML = testimonial.quote;
  testimonialName.textContent = testimonial.name;
  testimonialLocation.textContent = testimonial.location;
  testimonialImage.src = testimonial.image;
  testimonialImage.alt = testimonial.name;

  // Update dots
  const dots = testimonialDots.querySelectorAll("span");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
  });
}

// Dot navigation
if (testimonialDots) {
  testimonialDots.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      const index = parseInt(e.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        currentTestimonialIndex = index;
        updateTestimonial(currentTestimonialIndex);
      }
    }
  });
}

// ==================== TESTIMONIAL SECTION SCROLL ANIMATION ====================
const testimonialSection = document.querySelector(".testimonial-section");
const testimonialMoveUpCol = document.querySelector(".testimonial-section .move-up");
const testimonialMoveDownCol = document.querySelector(".testimonial-section .move-down");

const MOVE_DISTANCE3 = 250; // px

window.addEventListener("scroll", () => {
  if (!testimonialSection || !testimonialMoveUpCol || !testimonialMoveDownCol) return;
  
  const rect = testimonialSection.getBoundingClientRect();
  const winH = window.innerHeight;

  if (rect.top < winH && rect.bottom > 0) {
    // Calculate scroll progress through the section
    const progress = Math.min(
      Math.max((winH - rect.top) / (winH + rect.height), 0),
      1
    );

    // First column moves UP (negative Y)
    const upY = -MOVE_DISTANCE3 * progress;
    // Second column moves DOWN (positive Y)
    const downY = MOVE_DISTANCE3 * progress;

    testimonialMoveUpCol.style.transform = `translateY(${upY}px)`;
    testimonialMoveDownCol.style.transform = `translateY(${downY}px)`;
  }
});
