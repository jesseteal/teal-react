import moment from 'moment';
export const DB_DATE = 'YYYY-MM-DD';
export const DB_DATETIME = "YYYY-MM-DD'T'HH:mm:ssxxx";
export const FORMAT_FULLDATE = 'MMM D, YYYY h:mm a';
const STANDARD_FORMAT = 'MM/DD/YYYY';

export function toDate(dateValue: any) {
  return moment(dateValue).toDate();
}

/**
  Converts the given number of seconds into a human-readable time format
  @param seconds - The number of seconds to be converted
  @param clock - Optional flag to format the result in a clock format (hh:mm:ss)
  @returns A string representing the time in the requested format
  */
export const secondsToTime = (seconds: number, clock: boolean = false) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds - days * 86400) / 3600);
  const min = Math.floor((seconds - hours * 3600 - days * 86400) / 60);
  const sec = Math.floor(seconds - min * 60 - hours * 3600 - days * 86400);
  if (clock) {
    const hoursString = hours < 10 ? `0${hours}:` : `${hours}:`;
    const minString = min < 10 ? `0${min}:` : `${min}:`;
    const secString = sec < 10 ? `0${sec}` : `${sec}`;
    return `${days ? days + ':' : ''}${hours || days ? hoursString : ''}${
      min || hours || days ? minString : ''
    }${secString}`;
  } else if (days) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  } else if (min) {
    return `${min} min${min > 1 ? 's' : ''}`;
  } else {
    return `${sec} sec${sec > 1 ? 's' : ''}`;
  }
};

export function formatDate(dateValue?: any, template = STANDARD_FORMAT) {
  if (!dateValue) {
    return null;
  }
  return moment(dateValue).format(template);
}

export function formatUtc(dateValue?: any, template = STANDARD_FORMAT) {
  if (!dateValue) {
    return null;
  }
  return moment.utc(dateValue).format(template);
}

export function dbDate(add: number) {
  return moment().add(add, 'days').format(DB_DATE);
}

export function now(format = DB_DATETIME) {
  return moment().format(format);
}

export function ago(dateValue?: any) {
  if (!dateValue) {
    return null;
  }
  return moment.utc(dateValue).fromNow();
}

// date comparisons

// true if dateValue comes before targetValue
export function before(dateValue: any, targetDate: any) {
  return moment(dateValue).isBefore(targetDate);
}

export const dateUtils = {
  DB_DATE,
  DB_DATETIME,
  FORMAT_FULLDATE,
  STANDARD_FORMAT,
  format: formatDate,
  formatUtc,
  toDate,
  now,
  ago,
  before,
};

export default dateUtils;

/*
  true if date is within next `days` days
 */
// export function within(dateValue, days) {
//   return isWithinInterval(parse(dateValue), {
//     start: new Date(),
//     end: _add(new Date(), { days }),
//   });
// }

// export function add(dateValue, days, withFormat = null) {
//   const d = parse(dateValue);
//   if (!d) {
//     return null;
//   }
//   if (withFormat) {
//     return fmt(_add(d, { days }), withFormat);
//   }
//   return _add(d, { days });
// }
