import { createElement } from '../render.js';
import { humanizeDateToShortTime, humanizeDateToShortDate, getSelectedOffers, getDestinations, checkDates } from '../utils.js';

const createPointEventItemTemplate = (point, offer, destination) => {

  const selectedOffers = getSelectedOffers(point.offers, offer.offers);
  const selectedDistinations = getDestinations(point, destination);

  const { basePrice, dateFrom, dateTo, type } = point;
  const { name } = selectedDistinations;

  const dateToShortDate = humanizeDateToShortDate(dateFrom);
  const time = checkDates(dateFrom, dateTo);
  const { dateFrom: timeFrom, dateTo: timeTo } = time;
  const dateFromToTime = humanizeDateToShortTime(timeFrom);
  const dateToToTime = humanizeDateToShortTime(timeTo);


  const isHasOffers = () => Boolean(selectedOffers.length);


  const createSelectedOffersTemplate = () => (`
      ${isHasOffers() ?
      `<ul class="event__selected-offers">
        ${selectedOffers.map(({ title, price }) => `
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
        </li>`).join('')}
      </ul>` :
      `<ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">No additional offers</span>
        </li>
      </ul>`
    }`
  );


  return (
    `<div class="event">
        <time class="event__date" datetime="2019-03-18">${dateToShortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">${dateFromToTime}</time> &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">${dateToToTime}</time>
          </p>
        </div>
        <p class="event__price">&euro;&nbsp;<span class="event__price-value">${basePrice}</span></p>
        <h4 class="visually-hidden">Offers:</h4>
       ${createSelectedOffersTemplate()}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
    </div> `
  );
};


const createPointItemTemplate = (point, offer, destination) => (
  `<li class="trip-events__item">
      ${createPointEventItemTemplate(point, offer, destination)}
  </li>`
);


export default class PointItemView {
  #element = null;

  constructor(point, offer, destination) {
    this.point = point;
    this.offer = offer;
    this.destination = destination;

  }

  get template() {
    return createPointItemTemplate(this.point, this.offer, this.destination);
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
