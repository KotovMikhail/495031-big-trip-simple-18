import { render, remove, RenderPosition } from '../framework/render.js';
import { nanoid } from 'nanoid';
import FormEditView from '../view/form-edit-view';
import PointItemView from '../view/point-item-view.js';
import { UserAction, UpdateType } from '../mock/consts.js';

export default class NewPointPresenter {
  #pointsListComponent = null;
  #pointItemComponent = null;
  #formEditComponent = null;
  #changeData = null;
  #destroyCallback = null;

  constructor(pointsListComponent, changeData) {
    this.#pointsListComponent = pointsListComponent;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#formEditComponent !== null) {
      return;
    }

    this.#pointItemComponent = new PointItemView();
    this.#formEditComponent = new FormEditView();

    this.#formEditComponent.setFormEditSubmitHandler(this.#handleFormEditSubmit);
    this.#formEditComponent.setFormDeletePointHandler(this.#handleFormDeleteClick);
    this.#formEditComponent.setFormEditCloseHandler(this.#handleFormCloseClick);

    render(this.#formEditComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  destroy = () => {
    if (this.#formEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formEditComponent);
    this.#formEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  setSaving = () => {
    this.#formEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditComponent.shake(resetFormState);
  };

  #handleFormCloseClick = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handleFormEditSubmit = (point) => {

    if(point.destination === null) {
      return;
    }

    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
  };

  #handleFormDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
