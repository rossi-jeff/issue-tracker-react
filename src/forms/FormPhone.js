import React from "react";
import { FormGroup, InputGroup, HTMLSelect } from "@blueprintjs/core";
import { UsageArray, PhoneTypeArray } from "../lib/options";

const FormPhone = props => {
  const { phone } = props;

  return (
    <form>
      <div>
        <FormGroup label="Number" labelFor="Number">
          <InputGroup
            name="Number"
            value={phone.Number}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Type" labelFor="Type">
          <HTMLSelect
            name="Type"
            value={phone.Type}
            options={PhoneTypeArray}
            onChange={props.fieldChanged}
            fill={true}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Usage" labelFor="Usage">
          <HTMLSelect
            name="Usage"
            value={phone.Usage}
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
            checked={phone.Public}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
    </form>
  );
};

export default FormPhone;
