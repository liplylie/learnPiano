import styled from "styled-components";
import { Link } from "react-router-dom";

import { rem } from "~/helpers/utilities";

export const StyledLink = styled(Link)`
  font-family: helvetica;
  font-size: 1.5em;
  display: block;

  ${({ disabled }) => disabled && `opacity: 0.5;`}
`;

export const ProfilePicture = styled.img`
  height: 10em;
  width: 10em;
  border-radius: ${rem(5)};
  visibility: visible;
  animation-name: flipInX;
  margin: auto;
  object-fit: contain;

  &:hover {
    cursor: pointer;
  }
`;

export const ChangePhoto = styled.p`
  position: absolute;
  top: 0;
  bottom: 3em;
  left: 0;
  right: 0;
  background: rgba(29, 106, 154, 0.72);
  color: #fff;
  opacity: 0;
  height: 10em;
  width: 10em;

  /* transition effect. not necessary */
  transition: opacity 0.2s, visibility 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const PhotoWrappper = styled.div`
  position: relative;
`;
