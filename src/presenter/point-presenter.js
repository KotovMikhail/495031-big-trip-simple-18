import { render, replace, remove } from '../framework/render.js';
import PointItemView from '../view/point-item-view.js';
import FormEditView from '../view/form-edit-view.js';
import {isDatesEqual} from '../utils/common.js';
import { UserAction, UpdateType, Mode } from '../consts.js';

export default class PointPresenter {
  #pointsModel = null;
  #pointsListComponent = null;
  #pointItemComponent = null;
  #formEditComponent = null;
  #changeMode = null;
  #changeData = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointsListComponent, changeData, changeMode, pointsModel) {
    this.#pointsListComponent = pointsListComponent;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
  }

  init = (point) => {
    this.#point = point;
    const offers = [...this.#pointsModel.offers];
    const destinations = [...this.#pointsModel.destinations];
    const prevPointItemComponent = this.#pointItemComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointItemComponent = new PointItemView(point, offers, destinations);
    this.#formEditComponent = new FormEditView(point, offers, destinations);

    this.#pointItemComponent.setPointItemClickiHandler(this.#handlePointItemClick);
    this.#formEditComponent.setFormEditSubmitHandler(this.#handleFormEditSubmit);
    this.#formEditComponent.setFormEditCloseHandler(this.#handleFormCloseClick);
    this.#formEditComponent.setFormDeletePointHandler(this.#handleFormDeleteClick);

    if (prevPointItemComponent === null || prevFormEditComponent === null) {
      render(this.#pointItemComponent, this.#pointsListComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointItemComponent, prevFormEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevFormEditComponent);
    remove(prevPointItemComponent);
  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#formEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#formEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointItemComponent.shake();
      document.addEventListener('keydown', this.#onEscKeyDownHandler);
      return;
    }

    const resetFormState = () => {
      this.#formEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#formEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #handleFormCloseClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handlePointItemClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handleFormDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #handleFormEditSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update,
    );


    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };
}
