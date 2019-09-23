import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { app, facebookProvider } from "../firebase";

// reducers
import * as AuthActions from "~/actions/authActions";

class LogIn extends Component {
  constructor() {
    super();
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
  }

  authWithFacebook() {
    // add loader
    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          alert(error.message);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        alert(error.message);
      });
  }

  authWithEmailPassword(event) {
    // add load
    event.preventDefault();
    const email = document.getElementById("emailInput").value;
    const pw = document.getElementById("passwordInput").value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          return app.auth().createUserWithEmailAndPassword(email, pw);
        } else {
          app
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then(user => {
              const userInfo = {
                name: user.displayName,
                email: user.email,
                userId: user.uid,
                picture: user.photoURL
              };
              this.props.AuthActions.userLoginInfo(userInfo);
              this.props.history.push("/");
            })
            .catch(err => {
              console.error("error with login", err);
              alert(err.message);
            });
        }
      });
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
  }

  render() {
    return (
      <div>
        <button
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          className="btn dropbtn btn-outline-secondary dropdown-toggle"
        >
          Login <span className="caret" />
        </button>
        <ul
          style={{ padding: "2em 4em 0px 4em" }}
          className="dropdown-menu dropdown-menu-right dropdown-content mt-1"
        >
          <li className="p-3">
            <form className="form" role="form">
              <div className="form-group">
                <input
                  id="emailInput"
                  placeholder="Email"
                  className="input-large"
                  type="email"
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  id="passwordInput"
                  placeholder="Password"
                  className="input-large"
                  type="password"
                  required=""
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  style={{ cursor: "pointer" }}
                  onClick={event => {
                    event.preventDefault;
                    this.authWithEmailPassword(event);
                  }}
                >
                  Login/SignUp
                </button>
              </div>
              <div className="form-group text-xs-center">
                <small>
                  <a>Forgot password?</a>
                </small>
              </div>

              <div className="container">
                <a
                  className="btn btn-lg btn-social btn-facebook"
                  style={{
                    background: "#3B5998",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    this.authWithFacebook();
                  }}
                >
                  <i className="fa fa-facebook fa-fw" /> Sign in with Facebook
                </a>
              </div>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

const appDispatch = dispatch => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch)
  };
};

export default withRouter(connect(
  null,
  appDispatch
)(LogIn));
