import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App.js";
// import 'font-awesome/css/font-awesome.min.css'

class LearnPiano extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

<<<<<<< HEAD
ReactDOM.render(<LearnPiano/>, document.getElementById('app')) 
=======
ReactDOM.render(<LearnPiano />, document.getElementById("app"));
>>>>>>> master
