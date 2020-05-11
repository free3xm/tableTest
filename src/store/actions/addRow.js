import { ADD_ROW } from '../type';

export default function addRow(table) {
  const lastTableRow = table.length > 0 ? table[table.length - 1] : null;
  let lastId = lastTableRow ? lastTableRow[lastTableRow.length - 1].id : 0;
  const row = [];
  for (let i = 0; i < table[0].length; i++) {
    row.push({
      id: ++lastId,
      amount: Math.floor(100 + Math.random() * 900),
    });
  }
  const newTable = [...table, row];
  return {
    type: ADD_ROW,
    table: newTable,
  };
}
