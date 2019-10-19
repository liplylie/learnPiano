import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "~/pages/Home/About";
import Links from "~/pages/Home/Links";
import PrivacyPolicy from "~/pages/Home/privacyPolicy";
import DefaultHome from "~/pages/Home/DefaultHome";
import Contact from "~/pages/Home/Contact";
import Signup from "~/pages/Signup/Signup";

import Page404 from "../pages/Page404/Page404";

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
