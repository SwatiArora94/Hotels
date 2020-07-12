import { REQUEST_HOTELS,  RECEIVE_HOTELS } from './actions';

function hotels( state = {isFetching: false, hotels: []}, action) {
  switch (action.type) {
    case REQUEST_HOTELS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_HOTELS:
      return Object.assign({}, state, {
        isFetching: false,
        hotels: action.hotels
      });
    default:
      return state
  }
}

export default hotels