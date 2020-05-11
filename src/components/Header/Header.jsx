import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import createTable from '../../store/actions/createTable';
import setCellsToHover from '../../store/actions/setCellsToHover';
import cls from './Header.module.css';
import { showAlert } from '../../store/actions/alert';

function Header({ countClosestCellsToHover }) {
  const dispatch = useDispatch();
  const [tableSize, setTableSize] = useState({ rows: 0, columns: 0 });

  const valuesHandler = useCallback(
    (event) => {
      const value = Number(event.target.value);
      const newTableSize = { ...tableSize };
      if (Number.isNaN(value)) return;
      newTableSize[event.target.name] = value;
      setTableSize(newTableSize);
    },
    [tableSize],
  );
  const createTableHandler = useCallback(() => {
    const alert = {
      message: 'Table has been created.',
      type: 'success',
    };
    if (tableSize.rows <= 0 || tableSize.columns <= 0) {
      alert.message =
        'It is not possible to create a table with specified parameters.';
      alert.type = 'danger';
      return dispatch(showAlert(alert));
    }
    dispatch(showAlert(alert));
    return dispatch(createTable(tableSize));
  }, [tableSize, dispatch]);

  const setCellsToHoverHandler = useCallback(
    (event) => {
      const value = Number(event.target.value);
      if (Number.isNaN(value)) return;
      dispatch(setCellsToHover(value));
    },
    [dispatch],
  );

  return (
    <div className={cls.Header}>
      <label htmlFor="Row" className={cls.Label}>
        Row
        <input
          type="number"
          id="Row"
          className="form-control"
          name="rows"
          value={tableSize.rows}
          onChange={valuesHandler}
        />
      </label>
      <label htmlFor="Coulmn" className={cls.Label}>
        Coulmn
        <input
          type="number"
          id="Coulmn"
          className="form-control"
          name="columns"
          value={tableSize.columns}
          onChange={valuesHandler}
        />
      </label>
      <button
        className="btn btn-primary"
        onClick={createTableHandler}
        type="button"
      >
        Create table
      </button>
      <label htmlFor="hover-cells" className={cls.Label}>
        Hover&nbsp;
        {countClosestCellsToHover}
        &nbsp;cells
        <input
          type="number"
          id="hover-cells"
          className="form-control"
          value={countClosestCellsToHover}
          onChange={setCellsToHoverHandler}
        />
      </label>
    </div>
  );
}

Header.propTypes = {
  countClosestCellsToHover: PropTypes.number,
};

Header.defaultProps = {
  countClosestCellsToHover: 0,
};

export default React.memo(Header);
