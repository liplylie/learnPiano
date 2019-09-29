import styled from "styled-components";

export const StyledUL = styled.ul`
  padding: 2em 4em 0px 4em;
`;

export const FacebookStyle = styled.a`
  background: #3b5998;
  color: white;
  cursor: pointer;

  &:not([href]): not([tabindex]) {
    color: white;
    &:hover {
      color: white;
    }
  }
`;
