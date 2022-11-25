import { countriesAndCapitals } from '.';

// given a country name, return its code
export const countryCode = (countryName: string) => {
  const country = countriesAndCapitals.find(
    country => country.name === countryName
  );
  return country?.code;
};

// given a country capital, return its code
export const capitalCode = (capitalName: string) => {
  const country = countriesAndCapitals.find(
    country => country.capital === capitalName
  );
  return country?.code;
};
