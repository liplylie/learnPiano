// global
import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBarLink = styled(Link)`
  ${({ disabled }) => disabled && `opacity: 0.5; }`};

  &:hover {
    ${({ disabled }) =>
      disabled && `color: gray; opacity: 0.5; text-decoration: none }`};
  }
`;
