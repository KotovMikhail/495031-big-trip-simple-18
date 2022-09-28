import AbstractStatefullView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, firstLetterToLowerCase, getDestinations, getPointByOfferType } from '../utils/common.js';
import { humanizeDateToDateWithSpace } from '../utils/day.js';
import { offersMock } from '../mock/offersMock.js';
import { destinationsMock } from '../mock/destinationsMock.js';
import { POINTS_TYPE, NewPoint } from '../mock/consts';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const createFormEditTemplate = (point) => {
  const { type, dateFrom, dateTo } = point;


  let pointByDestinationName = getDestinations(point, destinationsMock);
  const pointByOfferType = getPointByOfferType(point, offersMock);

  if (!pointByDestinationName) {
    pointByDestinationName = false;
  }

  const { description } = pointByDestinationName;
  let { name } = pointByDestinationName;

  if (!pointByDestinationName) {
    name = '';
  }


  const createFormCitiesListTemplate = () => {
    if (!destinationsMock.length) {
      return '';
    }

    return destinationsMock.map((item) => `<option value="${item.name}"></option>`).join('');
  };

  const createFormEditEventTypeListTemplate = () => POINTS_TYPE.map((eventType, id) =>
    `<div class="event__type-item">
        <input id="event-type-${eventType}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType}">
        <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-${id}">${capitalizeFirstLetter(eventType)}</label>
      </div>`
  ).join('');

  const createFormEventHeaderTemplate = () => (`
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
  
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createFormEditEventTypeListTemplate(point)}
          </fieldset>
        </div>
      </div>
  
      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createFormCitiesListTemplate()}
        </datalist>
      </div>
  
      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateToDateWithSpace(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateToDateWithSpace(dateTo)}">
      </div>
  
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>
  
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`
  );

  const createFormOffersItems = () => {
    const isOfferChecked = (id) => point.offers.includes(id) ? 'checked' : '';

    const createFormOfferItem = () => pointByOfferType.offers.map(({ id, title, price }) => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox visually-hidden" id="event-offer-${firstLetterToLowerCase(title)}-${id}" type="checkbox" data-id="${id}" name="event-offer-${firstLetterToLowerCase(title)}" ${isOfferChecked(id)}>
              <label class="event__offer-label" for="event-offer-${firstLetterToLowerCase(title)}-${id}">
                <span class="event__offer-title">${title}</span>
                +€&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`).join('');

    const offersTemplate = createFormOfferItem();

    return offersTemplate;
  };


  const createFormOffersListTemplate = () => {
    const isHasOffers = () => pointByOfferType.offers.length > 0;

    return (`
        ${isHasOffers() ?
        `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createFormOffersItems(point)}
          </div>
        </section>` : ''
      }`
    );
  };

  const createPhotosTemplate = () =>
    pointByDestinationName.pictures
      .map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`)
      .join('');


  const createFormDestinationTemplate = () => (`
      ${pointByDestinationName ? `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
      
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotosTemplate()}
            </div>
          </div>
        </section>` : ''
    }`
  );


  return (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createFormEventHeaderTemplate(point)}
      <section class="event__details">
        ${createFormOffersListTemplate(point)}
        ${createFormDestinationTemplate(point)}
      </section>
    </form>
  </li>
`);
};

export default class FormEditView extends AbstractStatefullView {
  #datepicker = null;

  constructor(point) {
    super();

    if (!point) {
      point = NewPoint;
    }

    this._state = FormEditView.parsePointToState(point);

    this.#setInnerHandlers();

    this.#setFromDatepicker();
    this.#setToDatepicker();
  }

  get template() {
    return createFormEditTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      FormEditView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setFromDatepicker();
    this.#setToDatepicker();
    this.setFormEditSubmitHandler(this._callback.formEditSubmit);
    this.setFormEditCloseHandler(this._callback.formCloseClick);
    this.setFormDeletePointHandler(this._callback.formDeleteClick);
  };

  setFormEditSubmitHandler = (callback) => {
    this._callback.formEditSubmit = callback;
    this.element.addEventListener('submit', this.#formEditSubmitHandler);
  };

  setFormEditCloseHandler = (callback) => {
    this._callback.formCloseClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditCloseHandler);
  };

  setFormDeletePointHandler = (callback) => {
    this._callback.formDeleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeletePointHandler);
  };

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input'))
      .forEach((eventType) => eventType.addEventListener('click', this.#eventTypeInputHandler));

    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((eventOffer) => eventOffer.addEventListener('change', this.#eventOfferCheckboxHandler));

    this.element.querySelector('.event__input--destination').addEventListener('input', this.#eventInputDestinationHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeletePointHandler);
  };

  #setFromDatepicker = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');

    this.#datepicker = flatpickr(
      dateStartInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateStartInput.value,
        dateFormat: 'd/m/y H:i',
        onClose: this.#dateStartHandler,
      },
    );
  };

  #setToDatepicker = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');
    const dateEndInput = this.element.querySelector('input[name="event-end-time"]');

    this.#datepicker = flatpickr(
      dateEndInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateEndInput.value,
        dateFormat: 'd/m/y H:i',
        minDate: dateStartInput.value,
        onClose: this.#dateEndHandler,
      },
    );
  };

  #dateStartHandler = ([userDateStart]) => {
    if (userDateStart > this._state.dateTo) {

      this.updateElement({
        dateFrom: userDateStart,
        dateTo: userDateStart,
      });
    }

    this.updateElement({
      dateFrom: userDateStart,
    });
  };

  #dateEndHandler = ([userDateEnd]) => {
    this.updateElement({
      dateTo: userDateEnd,
    });
  };

  #formEditSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formEditSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #formEditCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.formCloseClick(FormEditView.parseStateToPoint(this._state));
  };

  #formDeletePointHandler = (evt) => {
    evt.preventDefault();
    this._callback.formDeleteClick(FormEditView.parseStateToPoint(this._state));
  };

  #eventTypeInputHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventOfferCheckboxHandler = () => {
    const selectedOffers = [];

    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((checkbox) => checkbox.checked ? selectedOffers.push(Number(checkbox.dataset.id)) : '');

    this.updateElement({
      offers: selectedOffers,
    });
  };

  #eventInputDestinationHandler = (evt) => {
    evt.preventDefault();

    const input = this.element.querySelector('.event__input--destination');

    const city = Array.from(
      document.getElementById('destination-list-1').options
    )
      .map((item) => item.value)
      .join(' ')
      .includes((evt.target.value));

    if (!city) {
      input.value = input.value.substring(0, input.value.length - 1);
    }

    const dest = destinationsMock.find((item) => item.name === evt.target.value);

    if (!dest) {
      return;
    }

    const { id } = dest;

    this.updateElement({
      destination: id,
    });
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    return point;
  };
}
