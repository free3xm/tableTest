import { SET_CELLS_TO_HOVER } from '../type';

export default function setCellsToHover(count) {
  return {
    type: SET_CELLS_TO_HOVER,
    count,
  };
}
