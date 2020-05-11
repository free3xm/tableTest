import { DELETE_ROW } from '../type';

export default function deleteRow(rowIndex) {
  return {
    type: DELETE_ROW,
    rowIndex,
  };
}
