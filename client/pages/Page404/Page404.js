import React from "react";

const Page404 = () => (
  <div
    className="row"
    style={{
      backgroundColor: "white",
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

export default Page404;
