import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.name = options.name;
  }

  getRoot() {
    const $root = $.create("DIV", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("DIV", Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());

      $root.append($el);

      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}
