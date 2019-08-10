import React from "react";
import styled from "styled-components";

const OuterPage = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
`;

const InnerPage = styled.div`
  width: 80vw;
  height: 100vh;
  margin: auto;
  background-color: white;
  flex: 1;
  overflow-x: scroll;
  ${props => props.textAlignCenter && "text-align: center"}
`;

const PaddingContainer = styled.div`
  margin-top: 7em;
`;

export const PageContainer = props => (
  <OuterPage {...props}>
    <InnerPage {...props}>
      <PaddingContainer>{props.children}</PaddingContainer>
    </InnerPage>
  </OuterPage>
);
