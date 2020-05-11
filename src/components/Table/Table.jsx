import React, { useMemo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import increaseAmount from '../../store/actions/increaseAmount';
import deleteRow from '../../store/actions/deleteRow';
import addRow from '../../store/actions/addRow';
import { showAlert } from '../../store/actions/alert';
import { getAverageSumRow, getClosestCells } from '../../utils';
import TableRow from '../TableRow/TableRow';
import cls from './Table.module.css';

function Table({ table, countClosestCellsToHover }) {
  const dispatch = useDispatch();
  const [hoverCell, setHoverCell] = useState(null);

  const closestCells = useMemo(() => {
    if (countClosestCellsToHover && hoverCell) {
      return getClosestCells(table, hoverCell, countClosestCellsToHover);
    }
    return [];
  }, [hoverCell, countClosestCellsToHover, table]);

  const avarageOfColumns = useMemo(() => getAverageSumRow(table), [table]);
  const rowsSum = useMemo(
    () => table.map((row) => row.reduce((sum, item) => sum + item.amount, 0)),
    [table],
  );
  const increaseAmountHandler = useCallback(
    (cellId) => {
      return dispatch(increaseAmount(cellId));
    },
    [dispatch],
  );
  const addRowHandler = useCallback(() => {
    const alert = {
      message: 'Row added.',
      type: 'success',
    };
    dispatch(showAlert(alert));
    dispatch(addRow(table));
  }, [table, dispatch]);
  const deleteRowHandler = useCallback(
    (rowIndex) => {
      const alert = {
        message: 'Row deleted.',
        type: 'success',
      };
      dispatch(showAlert(alert));
      dispatch(deleteRow(rowIndex));
    },
    [dispatch],
  );
  const setHoverCellHandler = useCallback(
    (cell) => {
      if (!countClosestCellsToHover) return;
      setHoverCell(cell);
    },
    [countClosestCellsToHover],
  );
  const content = useMemo(
    () =>
      table.map((row, rowIndex) => (
        <TableRow
          key={Math.random()}
          row={row}
          rowIndex={rowIndex}
          rowSum={rowsSum[rowIndex]}
          increaseAmountHandler={increaseAmountHandler}
          setHoverCellHandler={setHoverCellHandler}
          closestCells={closestCells}
          deleteRowHandler={deleteRowHandler}
        />
      )),
    [
      closestCells,
      increaseAmountHandler,
      rowsSum,
      setHoverCellHandler,
      table,
      deleteRowHandler,
    ],
  );
  return (
    <table className={`table table-bordered ${cls.table}`} role="grid">
      <tbody>
        {content}
        <tr role="row">
          {avarageOfColumns.map((elm) => (
            <td
              className={cls.cellInfo}
              key={Math.random() + elm}
              role="gridcell"
            >
              {elm}
            </td>
          ))}
          <td className={cls.cellInfo} role="gridcell">
            <button
              onClick={addRowHandler}
              className="btn btn-primary"
              type="button"
            >
              add row
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

Table.propTypes = {
  table: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  countClosestCellsToHover: PropTypes.number,
};

Table.defaultProps = {
  countClosestCellsToHover: 0,
};

export default React.memo(Table);
