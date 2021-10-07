import React from "react";
import { FormGroup, InputGroup, TextArea } from "@blueprintjs/core";

const FormProject = props => {
  const { project } = props;

  return (
    <form>
      <div>
        <FormGroup label="Name" labelFor="Name">
          <InputGroup
            name="Name"
            value={project.Name}
            onChange={props.fieldChanged}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Details" labelFor="Details">
          <TextArea
            name="Details"
            value={project.Details}
            onChange={props.fieldChanged}
            style={{ width: "100%" }}
          />
        </FormGroup>
      </div>
    </form>
  );
};

export default FormProject;
