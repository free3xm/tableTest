import { INCREASE_AMOUNT } from '../type';

export default function increaseAmount(cellId) {
  return {
    type: INCREASE_AMOUNT,
    cellId,
  };
}
