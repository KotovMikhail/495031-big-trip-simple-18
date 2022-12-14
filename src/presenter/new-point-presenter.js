import { render, remove, RenderPosition } from '../framework/render.js';
import FormEditView from '../view/form-edit-view';
import PointItemView from '../view/point-item-view.js';
import { UserAction, UpdateType } from '../consts.js';

export default class NewPointPresenter {
  #pointsListComponent = null;
  #pointItemComponent = null;
  #formEditComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #pointsModel = null;
  #point = null;

  constructor(pointsListComponent, changeData, pointsModel) {
    this.#pointsListComponent = pointsListComponent;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    const offers = [...this.#pointsModel.offers];
    const destinations = [...this.#pointsModel.destinations];

    if (this.#formEditComponent !== null) {
      return;
    }

    this.#pointItemComponent = new PointItemView(this.#point, offers, destinations);
    this.#formEditComponent = new FormEditView(this.#point, offers, destinations);

    this.#formEditComponent.setFormEditSubmitHandler(this.#handleFormEditSubmit);
    this.#formEditComponent.setFormDeletePointHandler(this.#handleFormDeleteClick);
    this.#formEditComponent.setFormEditCloseHandler(this.#handleFormCloseClick);


    render(this.#formEditComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#formEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formEditComponent);
    this.#formEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormEditSubmit = (point) => {
    if (!point.destination) {
      return;
    }

    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
