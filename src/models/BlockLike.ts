import { Block } from './Block';
import { BlockISO8601 } from './BlockISO8601';
import { BlockLikeObject } from './BlockLikeObject';

export type BlockLike = Block | BlockLikeObject | BlockISO8601;

export function createBlock(block: BlockLike): Block {
  return new Block(block.start, block.end);
}

export function createBlocks(blocks: BlockLike[]): Block[] {
  return blocks.map(block => createBlock(block));
}

export function mapToBlock(block: BlockLike): Block {
  if (block instanceof Block) {
    return block;
  }
  return createBlock(block);
}
