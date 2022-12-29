export const extractCityState = (location: string) => {
  let city = '';
  let state = '';
  if (typeof location === 'string') {
    [city, state] = location.split(', ');
  }
  return { city, state };
};
