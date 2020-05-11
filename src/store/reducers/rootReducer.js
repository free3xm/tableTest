import {
  CREATE_TABLE,
  INCREASE_AMOUNT,
  SET_CELLS_TO_HOVER,
  DELETE_ROW,
  ADD_ROW,
  SHOW_ALERT,
  HIDE_ALERT,
} from '../type';

const initialState = {
  table: [],
  countClosestCellsToHover: 0,
  alert: null,
};

export default function rootReducer(state = initialState, action) {
  let newTable;
  switch (action.type) {
    case CREATE_TABLE:
      return {
        ...state,
        table: action.table,
      };
    case INCREASE_AMOUNT:
      newTable = state.table.map((row) => {
        return row.map((cell) =>
          cell.id === action.cellId
            ? { ...cell, amount: cell.amount + 1 }
            : cell,
        );
      });
      return {
        ...state,
        table: newTable,
      };
    case SET_CELLS_TO_HOVER:
      return {
        ...state,
        countClosestCellsToHover: action.count,
      };
    case DELETE_ROW:
      newTable = state.table.filter((row, index) => index !== action.rowIndex);
      return {
        ...state,
        table: newTable,
      };
    case ADD_ROW:
      return {
        ...state,
        table: action.table,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case HIDE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}
