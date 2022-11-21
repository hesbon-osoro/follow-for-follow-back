//@ts-nocheck
export const thousandSeparator = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
