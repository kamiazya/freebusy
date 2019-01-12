import { Block } from './Block';
import { ScopeTime } from './ScopeTime';
import { BlockISO8601 } from './BlockISO8601';
import { DateTimeInput, convertDataTime } from '../utils';

export class BlockArray {

  static days(
    startDate: DateTimeInput, endDate: DateTimeInput,
    scope: ScopeTime = new ScopeTime(),
  ): BlockArray {

    const s = convertDataTime(startDate);
    const e = convertDataTime(endDate);

    let cur = s;
    const blocks: Block[] = [];

    while (cur < e) {
      const day = (cur.day + 6) % 7; // rotate number to use Sun as beginning of week
      const start = cur.plus({ hours: scope.start(day) });
      const end = cur.plus({ hours: scope.end(day) });
      blocks.push(new Block(start, end));
      cur = cur.plus({ days: 1 });
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
