// libs
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PulseLoader } from "react-spinners";
import Popup from "react-popup";
import $ from "jquery";
import { isBrowser } from "react-device-detect";

// global
import { app, facebookProvider } from "~/firebase";

// reducers
import * as AuthActions from "~/actions/authActions";

// local
import { StyledUL, FacebookStyle, NoAccount } from "./LoginStyle";

class LogIn extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    $(".dropdown-menu").click(function(e) {
      if (e.target !== e.currentTarget) return;

      e.stopPropagation();
    });
  }

  authWithFacebook = () => {
    if (!isBrowser) {
      Popup.alert("Please log in using a desktop");
      return;
    }

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
    if (!isBrowser) {
      Popup.alert("Please log in using a desktop");
      return;
    }

    this.setState({ isLoading: true });

    const email = document.getElementById("emailInput").value;
    const pw = document.getElementById("passwordInput").value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        this.setState({ isLoading: false });
        if (providers.length === 0) {
          Popup.alert("Please create an account");
          return;
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
                  Log In
                </button>
              </div>

              {/* <div className="form-group text-xs-center">
                <small>
                  <a>Forgot password?</a>
                </small>
              </div> */}

              <FacebookStyle
                className="btn btn-lg btn-social btn-facebook"
                onClick={() => {
                  this.authWithFacebook();
                }}
              >
                <i className="fa fa-facebook fa-fw" /> Sign in with Facebook
              </FacebookStyle>

              <NoAccount className="form-group text-xs-center">
                <small onClick={() => this.props.history.push("/signup")}>
                  <a>No account? Sign Up.</a>
                </small>
              </NoAccount>
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
