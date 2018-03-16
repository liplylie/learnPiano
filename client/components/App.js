import React, { Component } from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { app, firebaseDB } from "../firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk'
import secret from '../../secret.json'

import * as AuthActions from "../actions/authActions";
import * as LessonsCompletedActions from "../actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "../actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "../actions/introSongsCompletedActions";
import introSongsList from "../helpers/introSongs"


import About from "./About";
import Links from "./Links";
import PrivacyPolicy from "./privacyPolicy";
import NavBar from "./NavBar";
import ProfileSettings from "./ProfileSettings";
import DefaultHome from "./DefaultHome";
import Footer from "./Footer";
import Profile from "./Profile";

import LessonOne from "./Lessons/LessonOne";
import LessonTwo from "./Lessons/LessonTwo";
import LessonThree from "./Lessons/LessonThree";

import MiniGameOne from "./MiniGames/MiniGameOne";
import MiniGameTwo from "./MiniGames/MiniGameTwo";

import IntroSongList from "./IntroSongs/IntroSongList";
import CreateIntroSong from "./IntroSongs/CreateIntroSong"
import AuClairDeLaLune from "./IntroSongs/AuClairDeLaLune"
import AuraLee from "./IntroSongs/AuraLee"
import GoodKingWenceslas from "./IntroSongs/GoodKingWenceslas"
import GoTellAuntRhody from "./IntroSongs/GoTellAuntRhody"
import FrogSong from "./IntroSongs/FrogSong"
import HotCrossBuns from "./IntroSongs/HotCrossBuns"
import LightlyRow from"./IntroSongs/LightlyRow"
import LoveSomebody from"./IntroSongs/LoveSomebody"
import JingleBells from"./IntroSongs/JingleBells"
import MaryHadLamb from "./IntroSongs/MaryHadLamb"
import Musette from "./IntroSongs/Musette"
import NewWorldSymphony from "./IntroSongs/NewWorldSymphony"
import OatsAndBeans from "./IntroSongs/OatsAndBeans"
import OdeToJoy from "./IntroSongs/OdeToJoy"
import SaintsGoMarchin from "./IntroSongs/SaintsGoMarchin"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userID: ""
    };
  }

  componentWillMount() {
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
        let introSongs = introSongsList

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

        introSongsStatus.once("value").then(
          snapshot => {
            if (snapshot.val()) {
              that.props.IntroSongsCompletedActions.introSongsCompleted(snapshot.val())
            } else {
              introSongsStatus.update(introSongs)
              this.props.IntroSongsCompletedActions.introSongsCompleted(introSongs)
            }
          })

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
    console.log(this.props, "app props");
    return (
      <BrowserRouter>
        <div className="main" style={{ display: "flex" }}>
          <NavBar authenticated={this.props.online} />
          <div style={{ flexDirection: "row", flex: 1 }}>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <DefaultHome authenticated={this.props.online} />
                )}
              />
              <Route exact path="/about" component={() => <About />} />
              <Route exact path="/links" component={() => <Links />} />
              <Route
                exact
                path="/privacyPolicy"
                component={() => <PrivacyPolicy />}
              />
              <Route
                exact
                path="/profile"
                component={() => (
                  <Profile
                    authenticated={this.props.online}
                    loading={this.state.loading}
                    userID={this.state.userID}
                  />
                )}
              />
              <Route
                exact
                path="/settings"
                component={() => (
                  <ProfileSettings
                    authenticated={this.props.online}
                    loading={this.state.loading}
                  />
                )}
              />
              <Route
                exact
                path="/lessonOne"
                component={() => (
                  <LessonOne authenticated={this.props.online} />
                )}
              />
              <Route
                exact
                path="/lessonTwo"
                component={() => (
                  <LessonTwo authenticated={this.props.online} />
                )}
              />
              <Route
                exact
                path="/lessonThree"
                component={() => (
                  <LessonThree authenticated={this.props.online} />
                )}
              />
              <Route
                exact
                path="/miniGame1"
                component={() => (
                  <MiniGameOne authenticated={this.props.online} />
                )}
              />
              <Route
                exact
                path="/miniGame2"
                component={() => (
                  <MiniGameTwo authenticated={this.props.online} />
                )}
              />
               <Route
                exact
                path="/SongList/intro"
                component={() => (
                  <IntroSongList authenticated={this.props.online} />
                )}
              />
              <Route
                exact
                path="/SongList/intro/AuClairDeLaLune"
                component={() => (
                  <AuClairDeLaLune />
                )}
              />
              <Route
                exact
                path="/SongList/intro/AuraLee"
                component={() => (
                  <AuraLee />
                )}
              />
              <Route
                exact
                path="/SongList/intro/FrogSong"
                component={() => (
                  <CreateIntroSong songName={FrogSong.songName} lessonNotes={FrogSong.lessonNotes} songHeading={FrogSong.songHeading} />
                )}
              />
              <Route
                exact
                path="/SongList/intro/HotCrossBuns"
                component={() => (
                  <HotCrossBuns />
                )}
              />
              <Route
                exact
                path="/SongList/intro/GoodKingWenceslas"
                component={() => (
                  <GoodKingWenceslas />
                )}
              />
              <Route
                exact
                path="/SongList/intro/GoTellAuntRhody"
                component={() => (
                  <CreateIntroSong songName={GoTellAuntRhody.songName} lessonNotes={GoTellAuntRhody.lessonNotes} songHeading={GoTellAuntRhody.songHeading} />
                )}
              />
              <Route
                exact
                path="/SongList/intro/JingleBells"
                component={() => (
                  <JingleBells />
                )}
              />
              <Route
                exact
                path="/SongList/intro/LightlyRow"
                component={() => (
                  <LightlyRow />
                )}
              />
              <Route
                exact
                path="/SongList/intro/LoveSomebody"
                component={() => (
                  <LoveSomebody />
                )}
              />
               <Route
                exact
                path="/SongList/intro/MaryHadLamb"
                component={() => (
                  <MaryHadLamb />
                )}
              />
              <Route
                exact
                path="/SongList/intro/Musette"
                component={() => (
                  <Musette />
                )}
              />
               <Route
                exact
                path="/SongList/intro/NewWorldSymphony"
                component={() => (
                  <NewWorldSymphony />
                )}
              />
              <Route
                exact
                path="/SongList/intro/OdeToJoy"
                component={() => (
                  <OdeToJoy />
                )}
              />
              <Route
                exact
                path="/SongList/intro/OatsAndBeans"
                component={() => (
                  <CreateIntroSong songName={OatsAndBeans.songName} lessonNotes={OatsAndBeans.lessonNotes} songHeading={OatsAndBeans.songHeading} />
                )}
              />
              <Route
                exact
                path="/SongList/intro/SaintsGoMarchin"
                component={() => (
                  <SaintsGoMarchin />
                )}
              />
               <Route
                exact
                path="/SongList/intro/Sample"
                component={() => (
                  <CreateIntroSong songName="Sample" lessonNotes={"C4 C4 D4 E4".split(" ")} songHeading="Sample" />
                )}
              />
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

export default connect(appMapStateToProps, appDispatch)(App);
