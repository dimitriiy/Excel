const CODES_CHAR = {
  A: 65,
  Z: 90,
};

const createRow = (index, content) => {
  const resizer =
    index > 0 ? "<div class='row-resize' data-resize='row' ></div>" : "";
  return `
      <div class="row" data-row="${index}" data-type='resizable'>
        <div class="row-info">
            ${index}
           ${resizer}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `;
};

const createCol = (content, index) =>
  `<div class="column" data-type="resizable" data-col="${index}">${content}<div class="col-resize" data-resize='col'></div></div>`;

const createCell = (content, index) =>
  `<div class="cell" contenteditable data-cell-number="${index}">${content}</div>`;

const toChar = (_, index) => String.fromCharCode(CODES_CHAR.A + index);

export function createTable(rowCount = 15) {
  const columnCount = CODES_CHAR.Z - CODES_CHAR.A + 1;

  const headerColumns = new Array(columnCount)
    .fill("")
    .map(toChar)
    .map(createCol)
    .join("");

  const headerRow = createRow("", headerColumns);

  return [...new Array(rowCount)].reduce((acc, cur, index) => {
    const cells = new Array(columnCount).fill("").map(createCell).join("");

    const row = createRow(index + 1, cells);
    acc += row;
    return acc;
  }, headerRow);
}
