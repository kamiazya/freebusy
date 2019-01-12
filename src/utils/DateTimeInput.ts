import { DateTime } from 'luxon';
import moment from 'moment';

export type DateTimeInput = DateTime | moment.MomentInput;

export function convertDataTime(datetime: DateTimeInput): DateTime {
  if (datetime instanceof DateTime) {
    return datetime;
  }
  return DateTime
    .fromJSDate(
      moment(datetime).toDate());
}
