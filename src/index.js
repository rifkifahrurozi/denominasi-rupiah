import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import Denominasirupiah from "./components/Denominasirupiah";
import drReducer from "./reducers/drReducer";

// connect redux devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux state container
const store = createStore(drReducer, composeEnhancers(applyMiddleware()));

const el = document.getElementById("main-container");
ReactDOM.render(
  <Provider store={store}>
    <Denominasirupiah />
  </Provider>,
  el
);
