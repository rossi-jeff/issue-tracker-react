import React from "react";
import {
  FormGroup,
  InputGroup,
  HTMLSelect,
  TextArea,
  H5
} from "@blueprintjs/core";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { projectSort } from "../lib/project-sort";
import { userSort } from "../lib/user-sort";
import { FullName } from "../lib/fullname";
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray
} from "../lib/options";

const FormIssue = props => {
  const [projects, setProjects] = React.useState([]);
  const [projectOps, setProjectOpts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userOps, setUserOpts] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  const { issue } = props;

  React.useEffect(() => {
    let api = new ApiFetch();

    const buildOpts = () => {
      let optsU = [{ value: null, label: "" }];
      for (let user of users) {
        optsU.push({ value: user.Id, label: FullName(user.Name) });
      }
      setUserOpts(optsU);
      let optsP = [{ value: null, label: "" }];
      for (let project of projects) {
        optsP.push({ value: project.Id, label: project.Name });
      }
      setProjectOpts(optsP);
    };

    const loadSelects = async () => {
      try {
        const R1 = await api.getData("project", {}, buildHeaders());
        R1.sort(projectSort);
        const R2 = await api.getData("user", {}, buildHeaders());
        R2.sort(userSort);
        setProjects(R1);
        setUsers(R2);
        buildOpts();
        setFetched(true);
      } catch (e) {
        console.log(e);
      }
    };

    loadSelects();
    // react actively seeks infinite loops, cannot include users or projects
    // eslint-disable-next-line
  }, [fetched]);

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <form>
      <H5>{issue.SequenceNumber}</H5>
      <div>
        <FormGroup label="Project" labelFor="ProjectId">
          <HTMLSelect
            name="ProjectId"
            options={projectOps}
            value={issue.ProjectId || ""}
            onChange={props.fieldChanged}
            fill={true}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Title" labelFor="Title">
          <InputGroup
            name="Title"
            value={issue.Title}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Details" labelFor="Details">
          <TextArea
            name="Details"
            value={issue.Details}
            onChange={props.fieldChanged}
            style={{ width: "100%" }}
          />
        </FormGroup>
      </div>
      <div className="flex-row">
        <div className="flex-cell pad-br">
          <FormGroup label="Priority" labelFor="Priority">
            <HTMLSelect
              name="Priority"
              value={issue.Priority}
              options={PriorityArray}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Status" labelFor="Status">
            <HTMLSelect
              name="Status"
              value={issue.Status}
              options={StatusArray}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Type" labelFor="Type">
            <HTMLSelect
              name="Type"
              value={issue.Type}
              options={IssueTypeArray}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Complexity" labelFor="Complexity">
            <HTMLSelect
              name="Complexity"
              value={issue.Complexity}
              options={ComplexityArray}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Assigned To" labelFor="AssignedToId">
            <HTMLSelect
              name="AssignedToId"
              options={userOps}
              value={issue.AssignedToId || ""}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
      </div>
    </form>
  );
};

export default FormIssue;
