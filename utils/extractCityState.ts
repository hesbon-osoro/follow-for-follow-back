export const extractCityState = (location: string) => {
  const [city, state] = location.split(', ');
  return { city, state };
};
