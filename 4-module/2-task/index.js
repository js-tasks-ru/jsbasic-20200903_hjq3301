/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
 let colorRed = [table.rows[0].cells[0].style.background = 'red',
                 table.rows[1].cells[1].style.background = 'red',
                 table.rows[2].cells[2].style.background = 'red',
                 table.rows[3].cells[3].style.background = 'red',
                 table.rows[4].cells[4].style.background = 'red',];
 return colorRed;
};