import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create("DIV", "excel");

    this.components.forEach((Component) => {
      const $el = $.create("DIV", Component.className);
      const component = new Component();
      $el.innerHTML = component.toHTML();

      $root.append($el);
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
