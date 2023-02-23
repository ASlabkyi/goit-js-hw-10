import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

function handleInput(e) {
  const countryName = e.target.value.trim();

  if (countryName) {
    fetchCountries(countryName).then(data => {
      clearCountry();
      checkError(data);
      createCountriesDesc(data);
    });
  } else {
    clearCountry();
  }
}

function clearCountry() {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
}

function checkError(data) {
  if (data.status === 404) {
    Notify.failure('Oops, there is no country with that name');
  }
}

function createCountriesDesc(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length < 10 && data.length > 1) {
    countryListEl.insertAdjacentHTML('beforeend', markupCountries(data));
  } else {
    countryInfoEl.insertAdjacentHTML('beforeend', markupCountry(data));
  }
}

function markupCountries(countries) {
  return countries
    .map(
      country =>
        `<li class="country-list__el"><img src="${country.flags.svg}" alt="${country.flags.alt}" width="24"><h2>${country.name.official}</h2></li>`
    )
    .join('');
}

function markupCountry(country) {
  return `<div class="country-info_flex"><img src="${
    country[0].flags.svg
  }" alt="${country[0].flags.alt}" width="48"><h2>${
    country[0].name.official
  }</h2></div><ul class="country-info-list"><li><span class="country-info-list__el">Capital:</span> ${
    country[0].capital
  }</li><li><span class="country-info-list__el">Population:</span> ${
    country[0].population
  }</li><li><span class="country-info-list__el">Languages:</span> ${getLanguages(
    country[0].languages
  )}</li></ul>`;
}

function getLanguages(languages) {
  const keys = Object.keys(languages);
  return keys.map(language => ` ${language}`);
}

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
