'use strict';

// Global Declarations
const navbar = document.querySelector('.navbar');
const learnMore = document.querySelector('.learnMore');
const navFeatures = document.querySelector('.nav-features');
const navOperations = document.querySelector('.nav-operations');
const navTestimonials = document.querySelector('.nav-testimonials');
const featuresContainer = document.querySelector('.features-container');
const operationsContainer = document.querySelector('.operations-container');
const tab = document.querySelectorAll('.tab');
const tabContainer = document.querySelector('.tab-container');
const operationsContent = document.querySelectorAll('.operations-content');
const slider = document.querySelector('.slider-container');
const circleContainer = document.querySelector('.circle-container');
const dots = document.querySelectorAll('.circle');
const slide = document.querySelectorAll('.slide');
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
const totalSlides = slide.length;
const popup = document.querySelector('.popup');
const popupOverlay = document.querySelector('.popup-overlay');
let currSlide = 0;

// const dotTransititon = function(closestDots){

//   // Guard Clause
//   if (!closestDots) return;

//   dots.forEach((d) => d.classList.remove('active'));
//   closestDots.classList.add('active');
// }

// Implementing Smooth Scrolling
learnMore.addEventListener('click', function (e) {
  //   const featuresContainerCoords = featuresContainer.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);
  // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  //   window.scrollTo(
  //     featuresContainerCoords.left + window.pageXOffset,
  //     featuresContainerCoords.top + window.pageYOffset
  //   );

  //   window.scrollTo({
  //     left: featuresContainerCoords.left + window.pageXOffset,
  //     top: featuresContainerCoords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  // Modern Approach
  featuresContainer.scrollIntoView({ behavior: 'smooth' });
});

navFeatures.addEventListener('click', () => {
  featuresContainer.scrollIntoView({ behavior: 'smooth' });
});

navOperations.addEventListener('click', () => {
  operationsContainer.scrollIntoView({ behavior: 'smooth' });
});

navTestimonials.addEventListener('click', () => {
  slider.scrollIntoView({ behavior: 'smooth' });
});

// Implementing Tabbed Component
tabContainer.addEventListener('click', function (e) {
  const clicked_tab = e.target.closest('.tab');

  // Guard Clause
  if (!clicked_tab) return;

  tab.forEach((t) => t.classList.remove('operations-tab-active'));
  clicked_tab.classList.add('operations-tab-active');

  operationsContent.forEach((content) =>
    content.classList.remove('operations-content-active')
  );
  document
    .querySelector(`.operations-content-${clicked_tab.dataset.tab}`)
    .classList.add('operations-content-active');
});

// Implementing Slidng Component
slide.forEach((sl, ind) => (sl.style.transform = `translateX(${ind * 100}%`));

const rightArrowBtn = function (e) {
  if (currSlide === totalSlides - 1) currSlide = 0;
  else currSlide++;

  dots.forEach((d) => d.classList.remove('active'));
  document.querySelector(`.circle-${currSlide + 1}`).classList.add('active');

  slide.forEach((sl, ind) => {
    sl.style.transform = `translate(${100 * (ind - currSlide)}%)`;
  });
};

const leftArrowBtn = function (e) {
  if (currSlide === 0) currSlide = totalSlides - 1;
  else currSlide--;

  dots.forEach((d) => d.classList.remove('active'));
  document.querySelector(`.circle-${currSlide + 1}`).classList.add('active');

  slide.forEach((sl, ind) => {
    sl.style.transform = `translate(${100 * (ind - currSlide)}%)`;
  });
};

leftArrow.addEventListener('click', leftArrowBtn);
rightArrow.addEventListener('click', rightArrowBtn);

// Changing Slides using Dots
circleContainer.addEventListener('click', function (e) {
  const dotClicked = e.target.dataset.dot;
  const closestDots = e.target.closest('.circle');
  // dotTransititon(closestDots);

  // Guard Clause
  if (!closestDots) return;

  dots.forEach((d) => d.classList.remove('active'));
  closestDots.classList.add('active');

  slide.forEach((sl, ind) => {
    sl.style.transform = `translate(${(ind - dotClicked) * 100}%)`;
  });
});

const showModalWindow = () => {
  popup.classList.remove('hidden');
  popupOverlay.classList.remove('hidden');
};

const hideModalWindow = () => {
  popup.classList.add('hidden');
  popupOverlay.classList.add('hidden');
};

const onkeypress = function (e) {
  if (
    e.key == 'Escape' &&
    !popup.classList.contains('hidden') &&
    !popupOverlay.classList.contains('hidden')
  )
    hideModalWindow();
};

const onPressingLeftArrow = function (e) {
  if (e.key == 'ArrowLeft') leftArrowBtn();
};

const onPressingRightArrow = function (e) {
  if (e.key == 'ArrowRight') rightArrowBtn();
};

const openBtn = document.querySelectorAll('.open-btn');
openBtn.forEach((btn) => btn.addEventListener('click', showModalWindow));

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', hideModalWindow);

document.addEventListener('keydown', onkeypress);
popupOverlay.addEventListener('click', hideModalWindow);
document.addEventListener('keydown', onPressingLeftArrow);
document.addEventListener('keydown', onPressingRightArrow);

// Intersection Observer API
const callback = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hide-section');
      entry.target.classList.add('show-section');
      observer.unobserve(entry.target);
    }
  });
};
const options = {
  root: null,
  threshold: 0.15,
};
const observer = new IntersectionObserver(callback, options);
const target = document.querySelectorAll('.section');

target.forEach((t) => {
  observer.observe(t);
});

// Lazy Loading Images
const dataSrc = document.querySelectorAll('[data-src]');
const imageCallback = (entries, imageObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log(entry);
      const src = entry.target.getAttribute('data-src');
      entry.target.src = src;
      entry.target.classList.remove('lazy-img');
      imageObserver.unobserve(entry.target);
    } else {
      return;
    }
  });
};
const imageOptions = {
  root: null,
  threshold: 1,
};
const imageObserver = new IntersectionObserver(imageCallback, imageOptions);
const lazyLoadImage = dataSrc.forEach((img) => imageObserver.observe(img));

// DOM Traversal
const feature2 = document.querySelector('.feature-2');

// Child Traversal
// console.log(feature2.childNodes);
// console.log(feature2.children);

// Parent Traversal
// console.log(feature2.parentNode);
// console.log(feature2.parentElement);
// console.log(feature2.closest('div'));
// feature2.closest('.features').style.backgroundColor = 'orangered';

// First Child, Last Child, FirstChildElement, LastChildElement
// console.log(feature2.firstChild);
// console.log(feature2.firstElementChild);
// console.log(feature2.lastChild);
// console.log(feature2.lastElementChild);

// Siblings Traversal
// console.log(feature2.previousSibling);
// console.log(feature2.previousElementSibling);
// console.log(feature2.nextSibling);
// console.log(feature2.nextElementSibling);

// Implementing Hover effect on Navbar
// mouseover and mouseout event bubbles up
// mouseenter and mouseleave doesn't bubble

const navEffect = function(e){
  if (e.target.classList.contains('nav-links')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav-links');
    const logo = link.closest('.navbar').querySelector('.logo');
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// navbar.addEventListener('mouseover', (e) => {
//   navEffect(e, .5);
// });

// navbar.addEventListener('mouseout', (e) => {
//   navEffect(e, 1);
// });

// Using bind method 
navbar.addEventListener('mouseover', navEffect.bind(0.5));
navbar.addEventListener('mouseout', navEffect.bind(1));
