import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "~/pages/Home/About";
import Links from "~/pages/Home/Links";
import PrivacyPolicy from "~/pages/Home/privacyPolicy";
import DefaultHome from "~/pages/Home/DefaultHome";
import Contact from "~/pages/Home/Contact";
import Signup from "~/pages/Signup/Signup"

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

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/about" component={() => <About />} />
      <Route exact path="/links" component={() => <Links />} />
      <Route exact path="/privacyPolicy" component={() => <PrivacyPolicy />} />
      <Route exact path="/contact" component={() => <Contact />} />
      <Route exact path="/signup" component={() => <Signup />} />
      <Route exact path="/" component={() => <DefaultHome />} />
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default PublicRoutes;
