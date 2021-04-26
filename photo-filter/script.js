let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let img = new Image();
img.src = "assets/img/img.jpg";

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
};


let inputsParent = document.querySelector(".filters");
let output = document.querySelectorAll("output");
//let filterStr = ["blur(0px)", "invert(0%)", "sepia(0%)", "saturate(100%)", "hue-rotate(0deg)"];
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
  for (let i = 0; i < filters.length; i++) {
    filterStr += `${filters[i].name}(${filters[i].value}${filters[i].sizing})`;
    if (i < filters.length - 1) {
      filterStr += " ";
    }
  }

  event.target.nextElementSibling.value = filterValue;
  canvas.style.filter = filterStr;

})