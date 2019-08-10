import styled from "styled-components";
import { Link } from "react-router-dom";

import { rem } from "~/helpers/utilities"

export const StyledLink = styled(Link)`
  font-family: helvetica;
  font-size: 1.5em;
  display: block;
`;

export const ProfilePicture = styled.img`
  height: 10em;
  width: 10em;
  border-radius: ${rem(5)};
  visibility: visible;
  animation-name: flipInX;
  margin: auto;
`;
