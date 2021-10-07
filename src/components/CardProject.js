import React from "react";
import { Card, H5, Elevation, Button } from "@blueprintjs/core";

const CardProject = props => {
  const { project } = props;

  const goToDetails = () => {
    window.location = `/projects/${project.UUID}`;
  };

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <H5>{project.Name}</H5>
      <p>{project.Details}</p>
      <Button icon="edit" text="Edit" intent="primary" onClick={goToDetails} />
    </Card>
  );
};

export default CardProject;
