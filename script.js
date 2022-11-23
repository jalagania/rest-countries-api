"use strict";

// ---------- Element Variables ----------

const body = document.querySelector("body");
const heading = document.querySelector(".heading");
const iconMoon = document.querySelector(".moon-icon");
const iconSun = document.querySelector(".sun-icon");
const themeText = document.querySelector(".mode-text");
const main = document.querySelector("main");
const mainWrapper = document.querySelector(".main-wrapper");
const input = document.querySelector(".search");
const filterHead = document.querySelector(".filter-head");
const iconArrow = document.querySelector(".arrow-icon");
const filterBody = document.querySelector(".filter-body");
const regions = document.querySelectorAll(".region");
const countriesBox = document.querySelector(".countries-box");
const searchOutput = document.querySelector(".search-output");

// ---------- Functions ----------

// Displays All Countries
async function displayCountries() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const html = `<div class="country">
  <img src="${data[i].flags.svg}" alt="country flag" class="country-flag" />
  <div class="country-body">
    <p class="country-name">${data[i].name.common}</p>
    <p class="country-population">
      Population: <span class="population-number">${data[
        i
      ].population.toLocaleString()}</span>
    </p>
    <p class="country-region">
      Region: <span class="region-name">${data[i].region}</span>
    </p>
    <p class="country-capital">
      Capital: <span class="capital-city">${data[i].capital}</span>
    </p>
  </div>
</div>`;

    countriesBox.insertAdjacentHTML("afterbegin", html);
  }
}

displayCountries();

// Displays All Countries by Clicking Heading
heading.addEventListener("click", function () {
  displayCountries();
  countriesBox.classList.remove("hidden");
  searchOutput.classList.add("hidden");
  document.querySelector(".country-details").remove();
  mainWrapper.classList.remove("hidden");
});

// Displays Countries by Region
function displayCountriesByRegion(region) {
  for (let country of [...countriesBox.children]) {
    country.classList.remove("hidden");
    if (country.children[1].children[2].children[0].textContent !== region) {
      country.classList.add("hidden");
    }
  }
}

// Searches Country by Name
async function searchCountryByName(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await response.json();

  if (data.status === 404) {
    searchOutput.insertAdjacentHTML(
      "afterbegin",
      `<p class="error">Country Not Found</p>`
    );
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const html = `<div class="country">
  <img src="${data[i].flags.svg}" alt="country flag" class="country-flag" />
  <div class="country-body">
    <p class="country-name">${data[i].name.common}</p>
    <p class="country-population">
      Population: <span class="population-number">${data[
        i
      ].population.toLocaleString()}</span>
    </p>
    <p class="country-region">
      Region: <span class="region-name">${data[i].region}</span>
    </p>
    <p class="country-capital">
      Capital: <span class="capital-city">${data[i].capital}</span>
    </p>
  </div>
</div>`;
    searchOutput.insertAdjacentHTML("afterbegin", html);
  }
}

// Gets Country Info
async function getCountryInfo(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await response.json();

  const html = `<div class="country-details">
 
  <button class="btn-back">
    <svg
      class="arrow-left"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <title>arrow-left</title>
      <path
        d="M3.828 9l6.071-6.071-1.414-1.414-8.485 8.485 8.485 8.485 1.414-1.414-6.071-6.071h16.172v-2h-16.172z"
      ></path>
    </svg>
    <span>Back</span>
  </button>
  <div class="info-box">
    <img src="${data[0].flags.svg}" alt="country flag" class="flag-large" />
    <div class="details-box">
      <p class="details_country-name">${data[0].name.common}</p>
      <div class="detailed-info">
        <div class="info_left-box">
          <p class="native-name">Native Name: <span>${
            Object.values(data[0].name.nativeName)[0].common
          }</span></p>
          <p class="population">Population: <span>${data[0].population.toLocaleString()}</span></p>
          <p class="the-region">Region: <span>${data[0].region}</span></p>
          <p class="sub-region">Sub Region: <span>${
            data[0].subregion
          }</span></p>
          <p class="capital">Capital: <span>${data[0].capital}</span></p>
        </div>
        <div class="right-box">
          <p class="domain">Top Level Domain: <span>${data[0].tld[0]}</span></p>
          <p class="currencies">Currencies: <span>${
            Object.keys(data[0].currencies)[0]
          }</span></p>
          <p class="languages">Languages: <span>${Object.values(
            data[0].languages
          )
            .reduce((sum, language) => sum + language + " ", "")
            .trim()
            .split(" ")
            .join(", ")}</span></p>
        </div>
      </div>
      <div class="borders-box">
      <p class="borders">Border Countries:</p>
    </div>
    </div>
  </div>
</div>`;

  main.insertAdjacentHTML("afterbegin", html);
  getBorderCountries(data[0].borders);
}

// Gets Border Countries by Code
async function getBorderCountries(codeArray) {
  const borderCountries = [];
  for (let code of codeArray) {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const data = await response.json();
    borderCountries.push(data[0].name.common);
  }
  const html = borderCountries.reduce(
    (sum, country) => sum + `<span class="border-country">${country}</span>`,
    ""
  );
  document.querySelector(".borders").insertAdjacentHTML("afterend", html);
}

// ---------- Event Listeners ----------

// Change Theme
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("theme-icon-wrapper")) {
    body.classList.toggle("dark-mode");
    iconMoon.classList.toggle("hidden");
    iconSun.classList.toggle("hidden");
  }

  themeText.textContent = body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

// Display Filter
filterHead.addEventListener("click", function () {
  filterBody.classList.toggle("hidden");
  iconArrow.classList.toggle("rotate");
});

// Close Filter
document.addEventListener("click", function (event) {
  if (
    !filterBody.classList.contains("hidden") &&
    !event.target.closest(".filter-body") &&
    !event.target.closest(".filter-head")
  ) {
    filterBody.classList.add("hidden");
  }
});

// Filter Countries by Region
regions.forEach((region) =>
  region.addEventListener("click", function () {
    searchOutput.classList.add("hidden");
    countriesBox.classList.remove("hidden");
    displayCountriesByRegion(region.textContent);
  })
);

// Search a Country by Name
document.addEventListener("keydown", function (event) {
  if (
    document.activeElement === input &&
    input.value !== "" &&
    event.key === "Enter"
  ) {
    while (searchOutput.firstChild) {
      searchOutput.firstChild.remove();
    }
    searchCountryByName(input.value);
    input.value = "";
    searchOutput.classList.remove("hidden");
    countriesBox.classList.add("hidden");
  }
});

// Display Country Details
document.addEventListener("click", function (event) {
  if (event.target.closest(".country")) {
    getCountryInfo(
      event.target.closest(".country").children[1].children[0].textContent
    );
    mainWrapper.classList.add("hidden");
  }
});

// Display Border Country Details
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("border-country")) {
    getCountryInfo(event.target.textContent);
    event.target.closest(".country-details").classList.add("hidden");
  }
});

// Go Back After Displaying Country Details
document.addEventListener("click", function (event) {
  if (event.target.closest(".btn-back")) {
    event.target
      .closest(".country-details")
      .nextElementSibling.classList.remove("hidden");
    event.target.closest(".country-details").remove();
  }
});
