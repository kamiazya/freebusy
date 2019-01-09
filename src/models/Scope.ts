import { BlockLikeObject } from './BlockLikeObject';
import { ScopeTime } from './ScopeTime';
export interface Scope extends BlockLikeObject {
  time?: ScopeTime;
}
