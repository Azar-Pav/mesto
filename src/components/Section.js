//отвечает за отрисовку элементов на странице
export class Section {
  constructor( { renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItemsAppend(items) {
    items.forEach(this._renderer);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
