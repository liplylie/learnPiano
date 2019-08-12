import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./components/App.js";
// import 'font-awesome/css/font-awesome.min.css'

const LearnPiano = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<LearnPiano />, document.getElementById("app"));
