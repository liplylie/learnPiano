<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App.js'
// import 'font-awesome/css/font-awesome.min.css'

class LearnPiano extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <App /> 
      </Provider> 
    )
  }
}

ReactDOM.render(<LearnPiano/>, document.getElementById('app')) 
=======
=======
import React, { Component } from 'react'
>>>>>>> basic redux set up complex FINISH FIREB AUTH
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App.js'

class LearnPiano extends Component {
  constructor(props) {
    super(props); 
  }

<<<<<<< HEAD
ReactDOM.render(<App/>, document.getElementById('app'));
>>>>>>> basic set up with navBar and 404 route NEED TO ADD FIREB AUTH
=======
  render() {
    return (
      <Provider store={store}>
        <App /> 
      </Provider> 
    )
  }
}

ReactDOM.render(<LearnPiano/>, document.getElementById('app')) 
>>>>>>> basic redux set up complex FINISH FIREB AUTH
