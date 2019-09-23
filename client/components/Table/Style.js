import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  border: solid white 1px;
  opacity: 1;

  tr {
    &:not(:first-of-type) {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  th,
  td {
    border-collapse: collapse;
    border: solid white 1px;
    padding: 1em;
  }

  .Complete {
    background-color: lightgreen;
  }

  .NotComplete {
    background-color: pink;
  }
`;
export const TableHeaderRow = styled.tr`
  background-color: lightgrey;
`;
