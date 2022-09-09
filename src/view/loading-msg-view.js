
import AbstractView from '../framework/view/abstract-view';

const createLoadingMsgTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingMsgView extends AbstractView {

  get template() {
    return createLoadingMsgTemplate();
  }

}
