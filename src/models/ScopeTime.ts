import { DayOfWeek } from './DayOfWeek';
import { DateTimeValidator } from './DateTimeValidator';

export class ScopeTime {

  private starts: number[];
  private ends: number[];

  constructor(
    option?: {
      defaultStart?: number;
      defaultEnd?: number;
    },
  ) {
    let defaultStart = 0;
    if (option && option.defaultStart) {
      defaultStart = option.defaultStart;
    }
    let defaultEnd = 24;
    if (option && option.defaultEnd) {
      defaultEnd = option.defaultEnd;
    }

    DateTimeValidator
      .validateHour(defaultStart,
        'set default start time between 0 and 24.')
      .validateHour(defaultEnd,
        'set default end time between 0 and 24.')
      .validateStartHourAndEndHour(defaultStart, defaultEnd,
        'start is larger then end.');

    this.starts = [];
    this.ends = [];
    for (let i = 0; i < 7; i++) {
      this.starts.push(defaultStart);
      this.ends.push(defaultEnd);
    }
  }

  public setStart(day: DayOfWeek, hour: number) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).')
      .validateHour(hour,
        'set start time between 0 and 24.');

    this.starts[day] = hour;
  }

  public setEnd(day: DayOfWeek, hour: number) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).')
      .validateHour(hour,
        'set end time between 0 and 24.');

    this.ends[day] = hour;
  }

  public start(day: DayOfWeek) {
    DateTimeValidator
      .validateDay(day,
        'day should be between 0(Sunday) and 6(Saturday).');

    return this.starts[day];
  }


  public end(day: DayOfWeek) {
    DateTimeValidator
      .validateDay(day,
      'day should be between 0(Sunday) and 6(Saturday).');

    return this.ends[day];
  }
}
