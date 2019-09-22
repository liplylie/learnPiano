import React from "react";
import { withRouter } from "react-router";

// global
import formatAMPM from "~/helpers/formatAMPM";

// local
import { StyledTable, TableHeaderRow } from "./Style";

const formatFinishedDate = time => {
  return time
    ? new Date(time).toString().split(" ")[0] +
        " " +
        new Date(time).toString().split(" ")[1] +
        " " +
        new Date(time).toString().split(" ")[2] +
        ", " +
        new Date(time).toString().split(" ")[3] +
        " at " +
        formatAMPM(new Date(time).toString().split(" ")[4])
    : "";
};

const spaceWords = word => {
  return word.split(/(?=[A-Z])/).join(" ");
};

const IntroSongTable = ({ introSongsCompleted, history }) => {
  const introSongData = Object.entries(introSongsCompleted);
  const navigate = page => history.push(`/SongList/intro/${page}`);

  return (
    <StyledTable id="introSongsTable" className="table effect8">
      <tbody>
        <TableHeaderRow>
          <th>Intro Song List</th>

          <th>Status</th>

          <th>Date Finished</th>
        </TableHeaderRow>

        {introSongData.map((data, i) => {
          return (
            <tr
              key={i}
              className={data[1].completed ? "Complete" : "NotComplete"}
              onClick={() => navigate(data[0])}
            >
              <th>{spaceWords(data[0])}</th>

              <th>{data[1].completed ? `Completed` : `Not Completed`} </th>

              <th>{formatFinishedDate(data[1].time)}</th>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default withRouter(IntroSongTable);
