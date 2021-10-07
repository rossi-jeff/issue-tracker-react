import React from "react";
import { Card, H4, H5, Elevation, Collapse, Button } from "@blueprintjs/core";
import { FullName } from "../lib/fullname";

const IssueDashboard = props => {
  const { issue } = props;

  const author = issue.Author ? FullName(issue.Author.Name) : "";
  const assigned = issue.AssignedTo ? FullName(issue.AssignedTo.Name) : "";
  const project = issue.Project ? issue.Project.Name : "";

  const [main, setMain] = React.useState(false);
  const [desc, setDesc] = React.useState(false);
  const [detail, setDetail] = React.useState(false);

  const toggleMain = () => {
    setMain(!main);
  };

  const toggleDesc = () => {
    setDesc(!desc);
  };

  const toggleDetail = () => {
    setDetail(!detail);
  };

  const editIssue = () => {
    props.editIssue(issue.UUID);
  };

  React.useEffect(() => {
    if (!issue.UUID) return;
    props.issueLoaded(issue.UUID);
    // including props to in args WILL cause infinite loop
    // eslint-disable-next-line
  }, [issue]);

  return (
    <Card
      elevation={Elevation.TWO}
      style={{ margin: "0 0.5em 0.5em 0.5em" }}
      className="no-pad"
      draggable={props.enabled}
      id={issue.UUID}
    >
      <div className="dash-toggle">
        <Button
          icon="edit"
          style={{ float: "right" }}
          minimal={true}
          title="Edit"
          onClick={editIssue}
          disabled={!props.enabled}
        />
        <H4
          onClick={toggleMain}
          style={{ display: "inline-block", width: "85%" }}
        >
          {issue.SequenceNumber || "---"}
        </H4>
        <div style={{ clear: "right" }}></div>
      </div>

      <Collapse isOpen={main} className="padded">
        <div className="padded">{issue.Title}</div>

        <H5 className="dash-toggle" onClick={toggleDesc}>
          Description
        </H5>
        <Collapse isOpen={desc} className="padded">
          {issue.Details}
        </Collapse>

        <H5 className="dash-toggle" onClick={toggleDetail}>
          Details
        </H5>
        <Collapse isOpen={detail} className="padded">
          <div>
            <strong className="margin-r">Project</strong>
            {project}
          </div>
          <div>
            <strong className="margin-r">Priority</strong>
            {issue.Priority}
          </div>
          <div>
            <strong className="margin-r">Status</strong>
            {issue.Status}
          </div>
          <div>
            <strong className="margin-r">Type</strong>
            {issue.Type}
          </div>
          <div>
            <strong className="margin-r">Complexity</strong>
            {issue.Complexity}
          </div>
          <div>
            <strong className="margin-r">Created</strong>
            {issue.Created}
          </div>
          <div>
            <strong className="margin-r">Author</strong>
            {author}
          </div>
          <div>
            <strong className="margin-r">Assigned</strong>
            {assigned}
          </div>
        </Collapse>
      </Collapse>
    </Card>
  );
};

export default IssueDashboard;
