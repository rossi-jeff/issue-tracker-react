import React from "react";
import {
  Card,
  Elevation,
  Button,
  Collapse,
  FormGroup,
  HTMLSelect
} from "@blueprintjs/core";
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray
} from "../lib/options";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { userSort } from "../lib/user-sort";
import { FullName } from "../lib/fullname";
import { RemoveBlanks } from "../lib/RemoveBlanks";

const FilterIssue = props => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [userOpts, setUserOpts] = React.useState([]);

  const { count } = props;

  const goToNew = () => {
    window.location = "/issues/new";
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const fieldChanged = event => {
    const { name, value } = event.target;
    let newFilter = {
      ...filter,
      [name]: value
    };
    setFilter(newFilter);
    setTimeout(() => {
      props.reFetch(RemoveBlanks(newFilter));
    }, 100);
  };

  React.useEffect(() => {
    const api = new ApiFetch();

    const buildOpts = () => {
      let opts = [{ value: null, label: "" }];
      for (let user of users) {
        opts.push({ value: user.Id, label: FullName(user.Name) });
      }
      setUserOpts(opts);
    };

    const loadUsers = async () => {
      const results = await api.getData("user", {}, buildHeaders());
      results.sort(userSort);
      setUsers(results);
      buildOpts();
      setFetched(true);
    };

    loadUsers();
    // users is dynamic including in arguments will cause infinite loop
    // eslint-disable-next-line
  }, [fetched]);

  return (
    <Card elevation={Elevation.TWO} style={{ marginBottom: "0.5em" }}>
      <Button
        text="New Issue"
        icon="add"
        intent="success"
        className="margin-r"
        onClick={goToNew}
      />
      <Button
        text="Filter Issues"
        icon="filter-list"
        intent="primary"
        className="margin-r"
        onClick={toggleOpen}
      />
      <strong className="margin-r">Showing</strong>
      {count}
      <Collapse isOpen={open}>
        <div className="flex-row">
          <div className="flex-cell pad-br">
            <FormGroup label="Priority" labelFor="Priority">
              <HTMLSelect
                name="Priority"
                value={filter.Priority}
                options={PriorityArray}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
          <div className="flex-cell pad-br">
            <FormGroup label="Status" labelFor="Status">
              <HTMLSelect
                name="Status"
                value={filter.Status}
                options={StatusArray}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
          <div className="flex-cell pad-br">
            <FormGroup label="Type" labelFor="Type">
              <HTMLSelect
                name="Type"
                value={filter.Type}
                options={IssueTypeArray}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-cell pad-br">
            <FormGroup label="Complexity" labelFor="Complexity">
              <HTMLSelect
                name="Complexity"
                value={filter.Complexity}
                options={ComplexityArray}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
          <div className="flex-cell pad-br">
            <FormGroup label="Author" labelFor="AuthorId">
              <HTMLSelect
                name="AuthorId"
                options={userOpts}
                value={filter.AuthorId}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
          <div className="flex-cell pad-br">
            <FormGroup label="Assigned To" labelFor="AssignedToId">
              <HTMLSelect
                name="AssignedToId"
                options={userOpts}
                value={filter.AssignedToId}
                onChange={fieldChanged}
                fill={true}
              />
            </FormGroup>
          </div>
        </div>
      </Collapse>
    </Card>
  );
};

export default FilterIssue;
