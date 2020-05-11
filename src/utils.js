export function getAverageSumRow(table) {
  return table[0].map((row, i) =>
    Math.round(
      table.reduce((sum, cell) => sum + cell[i].amount, 0) / table.length,
    ),
  );
}

export function getClosestCells(table, hoverCell, count) {
  const closestCells = [];

  table.forEach((row) =>
    row.forEach((cell) => {
      if (cell.id === hoverCell.id) return;
      let diff = cell.amount - hoverCell.amount;
      diff = diff >= 0 ? diff : -diff;
      const newElem = {
        ...cell,
        diff,
      };
      closestCells.push(newElem);
    }),
  );

  closestCells.sort((a, b) => a.diff - b.diff);
  closestCells.unshift(hoverCell);
  closestCells.length = count + 1;
  return closestCells;
}
