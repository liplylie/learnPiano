import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { app } from "../firebase";
import * as AuthActions from "../actions/authActions.js";

class LogOut extends Component {
  handleClick = () => {
    app
      .auth()
      .signOut()
      .then(user => {
        this.props.actions.logOutAction(false);
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        <button
          type="button"
          id="signOut"
          onClick={() => this.handleClick()}
          className="btn btn-outline-secondary"
        >
          <img
            src={
              this.props.picture
                ? this.props.picture
                : require("../static/defaultUser.png")
            }
            style={{
              height: "1.5em",
              width: "1.5em",
              paddingRight: "5px",
              objectFit: "contain"
            }}
            alt=""
          />
          Log Out
        </button>
      </div>
    );
  }
}

const LogOutMapStateToProps = store => {
  return {
    online: store.Auth.online,
    picture: store.Auth.picture
  };
};

const LogOutDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default withRouter(
  connect(
    LogOutMapStateToProps,
    LogOutDispatch
  )(LogOut)
);
