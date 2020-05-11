import { CREATE_TABLE } from '../type';

export default function createTable({ rows, columns }) {
  const table = [];

  for (let i = 0, id = 1; i < rows; i++) {
    const tableRow = [];
    for (let j = 0; j < columns; j++, id++) {
      tableRow.push({
        id,
        amount: Math.floor(100 + Math.random() * 900),
      });
    }
    table.push(tableRow);
  }
  return { type: CREATE_TABLE, table };
}
