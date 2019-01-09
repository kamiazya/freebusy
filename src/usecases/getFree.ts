import { BlockArray, Scope, BlockLike, mapToBlock } from '../models';

export function getFree(
  params: {
    scope: Scope,
    events: BlockLike[],
  },
): BlockArray {
  const scope = BlockArray.days(params.scope.start, params.scope.end, params.scope.time);
  return params.events
    .reduce((freeBlock, event) => freeBlock.subtract(mapToBlock(event)), scope);
}
