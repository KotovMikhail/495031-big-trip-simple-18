import AbstractView from '../framework/view/abstract-view';

const createPointItemTemplate = () => '<li class="trip-events__item"></li>';

export default class PointItemView extends AbstractView {

  get template() {
    return createPointItemTemplate();
  }

  setPointItemClickiHandler = (callback) => {
    this._callback.pointItemClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointItemClickitHandler);
  };

  #pointItemClickitHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointItemClick();
  };

}
