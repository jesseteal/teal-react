// rename to prevent name collisions
import {
  add as _add,
  isBefore,
  isWithinInterval,
  format as fmt,
  parseISO,
  isValid as isV,
  formatDistance,
  // subDays
} from 'date-fns'; //https://date-fns.org/docs/

/*
Exposed as Utils.date.*
 */
// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
export const DB_DATE = "yyyy-MM-dd";
export const DB_DATETIME = "yyyy-MM-dd'T'HH:mm:ssxxx";
export const FORMAT_FULLDATE = "MMM d, yyyy h:mm a"

export function parse(dateValue){
  const d = typeof dateValue === 'object' ? dateValue : parseISO(dateValue);
  return isV(d) ? d : null;
}

export function format(dateValue, template = "MM/dd/yyyy") {
  if(!dateValue){
    return null;
  }
  const date = typeof dateValue === 'string' ? parse(dateValue) : dateValue
  return isV(date) ? fmt(date, template) : 'Invalid'
}

// deprecate
export function now(format = DB_DATE){
  return fmt(new Date(), format)
}

export function dbNow(format = DB_DATETIME){
  return fmt(new Date(), format)
}

export function isValid(dateValue){
  const date = parse(dateValue)
  return isV(date);
}

export function ago(dateValue){
  if(!dateValue){
    return null;
  }
  return formatDistance(parse(dateValue), new Date())
}

// date comparisons

// true if dateValue comes before targetValue
export function before(dateValue, targetDate){
  return isBefore(parse(dateValue), parse(targetDate));
}

/*
  true if date is within next `days` days
 */
export function within(dateValue, days){
  return isWithinInterval(
    parse(dateValue),
    { start: new Date(), end: _add(new Date(), { days}) }
  )
}

export function add(dateValue, days, withFormat = null){
  const d = parse(dateValue);
  if(!d){
    return null;
  }
  if(withFormat){
    return fmt(_add(d, { days }), withFormat)
  }
  return _add(d, { days })
}
