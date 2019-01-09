import { DayOfWeek } from './DayOfWeek';

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

    if (defaultStart < 0 || 24 < defaultStart) {
      throw new Error('set default start time between 0 and 24.');
    }
    if (defaultEnd < 0 || 24 < defaultEnd) {
      throw new Error('set default end time between 0 and 24.');
    }
    if (defaultStart > defaultEnd) {
      throw new Error('start is larger then end.');
    }
    this.starts = [];
    this.ends = [];
    for (let i = 0; i < 7; i++) {
      this.starts.push(defaultStart);
      this.ends.push(defaultEnd);
    }
  }

  public setStart(day: DayOfWeek, hour: number) {
    if (day < 0 || 6 < day) {
      throw new Error('day should be between 0(Sunday) and 6(Saturday).');
    }
    if (hour < 0 || 24 < hour) {
      throw new Error('day should be between 0 and 24.');
    }
    this.starts[day] = hour;
  }

  public setEnd(day: DayOfWeek, hour: number) {
    if (day < 0 || 6 < day) {
      throw new Error('day should be between 0(Sunday) and 6(Saturday).');
    }
    if (hour < 0 || 24 < hour) {
      throw new Error('day should be between 0 and 24.');
    }
    this.ends[day] = hour;
  }

  public start(day: DayOfWeek) {
    if (day < 0 || 6 < day) {
      throw new Error('day should be between 0(Sunday) and 6(Saturday).');
    }
    return this.starts[day];
  }


  public end(day: DayOfWeek) {
    if (day < 0 || 6 < day) {
      throw new Error('day should be between 0(Sunday) and 6(Saturday).');
    }
    return this.ends[day];
  }
}
