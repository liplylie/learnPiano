import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// global
import { firebaseDB } from "~/firebase";
import { PageContainer } from "~/theme";
import introSongs from "~/helpers/introSongs";
import * as secret from "../../../secret.json";

// reducers
import * as AuthActions from "~/actions/authActions.js";
import * as LessonsCompletedActions from "~/actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "~/actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "~/actions/introSongsCompletedActions";

// local
import {
  StyledLink,
  ProfilePicture,
  ChangePhoto,
  PhotoWrappper
} from "./Style";
import LessonTable from "../../components/Table/LessonTable";
import MiniGameTable from "../../components/Table/MiniGameTable";
import IntroSongTable from "../../components/Table/IntroSongTable";

class Profile extends Component {
  state = {
    lessonsCompleted: {
      lesson1: false,
      lesson2: false,
      lesson3: false,
      lesson4: false,
      lesson5: false
    },
    miniGamesCompleted: {
      miniGame1: false,
      miniGame2: false,
      miniGame3: false,
      miniGame4: false,
      miniGame5: false
    },
    introSongsCompleted: {
      AuClairDeLaLune: false,
      AuraLee: false,
      GoodKingWenceslas: false,
      HotCrossBuns: false,
      LightlyRow: false,
      LoveSomebody: false,
      Musette: false,
      NewWorldSymphony: false,
      OdeToJoy: false,
      SaintsGoMarchin: false
    }
  };

  componentDidMount() {
    this.getMiniGameStatus();
    this.getIntroSongsStatus();
    this.getUserLessonStatus();
  }

  getUserLessonStatus = () => {
    let that = this;
    const { Auth } = this.props;

    const userLessonStatus = firebaseDB.ref(
      "/users/" + Auth.userId + "/lessonsCompleted"
    );
    const lessons = {
      lesson1: { completed: false, time: null },
      lesson2: { completed: false, time: null },
      lesson3: { completed: false, time: null },
      lesson4: { completed: false, time: null },
      lesson5: { completed: false, time: null }
    };

    userLessonStatus.once("value").then(
      snapshot => {
        if (!snapshot.val()) {
          userLessonStatus.update(lessons);
        } else {
          that.setState({
            lessonsCompleted: snapshot.val()
          });

          that.props.LessonsCompletedActions.lessonsCompleted(snapshot.val());
        }
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  getIntroSongsStatus = () => {
    const { Auth } = this.props;
    let that = this;
    const introSongsStatus = firebaseDB.ref(
      "/users/" + Auth.userId + "/introSongsCompleted"
    );
    introSongsStatus.once("value").then(snapshot => {
      if (snapshot.val()) {
        that.setState({
          introSongsCompleted: snapshot.val()
        });

        that.props.IntroSongsCompletedActions.introSongsCompleted(
          snapshot.val()
        );
      } else {
        introSongsStatus.update(introSongs);
        this.props.IntroSongsCompletedActions.introSongsCompleted(introSongs);
      }
    });
  };

  getMiniGameStatus = () => {
    const { Auth } = this.props;
    let that = this;
    const userMiniGameStatus = firebaseDB.ref(
      "/users/" + Auth.userId + "/miniGamesCompleted"
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
          that.setState({
            miniGamesCompleted: snapshot.val()
          });

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

  render() {
    const {
      lessonsCompleted,
      miniGamesCompleted,
      introSongsCompleted
    } = this.state;

    if (this.props.loading && this.props.online) {
      return (
        <div style={{ height: "100vh", padding: "10em" }}>
          <div className="loader" />
        </div>
      );
    }

    if (!this.props.Auth.online) {
      return <Redirect to="/" />;
    }
    return (
      <PageContainer className="effect8">
        <div className="row">
          <div className="col-md-1" />

          <div className="col-md-3">
            <div className="row" style={{ margin: "0.3em" }} />

            <PhotoWrappper>
              <ProfilePicture
                className="span3"
                alt=""
                src={
                  this.props.Auth.picture
                    ? this.props.Auth.picture
                    : `${secret.SampleUrl}/static/defaultUser.png`
                }
                title="Profile Picture"
              />
              <Link to="/settings">
                <ChangePhoto>Change Photo</ChangePhoto>
              </Link>

              <div className="text-center">
                <span
                  style={{
                    fontFamily: "helvetica",
                    fontSize: "2em"
                  }}
                >
                  {this.props.Auth.name
                    ? this.props.Auth.name
                    : this.props.Auth.email}
                </span>
              </div>
            </PhotoWrappper>
          </div>

          <div className="col-md-3" style={{ marginRight: "3em" }} />

          <div
            className="col-md-4 text-left wow fadeIn animated lessonList"
            style={{ margin: ".3em" }}
          >
            <StyledLink to="/lesson1">Lesson One</StyledLink>

            <StyledLink to="/lesson2">Lesson Two</StyledLink>

            <StyledLink to="/lesson3">Lesson Three</StyledLink>

            <StyledLink to="/lesson4">Lesson Four</StyledLink>

            <StyledLink to="/lesson5">Lesson Five</StyledLink>
          </div>
        </div>

        <div className="row wow fadeIn animated">
          <div className="col-md-11" style={{ margin: "auto" }}>
            <LessonTable lessonsCompleted={lessonsCompleted} />

            <MiniGameTable miniGamesCompleted={miniGamesCompleted} />

            <IntroSongTable introSongsCompleted={introSongsCompleted} />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const ProfileMapStateToProps = store => {
  return {
    Auth: store.Auth,
    IntroSongsCompleted: store.IntroSongsCompleted,
    LessonsCompleted: store.LessonsCompleted,
    MiniGamesCompleted: store.MiniGamesCompleted
  };
};

const ProfileDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
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
  ProfileMapStateToProps,
  ProfileDispatch
)(Profile);
