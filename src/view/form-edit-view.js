import { createElement } from '../render.js';


const createFormEventHeaderTemplate = (points, offers, destinations) => {

  const createFormEditEventTypeListTemplate = () => {
    if (!points.length) {
      return '';
    }

    return points
      .map(
        (item) =>
          `<div class="event__type-item">
              <input id="event-type-${item.type.toLowerCase()}-${item.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.type.toLowerCase()}">
              <label class="event__type-label  event__type-label--${item.type.toLowerCase()}" for="event-type-${item.type.toLowerCase()}-${item.id}">${item.type.toLowerCase()}</label>
            </div>
          `
      )
      .join('');
  };

  const createFormCitiesListTemplate = () => {
    if (!destinations.length) {
      return '';
    }

    return destinations.map((item) => `<option value="${item.name}"></option>`).join('');
  };


  return (`
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createFormEditEventTypeListTemplate()}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createFormCitiesListTemplate()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
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
  </header> 
`);
};

const createFormOffersItems = (points, offers) => offers.map((offer) => {
  const checked = points.offers.includes(offer.id) ? 'checked' : '';

  const { id, title, price } = offer;

  const offerName = title.split(' ').splice(-1)[0];

  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerName}-${id}" type="checkbox" name="event-offer-${offerName}" ${checked}>
    <label class="event__offer-label" for="event-offer-${offerName}-${id}">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);
});


const createFormOffersListTemplate = (points, offers) => {
  const isHasOffers = () => Boolean(offers.length);

  return (`
  ${isHasOffers() ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createFormOffersItems(points, offers).join('')}
        </div>
        </section>` : ''
    }`
  );
};


const createFormEditTemplate = (point, offer, destination) => (`
  <form class="event event--edit" action="#" method="post">
    ${createFormEventHeaderTemplate(point, offer, destination)}
    <section class="event__details">
      ${createFormOffersListTemplate(point, offer, destination)}
    </section>
  </form>
`);

export default class FormEditView {
  #element = null;

  constructor(point, offer, destination) {
    this.point = point;
    this.offer = offer;
    this.destination = destination;
  }

  get template() {
    return createFormEditTemplate(this.point, this.offer, this.destination);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
