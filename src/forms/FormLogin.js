import React from "react";
import { FormGroup, InputGroup, Button, Icon } from "@blueprintjs/core";

const FormLogin = props => {
  const { Username, Password } = props.state;

  return (
    <form>
      <div style={{ padding: "1em" }}>
        <FormGroup
          label="UserName"
          labelFor="UserName"
          helperText="Enter your user name"
        >
          <InputGroup
            id="UserName"
            name="Username"
            value={Username}
            onChange={props.fieldChanged}
            leftIcon="person"
          />
        </FormGroup>
      </div>
      <div style={{ padding: "1em" }}>
        <FormGroup
          label="PassWord"
          labelFor="PassWord"
          helperText="Enter your pass word"
        >
          <InputGroup
            id="PassWord"
            name="Password"
            type="password"
            value={Password}
            onChange={props.fieldChanged}
            leftIcon="lock"
          />
        </FormGroup>
      </div>
      <div style={{ padding: "1em" }}>
        <Button intent="warning" onClick={props.cancel}>
          <Icon icon="remove" style={{ marginRight: "0.5em" }} />
          Cancel
        </Button>
        <Button
          intent="primary"
          style={{ float: "right" }}
          onClick={props.send}
        >
          Send
          <Icon icon="send-message" style={{ marginLeft: "0.5em" }} />
        </Button>
        <div style={{ clear: "right" }}></div>
      </div>
    </form>
  );
};

export default FormLogin;
