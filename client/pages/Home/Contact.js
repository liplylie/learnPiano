import React from "react";

const Contact = () => {
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
          minHeight: "100vh",
          margin: "auto",
          backgroundColor: "white",
          flex: 1,
          overflowX: "scroll"
        }}
        className="effect8 wow fadeIn"
      >
        <div className="row" style={{ height: "7em" }} />
        <div className="row">
          <div className="col-md-12 text-center" style={{ fontSize: "2em" }}>
            <h1>Learn Piano Fun</h1>
            <p>Contact at decentpianist@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
