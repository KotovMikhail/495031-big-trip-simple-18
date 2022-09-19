import AbstractView from '../framework/view/abstract-view';
import {offersMock} from '../mock/offersMock.js';
import {destinationsMock} from '../mock/destinationsMock.js';
import { getPointByOfferType, getSelectedOffers, getDestinations } from '../utils/common.js';
import { humanizeDateToShortTime, humanizeDateToShortDate, humanizeDateToDate, humanizeDateToDateWithTime, checkDates } from '../utils/day.js';

const createPointEventTemplate = (point) => {
  const pointByOfferType = getPointByOfferType(point, offersMock);
  const selectedOffers = getSelectedOffers(point.offers, pointByOfferType.offers);
  const pointByDestinationName = getDestinations(point, destinationsMock);

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
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointEventTemplate(this.#point);
  }

}
