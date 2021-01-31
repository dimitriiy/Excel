class Dom {}

export const $ = () => {
  return new Dom();
};

$.create = (tagName, classes) => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
};
