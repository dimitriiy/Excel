const CODES_CHAR = {
  A: 65,
  Z: 90,
};

const createRow = (info, content) => {
  return `
      <div class="row">
        <div class="row-info">${info}</div>
        <div class="row-data">${content}</div>
      </div>
    `;
};

const createCol = (content) => `<div class="column">${content}</div>`;

const createCell = (content) =>
  `<div class="cell" contenteditable="">${content}</div>`;

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
