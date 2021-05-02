const switchInput_l = document.querySelector("#switch__input_l");
const switchInput_sm = document.querySelector("#switch__input_sm");
const stylesLink = document.querySelector("#styles-link");
let theme;
const headerLogo_l = document.querySelector("#header__logo_l");
const headerLogo_sm = document.querySelector("#header__logo_sm");
const petsArrowImg_l = document.querySelector("#pets-in-zoo__arrow-img_l");
const petsArrowImg_r = document.querySelector("#pets-in-zoo__arrow-img_r");
const testimonialsArrowImg_l = document.querySelector("#testimonials__arrow-img_l");
const testimonialsArrowImg_r = document.querySelector("#testimonials__arrow-img_r");

if (!localStorage.hasOwnProperty("theme")) {
  theme = "light";
  localStorage.setItem("theme", "light");
} else {
  theme = localStorage.getItem("theme");
  if (theme === "dark") {
    switchInput_l.checked = true;
    switchInput_sm.checked = true;
  }
}

setTheme();

switchInput_l.addEventListener("change", () => {
  switchInput_sm.checked = switchInput_l;
  setTheme();
})

switchInput_sm.addEventListener("change", () => {
  switchInput_l.checked = switchInput_sm.checked;
  setTheme();
})

function setTheme() {
  if (!switchInput_l.checked) {
    theme = "light";
    localStorage.setItem("theme", "light");

    headerLogo_l.src = "../../assets/icons/logo.svg";
    headerLogo_sm.src = "../../assets/icons/logo.svg";

    petsArrowImg_l.src = "../../assets/icons/left-arrow.svg";
    petsArrowImg_r.src = "../../assets/icons/right-arrow.svg";
    testimonialsArrowImg_l.src = "../../assets/icons/left-arrow.svg";
    testimonialsArrowImg_r.src = "../../assets/icons/right-arrow.svg";
  } else {
    theme = "dark";
    localStorage.setItem("theme", "dark");

    headerLogo_l.src = "../../assets/icons/logo_light.svg";
    headerLogo_sm.src = "../../assets/icons/logo_light.svg";

    petsArrowImg_l.src = "../../assets/icons/left-arrow_light.svg";
    petsArrowImg_r.src = "../../assets/icons/right-arrow_light.svg";
    testimonialsArrowImg_l.src = "../../assets/icons/left-arrow_light.svg";
    testimonialsArrowImg_r.src = "../../assets/icons/right-arrow_light.svg";
  }

  stylesLink.href = `style-${theme}.css`;
}