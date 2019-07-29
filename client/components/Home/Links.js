import React, { Component } from "react";

const Links = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        overflowY: "scroll"
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "100vh",
          margin: "auto",
          backgroundColor: "white",
          flex: 1,
          overflowX: "scroll"
        }}
        className="effect8 wow fadeIn"
      >
        <div className="row" style={{ height: "7em" }} />
        <div className="col-md-12">
          <h1>Links</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>
              <a href="https://virtualpiano.net/" target="_blank">
                Online Piano
              </a>{" "}
              Click on this link if you prefer to you use a different online
              piano hosted by virtualpiano.net. Have the piano opened in a
              different window and play along with this site!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
