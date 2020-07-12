export const REQUEST_HOTELS = 'REQUEST_HOTELS'
export const RECEIVE_HOTELS = 'RECEIVE_HOTELS'

function requestHotels() {
  return {
    type: REQUEST_HOTELS
  }
}

function receiveHotels(json) {
  return {
    type: RECEIVE_HOTELS,
    hotels: json
  }
}

function fetchHotels() {
  return dispatch => {
    dispatch(requestHotels())
    return fetch(`https://us-central1-mmt-interview.cloudfunctions.net/helloWorld`)
      .then(response => response.json())
      .then(json => dispatch(receiveHotels(json)))
  }
}

function shouldFetchHotels(state) {
  const hotels = state.hotels || []
  if (hotels.length==0) {
    return true
  } else if (state.isFetching) {
    return false
  }
}

export function fetchHotelsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHotels(getState())) {
      return dispatch(fetchHotels())
    }
  }
}