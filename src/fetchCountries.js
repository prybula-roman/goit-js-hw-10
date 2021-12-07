const debounce = require("lodash.debounce");
import template from "../template/owntmpl.hbs";

console.log(debounce);
export default function fetchCountries() {
  debounce((e) => {
    fetch(`https://restcountries.com/v2/name/${e.target.value.trim()}`)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.status) {
          Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        if (resp.length > 10) {
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
          list.innerHTML = "";
          return;
        } else if (resp.length >= 2 && resp.length <= 10) {
          const items = resp.reduce(
            (acc, elem) =>
              (acc += `<li class="item"><img class="flag"  src="${elem.flags.svg}" > <p class="country-name">${elem.name}</p></li>`),
            ""
          );
          list.innerHTML = items;
        } else if (resp.length === 1) {
          const inputCountry = document.querySelector(".country");
          list.innerHTML = template(resp);
          const langs = document.querySelector(".langs");

          //Избавляемся от последней запятой
          const str = langs.lastChild.previousSibling.innerText;
          const lastChar = str.indexOf(",");
          langs.lastChild.previousSibling.innerText = str.substring(
            0,
            lastChar
          );
        }
      })
      .catch((error) => {
        Notiflix.Notify.failure("Ooooops!!!!!");
      });
  }, 500);
}
// export { fetchCountries };
