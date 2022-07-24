'use strict';

const signInButton = document.querySelector('.sign-in-button');
const signUpButtons = document.querySelectorAll('.sign-up-button');
const closeButton = document.querySelector('.btn--close-signin');
const closeButton2 = document.querySelector('.btn--close-signup');
const signIn = document.querySelector('.sign-in');
const signUp = document.querySelector('.sign-up');
const signInOverlay = document.querySelector('.sign-in-layer');
const signUpOverlay = document.querySelector('.sign-up-layer');
const nav = document.querySelector('.header');
const section2 = document.querySelector('#section--2');
const sectionPartners = document.querySelector('.section-partners');
const sectionHero = document.querySelector('.section-hero');
const sectionTestimonials = document.querySelector('.section-testimonials');
const logo = document.querySelector('.logo-link');

///////////////////////////////////////////////////////////
// Page navigation

// Smooth scrolling: Event Delegation
document
  .querySelector('.nav-links-container')
  .addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('main-nav-link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

logo.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Non-efficient way
// document.querySelectorAll(".main-nav-link").forEach(function (el, i) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

///////////////////////////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('main-nav-link')) {
    const link = e.target;
    const siblings = link
      .closest('.main-nav')
      .querySelectorAll('.main-nav-link');
    const logo = link.closest('.header').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const sectionPartnersHeight = sectionPartners.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) document.body.classList.add('sticky');
  else document.body.classList.remove('sticky');
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// SIGN-IN, SIGN-UP MODALS

// SIGN-IN
const openSignIn = function () {
  signIn.classList.remove('hidden');
  signInOverlay.classList.remove('hidden');
  // document.body.classList.remove('sticky');
};

const closeSignIn = function () {
  signIn.classList.add('hidden');
  signInOverlay.classList.add('hidden');
};

// SIGN-UP
const openSignUp = function () {
  signUp.classList.remove('hidden');
  signUpOverlay.classList.remove('hidden');
  // document.body.classList.remove('sticky');
};
const closeSignUp = function () {
  signUp.classList.add('hidden');
  signUpOverlay.classList.add('hidden');
};

signInButton.addEventListener('click', openSignIn);
closeButton.addEventListener('click', closeSignIn);
signInOverlay.addEventListener('click', closeSignIn);

signUpButtons.forEach(function (button) {
  button.addEventListener('click', openSignUp);
  closeButton2.addEventListener('click', closeSignUp);
  signUpOverlay.addEventListener('click', closeSignUp);
});

document.addEventListener('keydown', function (e) {
  if (!signIn.classList.contains('hidden') && e.key === 'Escape') {
    closeSignIn();
  }

  if (!signUp.classList.contains('hidden') && e.key === 'Escape') {
    closeSignUp();
  }
});

///////////////////////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Reveal pricing plans
const allPlans = document.querySelectorAll('.pricing-plan');
const plan1 = document.querySelector('.plan--1');
const plan2 = document.querySelector('.plan--2');
const plan3 = document.querySelector('.plan--3');
const vector = document.querySelector('.pricing-vector');

const revealPlan = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  vector.classList.remove('vector--hidden');
  setTimeout(
    plan1 => {
      plan1.classList.remove('plan--hidden');
    },
    150,
    plan1
  );
  setTimeout(
    plan2 => {
      plan2.classList.remove('plan--hidden');
    },
    300,
    plan2
  );

  setTimeout(
    plan3 => {
      plan3.classList.remove('plan--hidden');
    },
    450,
    plan3
  );

  observer.unobserve(entry.target);
};

const planObserver = new IntersectionObserver(revealPlan, {
  root: null,
  threshold: 0,
});

allPlans.forEach(plan => planObserver.observe(plan));



///////////////////////////////////////////////////////////
// Problem with sass, issue with lazy loading image effects
// Lazy loading images
// const imgTargets = document.querySelectorAll('img[data-src]');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });

//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////
// Setting copyright year
const yearEl = document.querySelector('.year');
const year = new Date().getFullYear();
yearEl.textContent = year;

///////////////////////////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.swiper-prev');
  const btnRight = document.querySelector('.swiper-next');
  const pageNum = document.querySelector('.pagination-current');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(0);

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;

    goToSlide(curSlide);
    pageNum.textContent = `${curSlide + 1}`;
  };

  // Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;

    goToSlide(curSlide);
    pageNum.textContent = `${curSlide + 1}`;
  };

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};
slider();
