// @ts-nocheck
import { intervalToDuration } from 'date-fns';
export const getElapsedTime = pastDate => {
  const duration = intervalToDuration({
    start: new Date(pastDate),
    end: new Date(),
  });

  let [years, months, days] = ['', '', ''];

  if (duration.years > 0) {
    years = duration.years === 1 ? '1 year' : `${duration.years} years`;
  }
  if (duration.months > 0) {
    months = duration.months === 1 ? '1 month' : `${duration.months} months`;
  }
  if (duration.days > 0) {
    days = duration.days === 1 ? '1 day' : `${duration.days} days`;
  }

  let response = [years, months, days].filter(Boolean);

  switch (response.length) {
    case 3:
      response[1] += ' and';
      response[0] += ',';
      break;
    case 2:
      response[0] += ' and';
      break;
  }
  return response.join(' ');
};
