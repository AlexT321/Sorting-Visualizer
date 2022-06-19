const right_button = document.querySelector(".right-button");
const left_button = document.querySelector(".left-button");
const hamburger_button = document.querySelector(".hamburger-icon-container");
const sorting_controls_container = document.querySelector( ".sorting-controls-container");
const sorting_controls_close_container = document.querySelector( ".sorting-controls-close-container");
const sorting_controls_close_button = document.querySelector("#sorting-controls-close-button");

const close_rectangle_1 = document.querySelector("#rectangle1");
const close_rectangle_2 = document.querySelector("#rectangle2");
const home_button = document.querySelector("#Home-button");

const home_container = document.querySelector("#Home-container");
const play_stop_container = document.querySelector("#Play-Stop-container");
const shuffle_container = document.querySelector("#Shuffle-container");
const speed_container = document.querySelector("#Speed-container");
const number_of_bars_container = document.querySelector("#Number-of-bars-container");

const opening_overlay = document.querySelector("#opening-overlay");
const closing_overlay = document.querySelector("#closing-overlay")

right_button.addEventListener("click", (event) => {
  const container = document.querySelector(".algorithms-names-container");
  scrollAmount = 0;
  const slideTimer = setInterval(() => {
    container.scrollLeft += 20;
    scrollAmount += 10;
    if (scrollAmount >= 100) {
      window.clearInterval(slideTimer);
    }
  }, 25);
});

left_button.addEventListener("click", (event) => {
  const container = document.querySelector(".algorithms-names-container");
  scrollAmount = 0;
  const slideTimer = setInterval(() => {
    container.scrollLeft -= 20;
    scrollAmount += 10;
    if (scrollAmount >= 100) {
      window.clearInterval(slideTimer);
    }
  }, 25);
});

hamburger_button.addEventListener("click", (event) => {
  //sorting_controls_container.style.visibility = "visible";
  opening_overlay.style.animation = "sorting-control-overlay 0.7s ease-in-out";
  //opening_overlay.style.visibility = "hidden";
});

opening_overlay.addEventListener("animationstart", (event) => {
  opening_overlay.style.visibility = "visible";
});

opening_overlay.addEventListener("animationend", (event) => {
  opening_overlay.style.visibility = "hidden";
  sorting_controls_container.style.visibility = "visible";
  sorting_controls_close_container.style.animation = "fade-in-controls 0.09s linear";
  home_container.style.animation = "fade-in-controls 0.09s linear";
  play_stop_container.style.animation = "fade-in-controls 0.09s linear";
  shuffle_container.style.animation = "fade-in-controls 0.09s linear";
  speed_container.style.animation = "fade-in-controls 0.09s linear";
  number_of_bars_container.style.animation = "fade-in-controls 0.09s linear";
});

function animation_reset() {
  closing_overlay.style.visibility = "visible";
  closing_overlay.style.animation = "sorting-close-overlay 0.6s ease-in-out";
  sorting_controls_container.style.animation = "none";
  opening_overlay.style.animation = "none";
  sorting_controls_close_container.style.animation = "none";
  home_container.style.animation = "none";
  play_stop_container.style.animation = "none";
  shuffle_container.style.animation = "none";
  speed_container.style.animation = "none";
  number_of_bars_container.style.animation = "none";
}


closing_overlay.addEventListener("animationstart", (event) => {
  sorting_controls_container.style.visibility = "hidden";
  
});

closing_overlay.addEventListener("animationend", (event) => {
  closing_overlay.style.animation = "none";
});

sorting_controls_close_button.addEventListener("click", (event) => {
  animation_reset();
});


close_rectangle_1.addEventListener("click", (event) => {
  animation_reset();
});

close_rectangle_2.addEventListener("click", (event) => {
  animation_reset();
});

home_button.addEventListener("click", (event) => {
  window.location.href = "../Main Page/index.html";
});
