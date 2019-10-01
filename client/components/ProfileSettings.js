import React, { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { app, firebaseDB } from "../firebase";
import AWS from "aws-sdk";
import secret from "../../secret.json";
import Popup from "react-popup";
import $ from "jquery";

// reducers
import * as AuthActions from "~/actions/authActions";
import * as LessonsCompletedActions from "~/actions/lessonsCompletedActions";
import * as MiniGamesCompletedActions from "~/actions/miniGamesCompletedActions";
import * as IntroSongsCompletedActions from "~/actions/introSongsCompletedActions";

// global
import introSongsList from "~/helpers/introSongs";
import { PageContainer } from "~/theme";

// local
import { StyledTable } from "~/components/Table/Style";

class ProfileSettings extends Component {
  state = {
    showIntroSongsStatus: false,
    showLessonStatus: false,
    showMiniGameStatus: false,
    showChangeName: false,
    showChangePicture: false,
    showLessonStatus: false,
    showIntroSongsStatus: false,
    files: ""
  };

  count = 0;

  changeName = event => {
    event.preventDefault();
    let newName = document.getElementById("newName").value;
    let userInfo = {
      name: newName,
      email: this.props.profile.email,
      userId: this.props.profile.userId,
      picture: this.props.profile.picture
    };
    let userSettings = firebaseDB.ref(
      "/users/" + this.props.profile.userId + "/userSettings"
    );
    userSettings.once("value").then(
      snapshot => {
        userSettings.update(userInfo);
      },
      errorObject => {
        alert("The read failed: " + errorObject.code);
      }
    );
    this.props.AuthActions.userLoginInfo(userInfo);
  };

  toggleChangeName = () => {
    this.setState({ showChangeName: !this.state.showChangeName });
  };

  toggleChangePicture = () => {
    let { showChangePicture } = this.state;
    let that = this;
    console.log(this.files, "files");
    this.setState({ showChangePicture: !showChangePicture });
  };

  addPhoto = e => {
    const files = e.target.files;
    let that = this;
    const IdentityPoolId = secret.AWSIdentityId;
    const bucketRegion = secret.AWSRegion;

    let s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      region: "us-west-1",
      params: { Bucket: secret.BucketName },
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    let file = files[0];
    let fileName = file.name;
    let albumPhotosKey =
      encodeURIComponent("pictures") + "/" + this.props.profile.userId + "/";
    let photoKey = albumPhotosKey + fileName;
    s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      (err, data) => {
        if (err) {
          this.setState({ showChangePicture: false });

          return alert(
            "There was an error uploading your photo: " + err.message
          );
        }
        let userInfo = {
          name: this.props.profile.name,
          email: this.props.profile.email,
          userId: this.props.profile.userId,
          picture: data.Location
        };
        that.props.AuthActions.userLoginInfo(userInfo);
        let userSettings = firebaseDB.ref(
          "/users/" + this.props.profile.userId + "/userSettings"
        );
        this.setState({ showChangePicture: true });

        userSettings.once("value").then(
          snapshot => {
            userSettings.update(userInfo);
          },
          errorObject => {
            alert("The read failed: " + errorObject.code);
          }
        );
      }
    );
  };

  resetLessonsSettings = () => {
    let that = this;
    let userLessonStatus = firebaseDB.ref(
      "/users/" + this.props.profile.userId + "/lessonsCompleted"
    );
    let lessons = {
      lesson1: { completed: false, time: null },
      lesson2: { completed: false, time: null },
      lesson3: { completed: false, time: null },
      lesson4: { completed: false, time: null },
      lesson5: { completed: false, time: null }
    };

    userLessonStatus.once("value").then(
      snapshot => {
        userLessonStatus.update(lessons);
        that.props.LessonsCompletedActions.lessonsCompleted(lessons);
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  resetIntroSongsSettings = () => {
    let that = this;
    let introSongsStatus = firebaseDB.ref(
      "/users/" + this.props.profile.userId + "/introSongsCompleted"
    );
    let introSongs = introSongsList;
    introSongsStatus.once("value").then(
      snapshot => {
        introSongsStatus.update(introSongs);
        that.props.IntroSongsCompletedActions.introSongsCompleted(introSongs);
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  resetMiniGameSettings = () => {
    let that = this;
    let userMiniGameStatus = firebaseDB.ref(
      "/users/" + this.props.profile.userId + "/miniGamesCompleted"
    );
    let miniGames = {
      miniGame1: { completed: false, highScore: null },
      miniGame2: { completed: false, highScore: null },
      miniGame3: { completed: false, highScore: null },
      miniGame4: { completed: false, highScore: null },
      miniGame5: { completed: false, highScore: null }
    };

    userMiniGameStatus.once("value").then(
      snapshot => {
        userMiniGameStatus.update(miniGames);
        that.props.MiniGamesCompletedActions.miniGamesCompleted(miniGames);
      },
      errorObject => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  toggleMiniGameStatus = () => {
    this.setState({
      showMiniGameStatus: !this.state.showMiniGameStatus
    });
  };

  toggleLessonStatus = () => {
    this.setState({ showLessonStatus: !this.state.showLessonStatus });
  };

  toggleIntroSongsStatus = () => {
    this.setState({ showIntroSongsStatus: !this.state.showIntroSongsStatus });
  };

  deleteMiniGameStatus = () => {
    let that = this;
    let miniGamePopup = Popup.create({
      title: null,
      content: "Are you sure that you want to delete your Mini Game Data?",
      buttons: {
        left: [
          {
            text: "No",
            className: "danger",
            action: () => {
              Popup.alert("Your data will not be deleted");
              Popup.close();
            }
          }
        ],
        right: [
          {
            text: "Yes",
            key: "enter",
            action: () => {
              that.resetMiniGameSettings();
              Popup.alert("Your data is deleted");
              Popup.close();
            }
          }
        ]
      }
    });
  };

  deleteLessonStatus = () => {
    let that = this;
    let lessonPopup = Popup.create({
      title: null,
      content: "Are you sure that you want to delete your Lesson Data?",
      buttons: {
        left: [
          {
            text: "No",
            className: "danger",
            action: () => {
              Popup.alert("Your data will not be deleted");
              Popup.close();
            }
          }
        ],
        right: [
          {
            text: "Yes",
            key: "enter",
            action: () => {
              that.resetLessonsSettings();
              Popup.alert("Your data is deleted");
              Popup.close();
            }
          }
        ]
      }
    });
  };

  deleteIntroSongsStatus = () => {
    let that = this;
    let lessonPopup = Popup.create({
      title: null,
      content: "Are you sure that you want to delete your Intro Song Data?",
      buttons: {
        left: [
          {
            text: "No",
            className: "danger",
            action: () => {
              Popup.alert("Your data will not be deleted");
              Popup.close();
            }
          }
        ],
        right: [
          {
            text: "Yes",
            key: "enter",
            action: () => {
              that.resetIntroSongsSettings();
              Popup.alert("Your data is deleted");
              Popup.close();
            }
          }
        ]
      }
    });
  };

  changeNameTR = () => {
    const { showChangeName } = this.state;
    return (
      <tr
        style={{ border: "none" }}
        onClick={showChangeName ? this.toggleChangeName : null}
      >
        <th style={{ border: "none" }}>Name</th>

        <td style={{ color: "grey", border: "none" }}>
          {this.props.profile.name ? this.props.profile.name : "Not Set"}
        </td>

        {!showChangeName ? (
          <>
            <td
              id="changeName"
              style={showChangeName ? { display: "none" } : { border: "none" }}
              onClick={e =>
                !showChangeName ? this.toggleChangeName() : e.stopPropagation()
              }
            >
              <span style={{ color: "#365899", textAlign: "center" }}>
                Edit
              </span>
            </td>
          </>
        ) : (
          <td
            id="showChangeName"
            style={{ display: "block", border: "none" }}
            onClick={e => e.stopPropagation()}
          >
            <form
              onSubmit={event => {
                event.preventDefault;
                this.changeName(event);
              }}
            >
              <input
                id="newName"
                type="name"
                placeholder="Enter new name"
                required
              />
              <input type="submit" className="btn-info" placeholder="submit" />
            </form>
          </td>
        )}
      </tr>
    );
  };

  emailTR = () => {
    return (
      <tr style={{ border: "none" }}>
        <th style={{ border: "none" }}>Email</th>
        <td style={{ border: "none", color: "grey" }}>
          {this.props.profile.email}
        </td>
        <td style={{ border: "none" }} />
      </tr>
    );
  };

  changePictureTR = () => {
    const { showChangePicture } = this.state;
    return (
      <tr
        onClick={showChangePicture ? this.toggleChangePicture : null}
        style={{ border: "none" }}
      >
        <th style={{ border: "none" }}>Picture</th>

        <td style={{ border: "none" }}>
          <img
            alt=""
            src={
              this.props.profile.picture
                ? this.props.profile.picture
                : require("../static/defaultUser.png")
            }
            style={{
              height: "10em",
              width: "10em",
              objectFit: "contain"
            }}
            className="effect8"
          />
        </td>

        {!showChangePicture ? (
          <td
            id="changePicture"
            style={{ border: "none" }}
            onClick={this.toggleChangePicture}
          >
            <span style={{ color: "#365899", textAlign: "center" }}>Edit</span>
          </td>
        ) : (
          <td
            id="showChangePicture"
            style={{
              border: "none",
              width: "20em"
            }}
            onClick={e => e.stopPropagation()}
          >
            <label className="custom-file">
              <input
                type="file"
                id="photoupload"
                accept=".jpg, .jpeg, .png, .gif, .pdf"
                className="custom-file-input"
                required
                // value={this.state.files}
                onChange={this.addPhoto}
              />
              <span className="custom-file-control" id="upload-file-info" />
            </label>
          </td>
        )}
      </tr>
    );
  };

  changeMiniGameTR = () => {
    const { showMiniGameStatus } = this.state;

    const miniGamesNum = Object.values(this.props.miniGames).filter(game => {
      return game.completed !== false;
    });

    return (
      <tr onClick={showMiniGameStatus ? this.toggleMiniGameStatus : null}>
        <th style={{ border: "none" }}>Mini Games </th>

        <td style={{ border: "none", color: "grey" }}>
          Completed: {miniGamesNum.length}
        </td>

        {!showMiniGameStatus ? (
          <td
            id="showMiniGameStatus"
            style={{ border: "none" }}
            onClick={this.toggleMiniGameStatus}
          >
            <span
              style={
                showMiniGameStatus
                  ? { display: "none" }
                  : {
                      color: "#365899",
                      textAlign: "center",
                      border: "none"
                    }
              }
            >
              Edit
            </span>
          </td>
        ) : (
          <td
            id="miniGameButton"
            style={{ display: "block", border: "none" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="btn btn-primary"
              onClick={() => {
                this.deleteMiniGameStatus();
              }}
            >
              Delete Mini Games Status
            </button>
          </td>
        )}
      </tr>
    );
  };

  changeLessonTR = () => {
    const { showLessonStatus } = this.state;
    const lessonNum = Object.values(this.props.lessons).filter(lesson => {
      return lesson.completed !== false;
    });

    return (
      <tr
        style={{ border: "none" }}
        onClick={showLessonStatus ? this.toggleLessonStatus : null}
      >
        <th style={{ border: "none" }}>Lessons</th>

        <td style={{ border: "none", color: "grey" }}>
          Completed: {lessonNum.length}
        </td>

        {!showLessonStatus ? (
          <td
            id="showLessonStatus"
            style={{ border: "none" }}
            onClick={this.toggleLessonStatus}
          >
            <span style={{ color: "#365899", textAlign: "center" }}>Edit</span>
          </td>
        ) : (
          <td id="lessonButton" style={{ border: "none" }}>
            <button
              className="btn btn-primary"
              onClick={e => {
                e.stopPropagation();
                this.deleteLessonStatus();
              }}
            >
              Delete Lessons Status
            </button>
          </td>
        )}
      </tr>
    );
  };

  changeIntroSongTR = () => {
    const { showIntroSongsStatus } = this.state;
    const introSongsNum = Object.values(this.props.introSongs).filter(song => {
      return song !== false;
    });

    return (
      <tr
        style={{ border: "none" }}
        onClick={showIntroSongsStatus ? this.toggleIntroSongsStatus : null}
      >
        <th style={{ border: "none" }}>Intro Songs</th>

        <td style={{ border: "none", color: "grey" }}>
          Completed: {introSongsNum.length}
        </td>

        {!showIntroSongsStatus ? (
          <td
            id="showIntroSongsStatus"
            style={{ border: "none" }}
            onClick={this.toggleIntroSongsStatus}
          >
            <span style={{ color: "#365899", textAlign: "center" }}>Edit</span>
          </td>
        ) : (
          <td id="introSongsButton" style={{ border: "none" }}>
            <button
              className="btn btn-primary"
              onClick={e => {
                e.stopPropagation();
                this.deleteIntroSongsStatus();
              }}
            >
              Delete Intro Songs Status
            </button>
          </td>
        )}
      </tr>
    );
  };

  render() {
    return (
      <PageContainer className="effect8 fadeIn">
        <Popup />

        <div className="col-md-12 text" style={{ textAlign: "center" }}>
          <h1>Profile Settings</h1>
        </div>

        <div className="row" style={{ margin: "auto", padding: "1em" }}>
          <div className="col-md-12">
            <StyledTable
              id="settingTable"
              className="table table-hover effect8"
              style={{ border: "none" }}
            >
              <tbody>
                {this.changeNameTR()}

                {this.emailTR()}

                {this.changePictureTR()}

                {this.changeMiniGameTR()}

                {this.changeLessonTR()}

                {this.changeIntroSongTR()}
              </tbody>
            </StyledTable>
          </div>
        </div>
      </PageContainer>
    );
  }
}

const profileSettingsMapStateToProps = store => {
  return {
    profile: store.Auth,
    miniGames: store.MiniGamesCompleted,
    lessons: store.LessonsCompleted,
    introSongs: store.IntroSongsCompleted
  };
};

const profileSettingsDispatch = dispatch => {
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

export default withRouter(
  connect(
    profileSettingsMapStateToProps,
    profileSettingsDispatch
  )(ProfileSettings)
);
