import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import AppHotels from './components/appHotels';

module.exports = function render(initialState) {
  // Model the initial state  
  const store = configureStore(initialState);
  let content = renderToString(<Provider store={store} ><AppHotels /></Provider>);
  const preloadedState = store.getState();
  console.log(preloadedState);
  return {
    content,
    preloadedState
  };
};