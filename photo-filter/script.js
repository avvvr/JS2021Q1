let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let img = new Image();
img.src = "assets/img/img.jpg";
img.crossOrigin = "anonymous"

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height
  context.drawImage(img, 0, 0);

};
let kBlur = 1;

/**/
function blurCalc() {
  if (img.clientWidth == 0) {
    return kBlur = Math.sqrt(img.naturalWidth ** 2 + img.naturalHeight ** 2) / Math.sqrt(canvas.clientWidth ** 2 + canvas.clientHeight ** 2);
  } else {
    if ((img.naturalHeight / img.naturalWidth) < (maxHeight / maxWidth)) {
      return kBlur = Math.sqrt(img.naturalWidth ** 2 + img.naturalHeight ** 2) / Math.sqrt(img.clientWidth ** 2 + img.clientHeight ** 2);
    } else {
      return kBlur = Math.sqrt(img.naturalWidth ** 2 + img.naturalHeight ** 2) / Math.sqrt((img.naturalWidth * delta) ** 2 + img.clientHeight ** 2);
    }
  }
}


let inputsParent = document.querySelector(".filters");
let output = document.querySelectorAll("output");
let filters = [{
    name: "blur",
    value: 0,
    sizing: "px"
  },
  {
    name: "invert",
    value: 0,
    sizing: "%"
  },
  {
    name: "sepia",
    value: 0,
    sizing: "%"
  },
  {
    name: "saturate",
    value: 100,
    sizing: "%"
  },
  {
    name: "hue-rotate",
    value: 0,
    sizing: "deg"
  }
]

inputsParent.addEventListener('input', (event) => {
  let filterValue = event.target.value;
  let filterName = event.target.name;
  let filterStr = "";

  for (let filter of filters) {
    if (filter.name === filterName) filter.value = filterValue;
  }
  blurCalc();
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].name === "blur") {
      filterStr += `${filters[i].name}(${kBlur*filters[i].value}${filters[i].sizing})`;
    } else {
      filterStr += `${filters[i].name}(${filters[i].value}${filters[i].sizing})`;
    }
    if (i < filters.length - 1) {
      filterStr += " ";
    }
  }

  event.target.nextElementSibling.value = filterValue;

  context.filter = filterStr;
  context.drawImage(img, 0, 0);
})


let resetBtn = document.querySelector(".btn-reset");
resetBtn.addEventListener("click", () => {
  let filterInputs = document.getElementsByTagName("input");
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].name === "saturate") {
      filters[i].value = 100;
      filterInputs[i].nextElementSibling.value = 100;
      filterInputs[i].value = 100;
    } else {
      filters[i].value = 0;
      filterInputs[i].nextElementSibling.value = 0;
      filterInputs[i].value = 0;
    }
  }

  context.filter = "blur(0px) invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg)";
  context.drawImage(img, 0, 0);
})

let nextBtn = document.querySelector(".btn-next");
let imgNumber = 1;
let imgNumberStr = "01";
let timesOfDay = ""; //время суток

nextBtn.addEventListener("click", () => {
  let currentDate = new Date();
  let hour = currentDate.getHours();

  if (imgNumber < 10) {
    imgNumberStr = `0${imgNumber}`;
  } else {
    imgNumberStr = `${imgNumber}`;
  }

  if (hour >= 6 && hour <= 11) {
    timesOfDay = "morning"
  } else if (hour >= 12 && hour <= 17) {
    timesOfDay = "day"
  } else if (hour >= 18 && hour <= 23) {
    timesOfDay = "evening"
  } else if (hour >= 0 && hour <= 5) {
    timesOfDay = "night "
  }

  let filterStr = "";

  blurCalc();
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].name === "blur") {
      filterStr += `${filters[i].name}(${kBlur*filters[i].value}${filters[i].sizing})`;
    } else {
      filterStr += `${filters[i].name}(${filters[i].value}${filters[i].sizing})`;
    }
    if (i < filters.length - 1) {
      filterStr += " ";
    }
  }


  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${imgNumberStr}.jpg`;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.filter = filterStr;
    context.drawImage(img, 0, 0);
  };

  if (imgNumber === 20) imgNumber = 1;
  else imgNumber++;
})


let loadImgBtn = document.querySelector("#btnInput");
loadImgBtn.onchange = (event) => {
  let file = loadImgBtn.files[0];
  let path = (window.URL || window.webkitURL).createObjectURL(file);

  let filterStr = "";

  blurCalc();
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].name === "blur") {
      filterStr += `${filters[i].name}(${kBlur*filters[i].value}${filters[i].sizing})`;
    } else {
      filterStr += `${filters[i].name}(${filters[i].value}${filters[i].sizing})`;
    }
    if (i < filters.length - 1) {
      filterStr += " ";
    }
  }


  img.src = path;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.filter = filterStr;
    context.drawImage(img, 0, 0);
  };

  loadImgBtn.value = null;
}


let saveBtn = document.querySelector(".btn-save");
saveBtn.addEventListener("click", (event) => {

  var link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
})


let isFullscreen = false;
const fullscreenBtn = document.querySelector('#fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
  const html = document.documentElement;
  if (isFullscreen) {
    fullScreenCancel();
  } else {
    fullScreen(html);
  }
})

function fullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}

function fullScreenCancel() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

document.addEventListener('webkitfullscreenchange', (event) => {
  if (document.fullscreenElement) {
    isFullscreen = true;
  } else {
    isFullscreen = false;
  }
  fullscreenBtn.classList.toggle('fullscreen-btn');
  fullscreenBtn.classList.toggle('fullscreen-exit-btn');
});