import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { $ } from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(20);
  }

  onMousedown(event) {
    const { target } = event;
    if (target.dataset.resize != null) {
      if (target.dataset.resize === "col") {
        this.resizeColumn(event);
      }

      if (target.dataset.resize === "row") {
        this.resizeRow(event);
      }
    }
  }

  resizeRow(event) {
    const $resize = $(event.target);
    const $parent = $resize.closest("[data-type='resizable']");
    const coords = $parent.getCoords();

    const mouseMoveHandler = (e) => {
      const delta = e.pageY - coords.bottom;
      const updatedHeight = coords.height + delta;

      $parent.css({ height: `${updatedHeight}px` });
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  }

  resizeColumn(event) {
    const $resize = $(event.target);

    $resize.css();
    const $parent = $resize.closest("[data-type='resizable']");
    const coords = $parent.getCoords();

    const columnIndex = +$parent.data.col;

    let childCells = document.querySelectorAll(
      `[data-cell-number="${columnIndex}"]`
    );

    const mouseMoveHandler = (e) => {
      const delta = e.pageX - coords.right;
      const updatedWidth = coords.width + delta;

      $parent.$el.style.width = `${updatedWidth}px`;
      this.resizeCells(childCells, updatedWidth);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  }

  resizeCells(cells, width) {
    cells.forEach((cell) => {
      cell.style.width = `${width}px`;
    });
  }
}
