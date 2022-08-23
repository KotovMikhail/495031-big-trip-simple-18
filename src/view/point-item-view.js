import { createElement } from '../render.js';
import { humanizeDateToTime, humanizeDateToShortDate } from '../utils.js';


const createPointItemTemplate = (point, offer, destination) => {
  const { basePrice, dateFrom, dateTo, type } = point;
  const dateFromToTime = humanizeDateToTime(dateFrom);
  const dateToToTime = humanizeDateToTime(dateTo);
  const dateToShortDate = humanizeDateToShortDate(dateFrom);
  const imagePoint = type;

  //const { name } = destination;
  //const { offers } = offer;
  //console.log(offers, 'point-view')

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${dateToShortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${imagePoint}.png" alt="Event type icon">
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
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Add breakfast</span>&plus;&euro;&nbsp;<span class="event__offer-price"></span>
          </li>
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

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
