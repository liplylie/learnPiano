import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => (
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
        <PulseLoader
          css={{ display: "inline-block" }}
          sizeUnit={"px"}
          size={20}
          color={"white"}
          loading={true}
        />
      </div>
    </div>
  </div>
);

export default Loader;
