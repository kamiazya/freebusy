import moment from 'moment';
import { BlockISO8601 } from './BlockISO8601';
import { BlockLikeObject } from './BlockLikeObject';

export class Block implements BlockLikeObject {
  public readonly start: moment.Moment;
  public readonly end: moment.Moment;

  constructor(start: moment.MomentInput, end: moment.MomentInput) {
    this.start = moment(start);
    this.end = moment(end);
    if (this.start.isValid() === false) {
      throw new Error('start value is invalid.');
    }
    if (this.end.isValid() === false) {
      throw new Error('end value is invalid.');
    }
    if (this.start.isAfter(this.end)) {
      throw new Error('start is after then end.');
    }
  }

  public clone(): Block {
    return new Block(this.start, this.end);
  }

  public subtract(other: Block): Block[] {
    const notOverlapped = other.start.isAfter(this.end) || other.end.isBefore(this.start);
    if (notOverlapped === true) {
      return [ this.clone() ];
    }
    return [
      new Block(this.start, other.start),
      new Block(other.end, this.end),
    ]
      .filter((b) => b.end.isAfter(b.start));
  }

  public toISO8601(): BlockISO8601 {
    return {
      start: this.start.toISOString(),
      end: this.end.toISOString(),
    };
  }

}
