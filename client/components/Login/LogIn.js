// libs
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PulseLoader } from "react-spinners";
import Popup from "react-popup";

// global
import { app, facebookProvider } from "~/firebase";

// reducers
import * as AuthActions from "~/actions/authActions";

// local
import { StyledUL, FacebookStyle } from "./LoginStyle";

class LogIn extends Component {
  state = {
    isLoading: false
  };

  authWithFacebook = () => {
    this.setState({ isLoading: true });

    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        this.setState({ isLoading: false });

        if (error) {
          Popup.alert(error.message);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        Popup.alert(error.message);
        console.error("error with login", err.message);
        this.setState({ isLoading: false });
      });
  };

  authWithEmailPassword = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const email = document.getElementById("emailInput").value;
    const pw = document.getElementById("passwordInput").value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        this.setState({ isLoading: false });

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
              this.setState({ isLoading: false });
              Popup.alert(err.message);
            });
        }
      })
      .catch(err => {
        console.error("error with login", err);
        this.setState({ isLoading: false });
        Popup.alert(err.message);
      });

    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Popup />

        <button
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          className="btn dropbtn btn-outline-secondary dropdown-toggle"
        >
          {isLoading ? (
            <PulseLoader
              css={{ display: "inline-block" }}
              sizeUnit={"px"}
              size={8}
              color={"white"}
              loading={isLoading}
            />
          ) : (
            <>
              Login <span className="caret" />
            </>
          )}
        </button>

        <StyledUL className="dropdown-menu dropdown-menu-right dropdown-content mt-1">
          <li className="p-3">
            <form className="form" role="form">
              <div className="form-group">
                <p>Email:</p>

                <input
                  id="emailInput"
                  placeholder="Email"
                  className=" form-control"
                  type="email"
                  required={true}
                />
              </div>

              <div className="form-group">
                <p>Password:</p>

                <input
                  id="passwordInput"
                  placeholder="Password"
                  className=" form-control"
                  type="password"
                  required=""
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  style={{ cursor: "pointer" }}
                  onClick={event => {
                    event.preventDefault;
                    this.authWithEmailPassword(event);
                  }}
                >
                  Login/SignUp
                </button>
              </div>

              {/* <div className="form-group text-xs-center">
                <small>
                  <a>Forgot password?</a>
                </small>
              </div> */}

              <div className="container">
                <FacebookStyle
                  className="btn btn-lg btn-social btn-facebook"
                  onClick={() => {
                    this.authWithFacebook();
                  }}
                >
                  <i className="fa fa-facebook fa-fw" /> Sign in with Facebook
                </FacebookStyle>
              </div>
            </form>
          </li>
        </StyledUL>
      </div>
    );
  }
}

const appDispatch = dispatch => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch)
  };
};

export default withRouter(
  connect(
    null,
    appDispatch
  )(LogIn)
);
