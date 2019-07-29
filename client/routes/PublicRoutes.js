import React from "react";
import { Route } from "react-router-dom";

import About from "../components/Home/About";
import Links from "../components/Home/Links";
import PrivacyPolicy from "../components/Home/privacyPolicy";
import DefaultHome from "../components/Home/DefaultHome";
import Contact from "../components/Home/Contact";

export const PublicRoutes = () => {
  return (
    <>
      <Route exact path="/" component={() => <DefaultHome/>} />
      <Route exact path="/about" component={() => <About />} />
      <Route exact path="/links" component={() => <Links />} />
      <Route exact path="/privacyPolicy" component={() => <PrivacyPolicy />} />
      <Route exact path="/contact" component={() => <Contact />} />
    </>
  );
};

export default PublicRoutes;
