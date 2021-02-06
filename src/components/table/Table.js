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
    if (event.target.dataset.resize != null) {
      const $resize = $(event.target);
      const $parent = $resize.closest("[data-type='resizable']");
      const coords = $parent.getCoords();

      const mouseMoveHandler = (e) => {
        const delta = e.pageX - coords.right;
        const updatedWidth = coords.width + delta;

        $parent.$el.style.width = `${updatedWidth}px`;
        this.resizeCells($parent, updatedWidth);
      };

      document.addEventListener("mousemove", mouseMoveHandler);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      });
    }
  }

  resizeCells($column, width) {
    const cells = [
      ...document.querySelectorAll(`[data-cell-number="${$column.index()}"]`),
    ];

    cells.forEach((cell) => {
      cell.style.width = `${width}px`;
    });
  }
}
