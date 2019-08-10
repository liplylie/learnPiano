import React from "react";

// local
import { StyledTable, TableHeaderRow } from "./Style";


const MiniGameTable = ({ miniGamesCompleted }) => {
  const miniGameData = Object.entries(miniGamesCompleted);

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

export default MiniGameTable;
