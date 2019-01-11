import moment from 'moment';
import { Block } from './Block';
import { ScopeTime } from './ScopeTime';
import { BlockISO8601 } from './BlockISO8601';

export class BlockArray {

  static days(
    startDate: moment.MomentInput, endDate: moment.MomentInput,
    scope: ScopeTime = new ScopeTime(),
  ): BlockArray {

    let cur = moment(startDate);
    const blocks: Block[] = [];

    while (cur.isBefore(endDate)) {
      const day = (cur.day() + 6) % 7; // rotate number to use Sun as beginning of week
      const start = cur.clone().add(scope.start(day), 'hours');
      const end = cur.clone().add(scope.end(day), 'hours');

      blocks.push(new Block(start, end));
      cur = cur.clone().add(1, 'days');
    }

    return new BlockArray(blocks);
  }

  constructor(public readonly blocks: Block[]) { }

  public subtract(subtrahend: Block): BlockArray {
    return new BlockArray(Array.prototype.concat.apply(
      [], this.blocks.map((block) => block.subtract(subtrahend))));
  }

  public toISO8601(): BlockISO8601[] {
    return this.blocks.map((block) => block.toISO8601());
  }

}
