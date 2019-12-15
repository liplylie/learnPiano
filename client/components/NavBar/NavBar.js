// libs
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Tooltip from "react-tooltip";

// local
import LogIn from "../Login/LogIn";
import LogOut from "../LogOut";
import { NavBarLink } from "./NavBarStyle";

class Navbar extends Component {
  state = {
    isTop: true
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      const isNext = window.scrollY > 850;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });
      }
      if (isNext !== this.state.isTop) {
        this.setState({ isTop: true });
      }
    });
  }

  render() {
    return (
      <nav
        className={`navbar navbar-expand-lg ${
          this.state.isTop ? "" : "fade bg-transparent"
        } navbar-dark bg-dark fixed-top wow fadeIn`}
        role="navigation"
        style={{
          transition: "opacity 0.3s ease-out",
          WebkitTransition: "opacity 0.3s ease-out"
        }}
      >
        <div className="container" style={{ maxWidth: "100vw" }}>
          <Link to="/" className="navbar-brand">
            Home
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#exCollapsingNavbar"
          >
            &#9776;
          </button>

          <div className="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/links" className="nav-link">
                  Links
                </Link>
              </li>

              <li
                className="dropdown nav-item"
                style={{
                  display: this.props.authenticated ? "block" : "none"
                }}
              >
                <a data-toggle="dropdown" className="dropdown-toggle nav-link">
                  Mini Games
                </a>

                <ul className="dropdown-menu text-center effect1">
                  <li className="dropdown-item">
                    <Link to="/miniGame1">Mini Game 1</Link>
                  </li>

                  <li className="dropdown-item">
                    <Link to="/miniGame2">Mini Game 2</Link>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/miniGame3"
                      data-tip="miniGame3"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Mini Game 3
                    </NavBarLink>

                    <Tooltip for="miniGame3" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/miniGame4"
                      data-tip="miniGame4"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Mini Game 4
                    </NavBarLink>

                    <Tooltip for="miniGame4" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/miniGame5"
                      data-tip="miniGame5"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Mini Game 5
                    </NavBarLink>

                    <Tooltip for="miniGame5" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>
                </ul>
              </li>

              <li
                className="dropdown nav-item"
                style={{
                  display: this.props.authenticated ? "block" : "none"
                }}
              >
                <a data-toggle="dropdown" className="dropdown-toggle nav-link">
                  Song Collection
                </a>
                <ul className="dropdown-menu text-center effect1">
                  <li className="dropdown-item">
                    <Link to="/SongList/intro">Intro Level Songs</Link>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/SongList/easy"
                      data-tip="easyLevelSong"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Easy Level Songs
                    </NavBarLink>

                    <Tooltip for="easyLevelSong" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/SongList/medium"
                      data-tip="mediumLevelSong"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Medium Level Songs
                    </NavBarLink>

                    <Tooltip for="mediumLevelSong" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>

                  <li className="dropdown-item">
                    <NavBarLink
                      to="/SongList/hard"
                      data-tip="mediumLevelSong"
                      disabled
                      onClick={e => e.preventDefault()}
                    >
                      Hard Level Songs
                    </NavBarLink>

                    <Tooltip for="hardLevelSong" effect="solid" place="left">
                      Coming Soon
                    </Tooltip>
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
              <div
                className="btn-group"
                style={{
                  display: this.props.authenticated ? "block" : "none"
                }}
              >
                <li className="nav-item order-2 order-md-1">
                  <div className="dropdown-toggle nav-link" title="settings">
                    <i
                      className="fa fa-cog fa-fw fa-lg"
                      data-toggle="dropdown"
                    />
                    <ul className="dropdown-menu text-center effect1">
                      <li
                        className="dropdown-item"
                        onClick={() => this.props.history.push("/settings")}
                      >
                        <Link to="/settings">Profile Settings</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>

              <li className="order-1">
                {this.props.authenticated ? (
                  <LogOut authenticated={this.props.authenticated} />
                ) : (
                  <LogIn />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
