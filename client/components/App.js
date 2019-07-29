import React, { Component } from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { app, firebaseDB } from "../firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AWS, { Config, CognitoIdentityCredentials } from "aws-sdk";
import secret from "../../secret.json";

import * as AuthActions from "../actions/authActions";
import * as LessonsCompletedActions from "../actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "../actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "../actions/introSongsCompletedActions";
import introSongs from "../helpers/introSongs";

import NavBar from "./NavBar";
import Footer from "./Footer";

import PublicRoutes from "../routes/PublicRoutes";
import PrivateRoutes from "../routes/PrivateRoutes";

class App extends Component {
  state = {
    loading: true,
    userID: ""
  };

  componentDidMount() {
    let that = this;
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        that.setState({
          userID: user.uid
        });
        const albumBucketName = secret.BucketName;
        const bucketRegion = secret.AWSRegion;
        const IdentityPoolId = secret.AWSIdentityId;
        AWS.config.update({
          region: bucketRegion,
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
          })
        });

        let userLessonStatus = firebaseDB.ref(
          "/users/" + user.uid + "/lessonsCompleted"
        );
        let userMiniGameStatus = firebaseDB.ref(
          "/users/" + user.uid + "/miniGamesCompleted"
        );
        let userSettings = firebaseDB.ref(
          "/users/" + user.uid + "/userSettings"
        );
        let introSongsStatus = firebaseDB.ref(
          "/users/" + user.uid + "/introSongsCompleted"
        );
        let lessons = {
          lesson1: { completed: false, time: null },
          lesson2: { completed: false, time: null },
          lesson3: { completed: false, time: null },
          lesson4: { completed: false, time: null },
          lesson5: { completed: false, time: null }
        };
        let miniGames = {
          miniGame1: { completed: false, highScore: null },
          miniGame2: { completed: false, highScore: null },
          miniGame3: { completed: false, highScore: null },
          miniGame4: { completed: false, highScore: null },
          miniGame5: { completed: false, highScore: null }
        };

        userLessonStatus.once("value").then(
          snapshot => {
            if (!snapshot.val()) {
              userLessonStatus.update(lessons);
            } else {
              that.props.LessonsCompletedActions.lessonsCompleted(
                snapshot.val()
              );
            }
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );

        userMiniGameStatus.once("value").then(
          snapshot => {
            if (!snapshot.val()) {
              userMiniGameStatus.update(miniGames);
            } else {
              that.props.MiniGamesCompletedActions.miniGamesCompleted(
                snapshot.val()
              );
            }
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );

        let userInfo = {
          name: user.displayName,
          email: user.email,
          userId: user.uid,
          picture: user.photoURL
        };

        userSettings.once("value").then(
          snapshot => {
            if (!snapshot.val()) {
              userSettings.update(userInfo);
              that.props.AuthActions.userLoginInfo(userInfo);
            } else {
              that.props.AuthActions.userLoginInfo(snapshot.val());
            }
          },
          errorObject => {
            console.log("The read failed: " + errorObject.code);
          }
        );

        introSongsStatus.once("value").then(snapshot => {
          if (snapshot.val()) {
            that.props.IntroSongsCompletedActions.introSongsCompleted(
              snapshot.val()
            );
          } else {
            introSongsStatus.update(introSongs);
            this.props.IntroSongsCompletedActions.introSongsCompleted(
              introSongs
            );
          }
        });

        this.setState({ loading: false });
      } else {
        console.log("fail");
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    const authenticated = this.props.online;
    console.log(this.props, "app props");
    return (
      <BrowserRouter>
        <div className="main" style={{ display: "flex" }}>
          <NavBar authenticated={authenticated} />

          <div style={{ flexDirection: "row", flex: 1 }}>
            <Switch>
              {!authenticated ? (
                <PublicRoutes />
              ) : (
                <PrivateRoutes
                  authenticated={authenticated}
                  loading={this.state.loading}
                  userID={this.state.userID}
                />
              )}

              <Route
                render={() => {
                  return (
                    <div
                      className="row"
                      style={{
                        backgroundColor: "lightpink",
                        height: "100vh",
                        minWidth: "100vw",
                        flex: 1
                      }}
                    >
                      <div className="col align-self-center">
                        <div style={{ textAlign: "center" }}>
                          <h1>Error 404 Page Not Found</h1>
                          <p> Or page is still in development </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const appMapStateToProps = store => {
  return {
    online: store.Auth.online
  };
};

const appDispatch = dispatch => {
  return {
    AuthActions: bindActionCreators(AuthActions, dispatch),
    LessonsCompletedActions: bindActionCreators(
      LessonsCompletedActions,
      dispatch
    ),
    MiniGamesCompletedActions: bindActionCreators(
      MiniGamesCompletedActions,
      dispatch
    ),
    IntroSongsCompletedActions: bindActionCreators(
      IntroSongsCompletedActions,
      dispatch
    )
  };
};

export default connect(
  appMapStateToProps,
  appDispatch
)(App);
