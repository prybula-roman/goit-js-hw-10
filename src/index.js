"use strict";
//import { items, countryCard, soMarch ,banner} from "./fetchCountries";
const debounce = require("lodash.debounce");
import template from "../template/owntmpl.hbs";
import Notiflix from "./notiflix";

const inp = document.querySelector(".country");
const list = document.querySelector(".list");

function items(resp, targetTag) {
  const result = resp.reduce(
    (acc, elem) =>
      (acc += `<li class="item"><img class="flag"  src="${elem.flags.svg}" > <p class="country-name">${elem.name}</p></li>`),
    ""
  );
  targetTag.innerHTML = result;
}

function countryCard(resp, targetTag, templ) {
  //list.innerHTML = template(resp);
  templ = templ(resp);
  list.innerHTML = templ;
  const langs = document.querySelector(".langs");
  //Избавляемся от последней запятой
  const str = langs.lastChild.previousSibling.innerText;
  const lastChar = str.indexOf(",");
  langs.lastChild.previousSibling.innerText = str.substring(0, lastChar);
}

const banner = () => {
  Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
};

function soMarch(targetTag, banner) {
  banner();
  targetTag.innerHTML = "";
  return;
}

inp.addEventListener(
  "input",
  debounce((e) => {
    fetch(`https://restcountries.com/v2/name/${e.target.value.trim()}`)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.status === 404) {
          Notiflix.Notify.failure("Oops, there is no country with that name");
          return;
        }
        if (resp.length > 10) {
          soMarch(list, banner);
        } else if (resp.length >= 2 && resp.length <= 10) {
          items(resp, list);
        } else if (resp.length === 1) {
          countryCard(resp, list, template);
        }
      })
      .catch((rejec) => {
        console.log(reject);
        Notiflix.Notify.failure("Ooooops!!!!!");
      });
  }, 500)
);
