import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";

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
      this.startResize(event.target);
      console.log(event.target.dataset.resize);
    }
  }

  startResize(target) {
    const mousemoveHandler = (mouseUpEvent) => {
      const parentNode = target.parentNode;
      const { x } = parentNode.getBoundingClientRect();
      const { clientX } = mouseUpEvent;
      const rowNodeChildren = [...parentNode.parentNode.children];
      const indexOfCurrentColumn = rowNodeChildren.indexOf(parentNode);
      const deltaWidth = clientX - x;

      parentNode.style.width = `${deltaWidth}px`;
      this.setWidthCells(indexOfCurrentColumn, deltaWidth);
    };
    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", (e) => {
      window.removeEventListener("mousemove", mousemoveHandler);
    });
  }

  setWidthCells(columnIndex, width) {
    //need data attr
    [...document.querySelectorAll(".row-data")].forEach((rowNode) => {
      const cellNodes = [...rowNode.querySelectorAll(".cell")];
      const cellInCurrentColumn = cellNodes.filter(
        (cell, index) => index === columnIndex
      );
      cellInCurrentColumn.forEach((cell, i) => {
        cell.style.width = `${width}px`;
      });
    });
  }
}
