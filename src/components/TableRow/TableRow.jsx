import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell/TableCell';
import cls from './TableRow.module.css';

function TableRow({
  row,
  rowIndex,
  rowSum,
  increaseAmountHandler,
  setHoverCellHandler,
  closestCells,
  deleteRowHandler,
}) {
  const [hoverRowIndex, setHoverIndex] = useState(null);
  const deleteHandler = useCallback(() => deleteRowHandler(rowIndex), [
    deleteRowHandler,
    rowIndex,
  ]);
  const setHoverRowHandler = useCallback(() => setHoverIndex(rowIndex), [
    rowIndex,
  ]);
  const removeHoverRowHandler = useCallback(() => setHoverIndex(null), []);
  const cells = useMemo(
    () =>
      row.map((cell) => (
        <TableCell
          key={cell.id}
          cell={cell}
          increaseAmountHandler={increaseAmountHandler}
          rowIndex={rowIndex}
          rowSum={rowSum}
          hoverRowIndex={hoverRowIndex}
          setHoverCellHandler={setHoverCellHandler}
          isClosestCell={closestCells.some(
            (closestCell) => closestCell.id === cell.id,
          )}
        />
      )),
    [
      closestCells,
      hoverRowIndex,
      increaseAmountHandler,
      row,
      rowIndex,
      rowSum,
      setHoverCellHandler,
    ],
  );
  return (
    <tr key={rowIndex} role="row">
      {cells}
      <td
        className={cls.cellInfo}
        onMouseEnter={setHoverRowHandler}
        onMouseLeave={removeHoverRowHandler}
        role="gridcell"
      >
        {rowSum}
        <button
          onClick={deleteHandler}
          className="btn btn-danger"
          type="button"
        >
          &times;
        </button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
    }),
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowSum: PropTypes.number.isRequired,
  increaseAmountHandler: PropTypes.func.isRequired,
  setHoverCellHandler: PropTypes.func.isRequired,
  closestCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
      diff: PropTypes.number,
    }),
  ),
  deleteRowHandler: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  closestCells: [],
};

export default React.memo(TableRow);
