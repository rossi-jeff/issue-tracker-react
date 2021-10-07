import React from "react";
import { Card, H5, Elevation, Button } from "@blueprintjs/core";
import { FullName } from "../lib/fullname";

const CardUser = props => {
  const { user } = props;

  const name = user.Name ? FullName(user.Name) : "";

  const goToDetails = () => {
    window.location = `/users/${user.UUID}`;
  };

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <H5>{user.Credentials.Username}</H5>
      <p>{name}</p>
      <div className="flex-row">
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Email(s)</strong>
          {user.Emails.length}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Phone(s)</strong>
          {user.Phones.length}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Role(s)</strong>
          {user.Roles.map(u => u.Name).join(", ")}
        </div>
      </div>
      <Button icon="edit" text="Edit" intent="primary" onClick={goToDetails} />
    </Card>
  );
};

export default CardUser;
