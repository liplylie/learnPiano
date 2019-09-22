import React from "react";
import { withRouter } from "react-router";

// local
import { StyledTable, TableHeaderRow } from "./Style";

const MiniGameTable = ({ miniGamesCompleted, history }) => {
  const miniGameData = Object.entries(miniGamesCompleted);
  const navigate = page => history.push(`/${page}`);

  return (
    <StyledTable id="miniGameTable" className="table effect8">
      <tbody>
        <TableHeaderRow>
          <th>Mini Games</th>

          <th>Status</th>

          <th>High Score</th>
        </TableHeaderRow>

        {miniGameData.map((data, i) => {
          return (
            <tr
              key={i}
              className={data[1].completed ? "Complete" : "NotComplete"}
              onClick={() => navigate(data[0])}
            >
              <th>Mini Game {i + 1}</th>
              <th>{data[1].completed ? `Completed` : `Not Completed`} </th>
              <th>{data[1].highScore ? `${data[1].highScore}` : ""} </th>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default withRouter(MiniGameTable);
