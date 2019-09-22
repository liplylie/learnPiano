import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AWS, { Config, CognitoIdentityCredentials } from "aws-sdk";

// reducers
import * as AuthActions from "~/actions/authActions";
import * as LessonsCompletedActions from "~/actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "~/actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "~/actions/introSongsCompletedActions";
import introSongs from "~/helpers/introSongs";
import { app, firebaseDB } from "~/firebase";

// components
import NavBar from "./NavBar";
import Footer from "./Footer";

// routes
import PublicRoutes from "~/routes/PublicRoutes";
import PrivateRoutes from "~/routes/PrivateRoutes";

import secret from "../../secret.json";

class App extends Component {
  state = {
    loading: true,
    userID: ""
  };

  componentDidMount() {
    let that = this;
    const authenticated = this.props.online;
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

        if (!authenticated) {
          this.getUserSettings(user);
        }

        this.setState({ loading: false });
      }
    });
  }

  getUserLessonStatus = user => {
    let that = this;

    const lessons = {
      lessonOne: { completed: false, time: null },
      lessonTwo: { completed: false, time: null },
      lessonThree: { completed: false, time: null },
      lessonFour: { completed: false, time: null },
      lessonFive: { completed: false, time: null }
    };
    const userLessonStatus = firebaseDB.ref(
      "/users/" + user.uid + "/lessonsCompleted"
    );
    userLessonStatus.once("value").then(
      snapshot => {
        if (!snapshot.val()) {
          userLessonStatus.update(lessons);
        } else {
          that.props.LessonsCompletedActions.lessonsCompleted(snapshot.val());
        }
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  getUserSettings = user => {
    let that = this;

    const userSettings = firebaseDB.ref("/users/" + user.uid + "/userSettings");
    const userInfo = {
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
  };

  getIntroSongsStatus = user => {
    let that = this;

    const introSongsStatus = firebaseDB.ref(
      "/users/" + user.uid + "/introSongsCompleted"
    );
    introSongsStatus.once("value").then(snapshot => {
      if (snapshot.val()) {
        that.props.IntroSongsCompletedActions.introSongsCompleted(
          snapshot.val()
        );
      } else {
        introSongsStatus.update(introSongs);
        this.props.IntroSongsCompletedActions.introSongsCompleted(introSongs);
      }
    });
  };

  getMiniGameStatus = user => {
    let that = this;

    const userMiniGameStatus = firebaseDB.ref(
      "/users/" + user.uid + "/miniGamesCompleted"
    );

    const miniGames = {
      miniGame1: { completed: false, highScore: null },
      miniGame2: { completed: false, highScore: null },
      miniGame3: { completed: false, highScore: null },
      miniGame4: { completed: false, highScore: null },
      miniGame5: { completed: false, highScore: null }
    };
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
  };

  componentWillUnmount() {
    this.removeAuthListener();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.online !== this.props.online;
  }

  render() {
    const authenticated = this.props.online;
    return (
      <BrowserRouter>
        <div className="main" style={{ display: "flex" }}>
          <NavBar authenticated={authenticated} />

          <div style={{ flexDirection: "row", flex: 1 }}>
            {!authenticated ? (
              <>
                <PublicRoutes />
              </>
            ) : (
              <>
                <PrivateRoutes
                  authenticated={authenticated}
                  loading={this.state.loading}
                  userID={this.state.userID}
                />
              </>
            )}
            {/* <Footer /> */}
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
