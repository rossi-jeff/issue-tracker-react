import React from "react";
import { Card, Elevation, Button } from "@blueprintjs/core";

const FilterUser = props => {
  const { count } = props;

  const goToNew = () => {
    window.location = "/users/new";
  };

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <Button
        text="New User"
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

export default FilterUser;
