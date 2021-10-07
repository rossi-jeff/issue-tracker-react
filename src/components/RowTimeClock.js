import React from "react";
import { FullName } from "../lib/fullname";
import { Button } from "@blueprintjs/core";

const RowTimeClock = props => {
  const { timeclock } = props;

  const name = timeclock.User ? FullName(timeclock.User.Name) : "";
  const issue = timeclock.Issue ? timeclock.Issue.Title : "";
  const project = timeclock.Project ? timeclock.Project.Name : "";

  let hours = "",
    sDate,
    eDate,
    ms;
  if (timeclock.Start.Date && timeclock.Start.Time) {
    sDate = new Date(`${timeclock.Start.Date} ${timeclock.Start.Time}`);
  }
  if (timeclock.End.Date && timeclock.End.Time) {
    eDate = new Date(`${timeclock.End.Date} ${timeclock.End.Time}`);
  }
  if (sDate && eDate) {
    ms = eDate.getTime() - sDate.getTime();
    hours = Math.round(ms / 36000) / 100;
  }

  const goToDetails = () => {
    window.location = `/timeclock/${timeclock.UUID}`;
  };

  return (
    <tr>
      <td>
        <Button
          icon="edit"
          intent="primary"
          small={true}
          onClick={goToDetails}
        />
      </td>
      <td className="ellipsis">{name}</td>
      <td className="ellipsis">{project}</td>
      <td className="ellipsis">{issue}</td>
      <td className="nowrap">{timeclock.Start.Date}</td>
      <td className="nowrap">{timeclock.Start.Time}</td>
      <td className="nowrap">{timeclock.End.Date}</td>
      <td className="nowrap">{timeclock.End.Time}</td>
      <td>{hours}</td>
    </tr>
  );
};

export default RowTimeClock;
