import React, { useState } from "react";
import Popup from "react-popup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PulseLoader } from "react-spinners";

// global
import { PageContainer } from "~/theme";
import { app, facebookProvider } from "~/firebase";

// reducers
import * as AuthActions from "~/actions/authActions";

// local
import { FacebookStyle } from "~/components/Login/LoginStyle";

const Signup = ({ AuthActions, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, changeLoading] = useState(false);

  const authWithFacebook = () => {
    changeLoading(true);

    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        changeLoading(false);

        if (error) {
          Popup.alert(error.message);
        } else {
          history.push("/");
        }
      })
      .catch(err => {
        Popup.alert(error.message);
        console.error("error with login", err.message);
        changeLoading(false);
      });
  };

  const authWithEmailPassword = event => {
    event.preventDefault();

    changeLoading(true);

    if (passwordMatch()) {
      app
        .auth()
        .fetchProvidersForEmail(email)
        .then(providers => {
          changeLoading(false);

          if (providers.length === 0) {
            app
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => {
                const userInfo = {
                  name: user.displayName,
                  email: user.email,
                  userId: user.uid,
                  picture: user.photoURL
                };
                AuthActions.userLoginInfo(userInfo);
                history.push("/");
              });
          } else {
            Popup.alert("There is already an account with this email");
          }
        })
        .catch(err => {
          console.error("error with login", err);
          changeLoading(false);

          Popup.alert(err.message);
        });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const passwordMatch = () => {
    if (!password) {
      Popup.alert("Please enter a password");
      changeLoading(false);

      return false;
    }

    if (!confirmPassword) {
      Popup.alert("Please confirm password");
      changeLoading(false);

      return false;
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        Popup.alert("Passwords do no match");
        changeLoading(false);

        return false;
      }

      if (password.length < 6) {
        Popup.alert("Password needs to be more than 6 characters");
        changeLoading(false);

        return false;
      }
    }
    return true;
  };

  return (
    <PageContainer className="effect8">
      <Popup />

      <div className="row">
        <div className="col-md-12 text-center" style={{ fontSize: "2em" }}>
          <h1>Sign up</h1>

          <form className="form" role="form">
            <div className="form-group">
              <span>Email:</span>

              <input
                id="email"
                placeholder="Email"
                className=" form-control"
                type="email"
                required={true}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <p>Password:</p>

              <input
                id="password"
                placeholder="Password"
                className="form-control"
                type="password"
                required=""
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <p>Confirm Password:</p>

              <input
                id="password-confirm"
                placeholder="Confirm Password"
                className=" form-control"
                type="password"
                required=""
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-lg"
                style={{ cursor: "pointer" }}
                onClick={event => {
                  event.preventDefault;
                  authWithEmailPassword(event);
                }}
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
                  <>Sign Up</>
                )}
              </button>
            </div>

            <FacebookStyle
              className="btn btn-lg btn-social btn-facebook"
              onClick={() => {
                authWithFacebook();
              }}
            >
              <i className="fa fa-facebook fa-fw" /> Sign up with Facebook
            </FacebookStyle>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

const appDispatch = dispatch => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch)
  };
};

export default withRouter(
  connect(
    null,
    appDispatch
  )(Signup)
);
