import React from "react";
import { FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { projectSort } from "../lib/project-sort";
import { userSort } from "../lib/user-sort";
import { issueSort } from "../lib/issue-sort";
import { FullName } from "../lib/fullname";

const FormTimeClock = props => {
  const [projects, setProjects] = React.useState([]);
  const [projectOps, setProjectOpts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userOps, setUserOpts] = React.useState([]);
  const [issues, setIssues] = React.useState([]);
  const [issueOps, setIssueOps] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  const { timeclock } = props;

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
      let optsI = [{ value: null, label: "" }];
      for (let issue of issues) {
        optsI.push({ value: issue.Id, label: issue.Title });
      }
      setIssueOps(optsI);
    };

    const loadSelects = async () => {
      try {
        const R1 = await api.getData("project", {}, buildHeaders());
        R1.sort(projectSort);
        const R2 = await api.getData("user", {}, buildHeaders());
        R2.sort(userSort);
        const R3 = await api.getData("issue", {}, buildHeaders());
        R3.sort(issueSort);
        setProjects(R1);
        setUsers(R2);
        setIssues(R3);
        buildOpts();
        setFetched(true);
      } catch (e) {
        console.log(e);
      }
    };

    loadSelects();
    // users, projects, and issues cannot be added to arguments or infinite loop
    // eslint-disable-next-line
  }, [fetched]);

  const issueChanged = event => {
    props.fieldChanged(event);
    const { value } = event.target;
    let issue = issues.find(i => i.Id === value);
    if (issue && issue.ProjectId !== timeclock.ProjectId) {
      props.fieldChanged({
        target: { name: "ProjectId", value: issue.ProjectId }
      });
    }
  };

  const projectChanged = event => {
    props.fieldChanged(event);
    const { value } = event.target;
    filterIssueOpts(value);
  };

  const filterIssueOpts = ProjectId => {
    let opts = [{ value: null, label: "" }];
    for (let issue of issues) {
      if (issue.ProjectId === ProjectId || !ProjectId) {
        opts.push({ value: issue.Id, label: issue.Title });
      }
    }
    setIssueOps(opts);
  };

  const addSeconds = event => {
    const { name, value } = event.target;
    let parts = value.split(":");
    if (parts.length === 2) parts.push("00");
    props.fieldChanged({ target: { name, value: parts.join(":") } });
  };

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <form>
      <div className="flex-row">
        <div className="flex-cell pad-br">
          <FormGroup label="User" labelFor="UserId">
            <HTMLSelect
              name="UserId"
              value={timeclock.UserId || ""}
              options={userOps}
              onChange={props.fieldChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Project" labelFor="ProjectId">
            <HTMLSelect
              name="ProjectId"
              value={timeclock.ProjectId || ""}
              options={projectOps}
              onChange={projectChanged}
              fill={true}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Issue" labelFor="IssueId">
            <HTMLSelect
              name="IssueId"
              value={timeclock.IssueId || ""}
              options={issueOps}
              onChange={issueChanged}
              fill={true}
            />
          </FormGroup>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-cell pad-br">
          <FormGroup label="Start Date" labelFor="Start.Date">
            <InputGroup
              name="Start.Date"
              value={timeclock.Start.Date}
              onChange={props.fieldChanged}
              type="date"
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Start Time" labelFor="Start.Time">
            <InputGroup
              name="Start.Time"
              value={timeclock.Start.Time}
              onChange={addSeconds}
              type="time"
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="End Date" labelFor="End.Date">
            <InputGroup
              name="End.Date"
              value={timeclock.End.Date}
              onChange={props.fieldChanged}
              type="date"
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="End Time" labelFor="End.Time">
            <InputGroup
              name="End.Time"
              value={timeclock.End.Time}
              onChange={addSeconds}
              type="time"
            />
          </FormGroup>
        </div>
      </div>
    </form>
  );
};

export default FormTimeClock;
