const sorting_window = document.querySelector(".sorting-window");
let rectangles = [];
const play_stop_button = document.querySelector("#Play-Stop-button");
const shuffle_button = document.querySelector("#Shuffle-button");
const algorithm_names = document.querySelectorAll(".algorithms-names");
const speed_button = document.querySelector("#Speed-input");
const number_of_bars_button = document.querySelector("#Number-of-bars-input");

let currently_selected_algorithm = "";

//used for drawing rectangles
const number_of_rectangles = 0;
const random_range = 65;

//*******Function to move the rectangles *******//
function swap_rectangles(rectangle_1, rectangle_2, speed2) {
  const rectangle_1_height = rectangle_1.height;
  const rectangle_2_height = rectangle_2.height;
  rectangle_1.height = rectangle_2_height;
  rectangle_2.height = rectangle_1_height;
  const element = document.querySelector(`#${rectangle_1.name}`);
  const element2 = document.querySelector(`#${rectangle_2.name}`);
  for (let i = 0; i < rectangles.length; i++) {
    const bars = document.querySelector(`#${rectangles[i].name}`);
    bars.style.animation = "none";
  }
  element.style.animation = `fade-in-controls-for-sorting ${speed2}s ease-in-out`;
  element2.style.animation = `fade-in-controls-for-sorting ${speed2}s ease-in-out`;
}

function repaint_rectangles(rectangles) {
  for (let i = 0; i < rectangles.length; i++) {
    const element = document.querySelector(`#sorting-rectangle${i}`);
    element.style.height = rectangles[i].height + "vh";
  }
}

//*****button controls ****//
shuffle_button.addEventListener("click", (event) => {
  for (let i = 0; i < rectangles.length; i++) {
    const height_num = Math.floor(Math.random() * random_range);
    const element = document.querySelector(`#${rectangles[i].name}`);
    rectangles[i].height = height_num;
    element.style.height = `${height_num}vh`;
  }
});

for (let i = 0; i < algorithm_names.length; i++) {
  algorithm_names[i].addEventListener("click", (event) => {
    currently_selected_algorithm = event.target.id;
    for (let j = 0; j < algorithm_names.length; j++) {
        algorithm_names[j].style.color = "";
        algorithm_names[j].style.textDecoration = "";
    }
    algorithm_names[i].style.color = "#ffffff";
    algorithm_names[i].style.textDecoration = "underline";
  });
}

let speed_of_animation = 1000;
let currently_selected_animation_speed = 1;
const max_speed_value = 10;
play_stop_button.addEventListener("click", (event) => {
  if (speed_button.value <= max_speed_value) {
    update_speed();
  }
  if (currently_selected_algorithm === "Bubble") {
    bubble_sort(rectangles, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Selection") {
    selection_sort(rectangles, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Insertion") {
    insertion_sort(rectangles, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Merge") {
    merge_sort(0, rectangles.length - 1, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Quick") {
    quick_sort(rectangles, 0, rectangles.length - 1, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Heap") {
    heap_sort(rectangles, speed_of_animation, currently_selected_animation_speed);
  } else if (currently_selected_algorithm === "Radix") {
    radix_sort(rectangles, rectangles.length, speed_of_animation, currently_selected_animation_speed);
  }
});

function update_speed() {
  const max_speed = speed_button.max;
  const s_to_ms = 100;
  const offset_value = 100;
  const slowest_speed = max_speed * s_to_ms + offset_value;
  const speed_value = speed_button.value;
  speed_of_animation = slowest_speed - speed_value * s_to_ms;

  const slowest_animation_speed = Math.round(((speed_button.max * .1) + .1) * 10) / 10;
  currently_selected_animation_speed =  Math.round((slowest_animation_speed - (speed_button.value * 0.1)) * 10) / 10;
  console.log(currently_selected_animation_speed);
}

speed_button.addEventListener("click", (event) => {
  if (speed_button.value <= max_speed_value) {
    update_speed();
  }
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function draw_rect() {
  rectangles = [];
  removeAllChildNodes(sorting_window);
  const number_of_rectangles = number_of_bars_button.value;
  const random_range = 65;
  for (let i = 0; i < number_of_rectangles; i++) {
    const height_num = Math.floor(Math.random() * random_range);
    const tag = document.createElement("div");
    tag.setAttribute("id", `sorting-rectangle${i}`);
    tag.style.backgroundColor = "#c9c9c9";
    tag.style.width = "2vw";
    tag.style.height = `${height_num}vh`;
    tag.style.bottom = "0px";
    sorting_window.appendChild(tag);
    rectangles.push({ name: `sorting-rectangle${i}`, height: height_num });
  }
}

number_of_bars_button.addEventListener("click", (event) => {
  draw_rect();
});

number_of_bars_button.addEventListener("keypress", (event) => {
  const max_input_value = number_of_bars_button.max;
  if (event.key === "Enter") {
    if (number_of_bars_button.value <= max_input_value) {
      draw_rect();
    }
  }
});

//*******Function to sort the rectangles *******//
async function bubble_sort(array, speed, speed2) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j].height > array[j + 1].height) {
        swap_rectangles(array[j], array[j + 1], speed2);
        repaint_rectangles(rectangles);

        await new Promise((r) => setTimeout(r, speed));
      }
    }
  }
}

async function selection_sort(array, speed, speed2) {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].height < array[min].height) {
        min = j;
      }
    }
    if (min != i) {
      swap_rectangles(array[i], array[min], speed2);
      repaint_rectangles(rectangles);
      await new Promise((r) => setTimeout(r, speed));
    }
  }
}

async function insertion_sort(array, speed, speed2) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j].height < array[j - 1].height) {
      swap_rectangles(array[j], array[j - 1], speed2);
      repaint_rectangles(rectangles);
      j--;
      await new Promise((r) => setTimeout(r, speed));
    }
  }
}

let itmd = [];
let visited = [];
for (let i = 0; i < rectangles.length; i++) {
  itmd.push(0);
  visited.push(0);
}

async function mergeArray(start, end, speed, speed2) {
  let mid = parseInt((start + end) >> 1);
  let start1 = start,
    start2 = mid + 1;
  let end1 = mid,
    end2 = end;
  let index = start;

  while (start1 <= end1 && start2 <= end2) {
    if (rectangles[start1].height <= rectangles[start2].height) {
      itmd[index] = rectangles[start1].height;
      index = index + 1;
      start1 = start1 + 1;
      
    } else if (rectangles[start1].height > rectangles[start2].height) {
      itmd[index] = rectangles[start2].height;
      index = index + 1;
      start2 = start2 + 1;
    }
  }

  while (start1 <= end1) {
    itmd[index] = rectangles[start1].height;
    index = index + 1;
    start1 = start1 + 1;
  }

  while (start2 <= end2) {
    itmd[index] = rectangles[start2].height;
    index = index + 1;
    start2 = start2 + 1;
  }

  index = start;
  while (index <= end) {
    rectangles[index].height = itmd[index];
    const element = document.querySelector(`#${rectangles[index].name}`);
    index++;
    for (let i = 0; i < rectangles.length; i++) {
      const bars = document.querySelector(`#${rectangles[i].name}`);
      bars.style.animation = "none";
    }
    element.style.animation = `fade-in-controls-for-sorting ${speed2}s ease-in-out`;
    repaint_rectangles(rectangles);

    await new Promise((r) => setTimeout(r, speed));
  }
}

async function merge_sort(start, end, speed, speed2) {
  if (start < end) {
    let mid = parseInt((start + end) >> 1);
    await merge_sort(start, mid, speed, speed2);
    await merge_sort(mid + 1, end, speed, speed2);
    await mergeArray(start, end, speed, speed2);

  }
}

async function partition(arr, low, high, speed, speed2) {
  let pivot = arr[high].height;
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j].height < pivot) {
      i++;
      swap_rectangles(arr[i], arr[j], speed2);
      repaint_rectangles(rectangles);

      await new Promise((r) => setTimeout(r, speed));
    }
  }
  swap_rectangles(arr[i + 1], arr[high], speed2);
  repaint_rectangles(rectangles);

  await new Promise((r) => setTimeout(r, speed));
  return i + 1;
}

async function quick_sort(arr, low, high, speed, speed2) {
  if (low < high) {
    let pi = await partition(arr, low, high, speed, speed2);
    await quick_sort(arr, low, pi - 1, speed, speed2);
    await quick_sort(arr, pi + 1, high, speed, speed2);
  }
}

async function heap_sort(array, speed, speed2) {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i, speed, speed2);
  }
  for (let i = array.length - 1; i > 0; i--) {
    swap_rectangles(array[0], array[i], speed2);
    repaint_rectangles(rectangles);
    await new Promise((r) => setTimeout(r, speed));
    await heapify(array, i, 0, speed, speed2);
  }
}

async function heapify(array, n, i, speed, speed2) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;
  if (left < n && array[left].height > array[largest].height) {
    largest = left;
  }
  if (right < n && array[right].height > array[largest].height) {
    largest = right;
  }
  if (largest != i) {
    swap_rectangles(array[i], array[largest], speed2);
    repaint_rectangles(rectangles);
    await new Promise((r) => setTimeout(r, speed));
    await heapify(array, n, largest, speed, speed2);
  }
}

function getMax(arr, arr_length) {
  let max = arr[0].height;
  for (let i = 1; i < arr_length; i++) {
    if (arr[i].height > max) {
      max = arr[i].height;
    }
  }
  return max;
}

async function countSort(arr, arr_length, exp, speed, speed2) {
  let i;
  let output = new Array(arr_length);
  let count = new Array(10).fill(0);

  for (i = 0; i < arr_length; i++) {
    count[Math.floor(arr[i].height / exp) % 10]++;

  }

  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
    
  }

  for (i = arr_length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i].height / exp) % 10] - 1] = arr[i].height;
  
    count[Math.floor(arr[i].height / exp) % 10]--;
  }

  for (i = 0; i < arr_length; i++) {
    arr[i].height = output[i];
    const element = document.querySelector(`#${arr[i].name}`);
    for (let i = 0; i < rectangles.length; i++) {
      const bars = document.querySelector(`#${rectangles[i].name}`);
      bars.style.animation = "none";
    }
    element.style.animation = `fade-in-controls-for-sorting ${speed2}s ease-in-out`;
    repaint_rectangles(rectangles);
    await new Promise((r) => setTimeout(r, speed));
  }
}

async function radix_sort(arr, arr_length, speed, speed2) {
  let m = getMax(arr, arr_length);

  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
    await countSort(arr, arr_length, exp, speed, speed2);
  }
}
