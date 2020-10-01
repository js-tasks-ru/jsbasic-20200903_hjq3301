describe('4-module-2-task', () => {
  let table;

  beforeEach(() => {
    table = document.createElement('TABLE');
    table.innerHTML = `
      <tr>
        <td>1:1</td>
        <td>2:1</td>
        <td>3:1</td>
        <td>4:1</td>
        <td>5:1</td>
      </tr>
      <tr>
        <td>1:2</td>
        <td>2:2</td>
        <td>3:2</td>
        <td>4:2</td>
        <td>5:2</td>
      </tr>
      <tr>
        <td>1:3</td>
        <td>2:3</td>
        <td>3:3</td>
        <td>4:3</td>
        <td>5:3</td>
      </tr>
      <tr>
        <td>1:4</td>
        <td>2:4</td>
        <td>3:4</td>
        <td>4:4</td>
        <td>5:4</td>
      </tr>
      <tr>
        <td>1:5</td>
        <td>2:5</td>
        <td>3:5</td>
        <td>4:5</td>
        <td>5:5</td>
      </tr>
    `;
  });

  it('должна окрашивать ячейку первой строки в красный', () => {
    makeDiagonalRed(table);

    let cell = table.rows[0].cells[0];

    expect(cell.style.backgroundColor).toBe('red');
  });

  it('должна окрашивать ячейку второй строки в красный', () => {
    makeDiagonalRed(table);

    let cell = table.rows[1].cells[1];

    expect(cell.style.backgroundColor).toBe('red');
  });

  it('должна окрашивать ячейку третьей строки в красный', () => {
    makeDiagonalRed(table);

    let cell = table.rows[2].cells[2];

    expect(cell.style.backgroundColor).toBe('red');
  });

  it('должна окрашивать ячейку четвёртой строки в красный', () => {
    makeDiagonalRed(table);

    let cell = table.rows[3].cells[3];

    expect(cell.style.backgroundColor).toBe('red');
  });

  it('должна окрашивать ячейку пятой строки в красный', () => {
    makeDiagonalRed(table);

    let cell = table.rows[4].cells[4];

    expect(cell.style.backgroundColor).toBe('red');
  });

});
