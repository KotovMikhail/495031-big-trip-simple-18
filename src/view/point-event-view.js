import AbstractView from '../framework/view/abstract-view';
import { humanizeDateToShortTime, humanizeDateToShortDate, humanizeDateToDate, humanizeDateToDateWithTime, checkDates } from '../utils/day.js';

const createPointEventTemplate = (points, point, offers, destinations, pointByOfferType, selectedOffers, pointByDestinationName) => {
  const { basePrice, dateFrom, dateTo, type } = point;
  const { name } = pointByDestinationName;

  const dateToShortDate = humanizeDateToShortDate(dateFrom);
  const time = checkDates(dateFrom, dateTo);
  const { dateFrom: timeFrom, dateTo: timeTo } = time;
  const dateFromToTime = humanizeDateToShortTime(timeFrom);
  const dateToToTime = humanizeDateToShortTime(timeTo);
  const dateToDate = humanizeDateToDate(timeFrom);

  const isHasOffers = () => Boolean(selectedOffers.length);

  const createSelectedOffersTemplate = () => (`
      ${isHasOffers() ?
      `<ul class="event__selected-offers">
        ${selectedOffers.map(({ title, price }) => `
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
        </li>`)
      .join('')}
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
        <time class="event__date" datetime="${dateToDate}">${dateToShortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeDateToDateWithTime(dateFrom)}">${dateFromToTime}</time> &mdash;
            <time class="event__end-time" datetime="${humanizeDateToDateWithTime(dateTo)}">${dateToToTime}</time>
          </p>
        </div>
        <p class="event__price">&euro;&nbsp;<span class="event__price-value">${basePrice}</span></p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createSelectedOffersTemplate()}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
    </div>`
  );
};


export default class PointEventView extends AbstractView {
  #points = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #pointByOfferType = null;
  #selectedOffers = null;
  #pointByDestinationName = null;

  constructor(points, point, offers, destinations, pointByOfferType, selectedOffers, pointByDestinationName) {
    super();
    this.#points = points;
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointByOfferType = pointByOfferType;
    this.#selectedOffers = selectedOffers;
    this.#pointByDestinationName = pointByDestinationName;
  }

  get template() {
    return createPointEventTemplate(this.#points, this.#point, this.#offers, this.#destinations, this.#pointByOfferType, this.#selectedOffers, this.#pointByDestinationName);
  }

}
