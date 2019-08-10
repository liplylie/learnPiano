import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// global
import * as AuthActions from "~/actions/authActions.js";
import { firebaseDB } from "~/firebase";
import { PageContainer } from "~/theme";

// local
import { StyledLink, ProfilePicture } from "./Style";
import LessonTable from "../Table/LessonTable";
import MiniGameTable from "../Table/MiniGameTable";
import IntroSongTable from "../Table/IntroSongTable";

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

  componentWillMount() {
    let that = this;
    let userLessonStatus = firebaseDB.ref(
      "/users/" + this.props.userID + "/lessonsCompleted"
    );
    let userMiniGameStatus = firebaseDB.ref(
      "/users/" + this.props.userID + "/miniGamesCompleted"
    );
    let introSongsStatus = firebaseDB.ref(
      "/users/" + this.props.userID + "/introSongsCompleted"
    );
    userLessonStatus
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          that.setState({ lessonsCompleted: snapshot.val() });
        }
      })
      .catch(err => {
        console.log(err);
      });
    userMiniGameStatus
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          that.setState({ miniGamesCompleted: snapshot.val() });
        }
      })
      .catch(err => {
        console.log(err);
      });
    introSongsStatus
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          that.setState({ introSongsCompleted: snapshot.val() });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  formatAMPM(date) {
    var hours = date[0] + date[1];
    var minutes = date[3] + date[4];
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

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

            <div className="img__wrap">
              <ProfilePicture
                className="span3"
                alt=""
                src={
                  this.props.Auth.picture
                    ? this.props.Auth.picture
                    : require("~/static/defaultUser.png")
                }
                title="Profile Picture"
              />
              <Link to="/settings">
                <p className="img__description">Change Photo</p>
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
            </div>
          </div>

          <div className="col-md-3" style={{ marginRight: "3em" }} />

          <div
            className="col-md-4 text-left wow fadeIn animated lessonList"
            style={{ margin: ".3em" }}
          >
            <StyledLink to="/lessonOne">Lesson One</StyledLink>

            <StyledLink to="/lessonTwo">Lesson Two</StyledLink>

            <StyledLink to="/lessonThree">Lesson Three</StyledLink>

            <StyledLink to="/lessonFour">Lesson Four</StyledLink>

            <StyledLink to="/lessonFive">Lesson Five</StyledLink>
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
    Auth: store.Auth
  };
};

const ProfileDispatch = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(
  ProfileMapStateToProps,
  ProfileDispatch
)(Profile);
