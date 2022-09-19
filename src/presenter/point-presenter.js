import { render, replace, remove } from '../framework/render.js';
import {Mode} from '../mock/consts.js';
import PointItemView from '../view/point-item-view.js';
import PointEventView from '../view/point-event-view.js';
import FormEditView from '../view/form-edit-view.js';


export default class PointPresenter {
  #pointsListComponent = null;
  #pointItemComponent = null;
  #pointEventComponent = null;
  #formEditComponent = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(pointsListComponent, changeMode) {
    this.#pointsListComponent = pointsListComponent;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    const prevPointEventComponent = this.#pointEventComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointItemComponent = new PointItemView();
    this.#pointEventComponent = new PointEventView(point);
    this.#formEditComponent = new FormEditView(point);

    render(this.#pointEventComponent, this.#pointItemComponent.element);

    this.#pointItemComponent.setPointItemClickiHandler(this.#handlePointItemClick);
    this.#formEditComponent.setFormEditSubmitHandler(this.#handleFormEditSubmit);

    if (prevPointEventComponent === null || prevFormEditComponent === null) {
      render(this.#pointItemComponent, this.#pointsListComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointEventComponent, prevPointEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }

    remove(prevFormEditComponent);
    remove(prevPointEventComponent);
  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#pointEventComponent);
    remove(this.#formEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replacePointToForm();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEventComponent, this.#formEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #replaceFormToPoint = () => {
    replace(this.#formEditComponent, this.#pointEventComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePointToForm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handlePointItemClick = () => {
    this.#replaceFormToPoint();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormEditSubmit = () => {
    this.#replacePointToForm();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
