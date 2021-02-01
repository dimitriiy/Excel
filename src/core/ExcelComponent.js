import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }

  toHTML() {
    return "";
  }
}
