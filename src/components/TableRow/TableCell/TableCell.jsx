import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cls from './TableCell.module.css';

function TableCell({
  cell,
  rowIndex,
  rowSum,
  increaseAmountHandler,
  hoverRowIndex,
  isClosestCell,
  setHoverCellHandler,
}) {
  const addToAmountHandler = useCallback(() => increaseAmountHandler(cell.id), [
    cell,
    increaseAmountHandler,
  ]);
  const addHoverCellHandler = useCallback(
    () => setHoverCellHandler({ id: cell.id, amount: cell.amount }),
    [cell, setHoverCellHandler],
  );
  const removeHoverCellHandler = useCallback(() => setHoverCellHandler(null), [
    setHoverCellHandler,
  ]);
  const classes = [cls.cell];
  if (isClosestCell) classes.push(cls.closestCell);

  const content = useMemo(
    () =>
      rowIndex === hoverRowIndex ? (
        <>
          {Math.round((cell.amount / rowSum) * 100)}
          %
          <div
            style={{
              height: `${Math.round((cell.amount / rowSum) * 100)}%`,
              width: '100%',
              background: '#009688',
            }}
          />
        </>
      ) : (
        cell.amount
      ),
    [cell, hoverRowIndex, rowIndex, rowSum],
  );

  return (
    <td
      className={classes.join(' ')}
      onClick={addToAmountHandler}
      onMouseEnter={addHoverCellHandler}
      onMouseLeave={removeHoverCellHandler}
      role="gridcell"
    >
      {content}
    </td>
  );
}

TableCell.propTypes = {
  cell: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowSum: PropTypes.number.isRequired,
  increaseAmountHandler: PropTypes.func.isRequired,
  hoverRowIndex: PropTypes.number,
  isClosestCell: PropTypes.bool.isRequired,
  setHoverCellHandler: PropTypes.func.isRequired,
};

TableCell.defaultProps = {
  hoverRowIndex: null,
};

export default React.memo(TableCell);
