"use strict";
const debounce = require("lodash.debounce");
import template from "../template/owntmpl.hbs";
// import Notiflix from "./notiflix";

function items(resp, targetTag) {
  console.log("items(resp, targetTag)");
  const result = resp.reduce(
    (acc, elem) =>
      (acc += `<li class="item"><img class="flag"  src="${elem.flags.svg}" > <p class="country-name">${elem.name}</p></li>`),
    ""
  );
  targetTag.innerHTML = result;
}

function countryCard(resp, targetTag, templ) {
  console.log("countryCard(resp, targetTag, templ)");
  console.log("countryCard resp=", resp);
  console.log("countryCard targetTag=", targetTag);
  //list.innerHTML = template(resp);
  console.log("++++countryCard", templ(resp));
  const template = templ(resp);
  //console.log("countryCard", templ(resp));
  console.log("countryCard", template);
  targetTag.innerHTML = templ;
  const langs = targetTag.querySelector(".langs");
  console.log("body=", document.querySelector("body"));
  console.log("langs", langs);
  //Избавляемся от последней запятой
  if (langs) {
    console.log("$$$$$$$$$$$$");
    const str = langs.lastChild.previousSibling.innerText;
    const lastChar = str.indexOf(",");
    langs.lastChild.previousSibling.innerText = str.substring(0, lastChar);
  }
  return;
}

const banner = (str) => {
  Notiflix.Notify.info(
    //"Too many matches found. Please enter a more specific name."
    str
  );
};

function soMarch(targetTag, banner) {
  console.log("soMarch(targetTag, banner)");
  const str = "Too many matches found. Please enter a more specific name.";
  banner(str);
  targetTag.innerHTML = "";
  return;
}

// export default function fetchCountries() {
//   debounce((e) => {
//     // fetch(`https://restcountries.com/v2/name/${e.target.value.trim()}`)
//     fetch(`https://restcountries.com/v2/name/Sweden`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((resp) => {
//         console.log(resp);
//         if (resp.status === 404) {
//           Notiflix.Notify.failure("Oops, there is no country with that name");
//           return;
//         }
//         if (resp.length > 10) {
//           soMarch(list);
//         } else if (resp.length >= 2 && resp.length <= 10) {
//           items(resp, list);
//         } else if (resp.length === 1) {
//           countryCard(resp, inp, templ);
//         }
//       })
//       .catch((error) => {
//         Notiflix.Notify.failure("Ooooops!!!!!");
//       });
//   }, 500);
// }
export { items, countryCard, soMarch, banner };
