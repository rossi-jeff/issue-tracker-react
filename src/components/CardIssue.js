import React from "react";
import { Card, H3, H5, Elevation, Button } from "@blueprintjs/core";
import { FullName } from "../lib/fullname";

const CardIssue = props => {
  const { issue } = props;

  const author = issue.Author ? FullName(issue.Author.Name) : "";
  const assigned = issue.AssignedTo ? FullName(issue.AssignedTo.Name) : "";

  const goToDetails = () => {
    window.location = `/issues/${issue.UUID}`;
  };

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <H3>{issue.SequenceNumber}</H3>
      <H5>{issue.Title}</H5>
      <div className="flex-row">
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Priority</strong>
          {issue.Priority}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Status</strong>
          {issue.Status}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Type</strong>
          {issue.Type}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Complexity</strong>
          {issue.Complexity}
        </div>
      </div>
      <p>{issue.Details}</p>
      <div className="flex-row">
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Created</strong>
          {issue.Created}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Author</strong>
          {author}
        </div>
        <div className="flex-cell">
          <strong style={{ marginRight: "1em" }}>Assigned To</strong>
          {assigned}
        </div>
      </div>
      <Button icon="edit" text="Edit" intent="primary" onClick={goToDetails} />
    </Card>
  );
};

export default CardIssue;
