//отвечает за отрисовку элементов на странице
export class Section {
  constructor(containerSelector) {
    this._container = containerSelector;
  }

  renderItemsAppend(items, renderer) {
    this._renderer = renderer;
    items.forEach(item => {
      const itemElement = this._renderer(item);
      this.appendItem(itemElement);
    });
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependitem(element) {
    this._container.prepend(element);
  }
}
