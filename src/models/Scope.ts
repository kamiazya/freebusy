import { BlockLikeObject } from './BlockLikeObject';
import { ScopeTime } from './ScopeTime';

/**
 * Search scope for getFree.
 */
export interface Scope extends BlockLikeObject {
  time?: ScopeTime;
}
