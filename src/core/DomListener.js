import { capitalize } from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No root element");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(
          `Method ${listener} is not implemented in ${this.name} Component`
        );
      }
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (method in this) {
        this.$root.off(listener, this[method].bind(this));
      }
    });
  }
}

const getMethodName = (eventName) => `on${capitalize(eventName)}`;
