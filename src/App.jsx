import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Table from './components/Table/Table';
import Alert from './components/UI/Alert/Alert';
import cls from './App.module.css';

function App() {
  const table = useSelector((state) => state.table);
  const alert = useSelector((state) => state.alert);
  const countClosestCellsToHover = useSelector(
    (state) => state.countClosestCellsToHover,
  );
  return (
    <div className={cls.App}>
      <Header countClosestCellsToHover={countClosestCellsToHover} />
      {alert && <Alert alert={alert} />}
      <div className={cls.container}>
        {table.length > 0 ? (
          <Table
            table={table}
            countClosestCellsToHover={countClosestCellsToHover}
          />
        ) : null}
      </div>
    </div>
  );
}

App.whyDidYouRender = true;

export default App;
