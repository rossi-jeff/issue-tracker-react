import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";

const FormUser = props => {
  const { user } = props;

  return (
    <form>
      <div className="flex-row">
        <div className="flex-cell pad-br">
          <FormGroup
            label="UserName"
            labelFor="UserName"
            helperText="User Name"
          >
            <InputGroup
              id="UserName"
              name="Credentials.Username"
              value={user.Credentials.Username}
              onChange={props.fieldChanged}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup
            label="PassWord"
            labelFor="PassWord"
            helperText="Pass Word"
          >
            <InputGroup
              id="PassWord"
              name="Credentials.Password"
              value={user.Credentials.Password}
              type="password"
              onChange={props.fieldChanged}
            />
          </FormGroup>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-cell pad-br">
          <FormGroup label="First" labelFor="First" helperText="First Name">
            <InputGroup
              id="First"
              name="Name.First"
              value={user.Name.First}
              onChange={props.fieldChanged}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Middle" labelFor="Middle" helperText="Middle Name">
            <InputGroup
              id="Middle"
              name="Name.Middle"
              value={user.Name.Middle}
              onChange={props.fieldChanged}
            />
          </FormGroup>
        </div>
        <div className="flex-cell pad-br">
          <FormGroup label="Last" labelFor="Last" helperText="Last Name">
            <InputGroup
              id="Last"
              name="Name.Last"
              value={user.Name.Last}
              onChange={props.fieldChanged}
            />
          </FormGroup>
        </div>
      </div>
    </form>
  );
};

export default FormUser;
