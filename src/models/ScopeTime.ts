import { DayOfWeek } from './DayOfWeek';
import { DateTimeValidator } from './DateTimeValidator';

/**
 * Scope on the time used to get free time.
 */
export class ScopeTime {

  private starts: number[];
  private ends: number[];

  constructor(
    option?: {
      defaultStart?: number;
      defaultEnd?: number;
    },
  ) {

    // override default when option is not seted.
    let defaultStart = 0;
    if (option && option.defaultStart) {
      defaultStart = option.defaultStart;
    }
    let defaultEnd = 24;
    if (option && option.defaultEnd) {
      defaultEnd = option.defaultEnd;
    }

    // validate so that incorrect date and time will not be set
    DateTimeValidator
      .validateHour(defaultStart,
        'set default start time between 0 and 24.')
      .validateHour(defaultEnd,
        'set default end time between 0 and 24.')
      .validateStartHourAndEndHour(defaultStart, defaultEnd,
        'start is larger then end.');

    this.starts = new Array(7).fill(defaultStart);
    this.ends = new Array(7).fill(defaultEnd);
  }

  /**
   * Set start time to day of week.
   *
   * @param day day of week.
   * 0(Sunday) and 6(Saturday)
   * @param hour start hour of day.
   * between 0 and 24.
   */
  public setStart(day: DayOfWeek, hour: number) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).')
      .validateHour(hour,
        'set start time between 0 and 24.');

    this.starts[day] = hour;
  }

  /**
   * Set end time to day of week.
   *
   * @param day day of week.
   * 0(Sunday) and 6(Saturday)
   * @param hour end hour of day.
   * between 0 and 24.
   */
  public setEnd(day: DayOfWeek, hour: number) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).')
      .validateHour(hour,
        'set end time between 0 and 24.');

    this.ends[day] = hour;
  }

  /**
   * Get start hour for given day of week.
   *
   * @param day day of week
   */
  public start(day: DayOfWeek) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).');

    return this.starts[day];
  }

  /**
   * Get end hour for given day of week.
   *
   * @param day day of week
   */
  public end(day: DayOfWeek) {
    DateTimeValidator
      .validateDay(day,
      'day should be between 0(Sunday) and 6(Saturday).');

    return this.ends[day];
  }
}
