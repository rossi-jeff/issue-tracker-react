import React from "react";
import RowTimeClock from "../components/RowTimeClock";
import { HTMLTable } from "@blueprintjs/core";

const TableTimeClocks = props => {
  const { timeclocks } = props;

  return (
    <HTMLTable
      striped={true}
      condensed={true}
      bordered={true}
      style={{ width: "100%" }}
      className="responsive" // todo
    >
      <thead>
        <tr>
          <th>Edit</th>
          <th>Name</th>
          <th>Project</th>
          <th>Issue</th>
          <th colSpan="2">Start Date/Time</th>
          <th colSpan="2">End Date/Time</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {timeclocks.map(timeclock => (
          <RowTimeClock key={timeclock.Id} timeclock={timeclock} />
        ))}
      </tbody>
    </HTMLTable>
  );
};

export default TableTimeClocks;
