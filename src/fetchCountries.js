const BASE_URL = 'https://restcountries.com/v3.1';
const SEARCH_OPTION = 'name,capital,population,flags,languages';
import { Notify } from 'notiflix';

export function fetchCountries(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}?fields=${SEARCH_OPTION}`).then(
    response => response.json()
  );
}
