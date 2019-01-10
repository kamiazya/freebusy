export class DateTimeValidator {
  public static validateDay(day: number, errorMessage: string) {
    if (day < 0 || 6 < day) {
      throw new Error(errorMessage);
    }
    return this;
  }

  public static validateHour(hour: number, errorMessage: string) {
    if (hour < 0 || 24 < hour) {
      throw new Error(errorMessage);
    }
    return this;
  }

  public static validateStartHourAndEndHour(start: number, end: number, errorMessage: string) {
    if (start > end) {
      throw new Error(errorMessage);
    }
    return this;
  }
}
