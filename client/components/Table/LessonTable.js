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

const LessonTable = ({ lessonsCompleted, history }) => {
  const lessonData = Object.entries(lessonsCompleted);
  const navigate = page => history.push(`/${page}`);

  return (
    <StyledTable id="lessonTable" className="table effect8">
      <tbody>
        <TableHeaderRow>
          <th>Lessons</th>

          <th>Status</th>

          <th>Date Finished</th>
        </TableHeaderRow>

        {lessonData.map((data, i) => {
          return (
            <tr
              key={i}
              className={data[1].completed ? "Complete" : "NotComplete"}
              onClick={() => navigate(data[0])}
            >
              <th>Lesson {i + 1}</th>

              <th>{data[1].completed ? `Completed` : `Not Completed`} </th>

              <th>{formatFinishedDate(data[1].time)}</th>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default withRouter(LessonTable);
