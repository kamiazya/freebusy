import { DateTime } from 'luxon';
import { BlockISO8601 } from './BlockISO8601';
import { BlockLikeObject } from './BlockLikeObject';
import { DateTimeInput, convertDataTime as convertToDataTime } from '../utils/DateTimeInput';

/**
 * Block is a object for abstract handling
 * of the start and end of time.
 */
export class Block implements BlockLikeObject {
  public readonly start: DateTime;
  public readonly end: DateTime;

  constructor(start: DateTimeInput, end: DateTimeInput) {

    this.start = convertToDataTime(start);
    this.end = convertToDataTime(end);

    if (this.start.isValid === false) {
      throw new Error('start value is invalid.');
    }
    if (this.end.isValid === false) {
      throw new Error('end value is invalid.');
    }

    if (this.start > this.end) {
      throw new Error('start is after then end.');
    }
  }

  public clone(): Block {
    return new Block(this.start, this.end);
  }

  public subtract(other: Block): Block[] {
    const notOverlapped = other.start > this.end || other.end < this.start;
    if (notOverlapped === true) {
      return [ this.clone() ];
    }
    return [
      new Block(this.start, other.start),
      new Block(other.end, this.end),
    ]
      .filter((b) => b.end > b.start);
  }

  public toISO8601(): BlockISO8601 {
    return {
      start: this.start.toISO(),
      end: this.end.toISO(),
    };
  }

}
