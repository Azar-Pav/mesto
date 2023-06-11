//отвечает за отрисовку элементов на странице
export class Section {
  constructor({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items, userId) {
    items.forEach(item => {
      const itemElement = this._renderer(item, userId);
      this.addItem(itemElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
