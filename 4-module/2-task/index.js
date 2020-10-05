/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let rowsLength = table.rows.length;
  let rows = table.rows;

  for (let i = 0; i < rowsLength; i++) {
    let row = rows[i];
    row.cells[i].style.backgroundColor = 'red';
  }
}
