import React from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";

const FilterTimeClock = props => {
  const { count } = props;

  const goToNew = () => {
    window.location = "/timeclock/new";
  };

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <Button
        text="New Time Clock"
        icon="add"
        intent="success"
        className="margin-r"
        onClick={goToNew}
      />
      <strong className="margin-r">Showing</strong>
      {count}
    </Card>
  );
};

export default FilterTimeClock;
