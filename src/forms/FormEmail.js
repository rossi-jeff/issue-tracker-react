import React from "react";
import { FormGroup, InputGroup, HTMLSelect } from "@blueprintjs/core";
import { UsageArray } from "../lib/options";

const FormEmail = props => {
  const { email } = props;

  return (
    <form>
      <div>
        <FormGroup label="Address" labelFor="Address">
          <InputGroup
            name="Address"
            value={email.Address}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Usage" labelFor="Usage">
          <HTMLSelect
            name="Usage"
            value={email.Usage}
            options={UsageArray}
            onChange={props.fieldChanged}
            fill={true}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Public" labelFor="Public">
          <input
            name="Public"
            type="checkbox"
            checked={email.Public}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
    </form>
  );
};

export default FormEmail;
