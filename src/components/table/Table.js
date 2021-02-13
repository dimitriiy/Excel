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
    const resizerDimensions = $resize.getCoords();
    const $parent = $resize.closest("[data-type='resizable']");
    const parentDimensions = $parent.getCoords();
    let offsetY = null;

    $resize.addClass("active");

    const mouseMoveHandler = (e) => {
      offsetY = e.pageY - resizerDimensions.bottom + resizerDimensions.height;

      $resize.css({
        transform: `translateY(${offsetY}px)`,
      });
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      $resize.removeClass("active");
      $resize.css({
        transform: "none",
      });

      const updatedHeight = offsetY + parentDimensions.height;

      $parent.css({ height: `${updatedHeight}px` });

      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  }

  resizeColumn(event) {
    const $resize = $(event.target);
    const resizerDimensions = $resize.getCoords();
    const $parent = $resize.closest("[data-type='resizable']");
    const parentDimensions = $parent.getCoords();
    const columnIndex = +$parent.data.col;
    const childCells = document.querySelectorAll(
      `[data-cell-number="${columnIndex}"]`
    );

    $resize.addClass("active");

    let offsetX = null;

    const mouseMoveHandler = (e) => {
      offsetX = e.pageX - resizerDimensions.left;

      $resize.css({
        transform: `translateX(${offsetX}px)`,
      });
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveHandler);

      $resize.removeClass("active");
      $resize.css({
        transform: "none",
      });
      const updatedWidth = parentDimensions.width + offsetX;
      $parent.$el.style.width = `${updatedWidth}px`;
      this.resizeCells(childCells, updatedWidth);
    });
  }

  resizeCells(cells, width) {
    cells.forEach((cell) => {
      cell.style.width = `${width}px`;
    });
  }
}
