import React from "react";

// Global
import { PageContainer } from "~/theme";

const Links = () => {
  return (
    <PageContainer className="effect8" textAlignCenter>
      <div className="col-md-12">
        <h1>Links</h1>
      </div>

      <div className="row">
        <div className="col-md-12">
          <p>
            <a href="https://virtualpiano.net/" target="_blank">
              Online Piano{" "}
            </a>
            Click on this link if you prefer to you use a different online piano
            hosted by virtualpiano.net. Have the piano opened in a different
            window and play along with this site!
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Links;
