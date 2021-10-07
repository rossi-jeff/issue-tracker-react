import React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import FormEmail from "../forms/FormEmail";

const DialogEmail = props => {
  const { email, open, action } = props;
  const title = action === "edit" ? "Edit Email" : "New Email";

  return (
    <Dialog
      title={title}
      isOpen={open}
      onClose={props.toggleClosed}
      canOutsideClickClose={false}
    >
      <div className="scroll-300">
        <FormEmail email={email} fieldChanged={props.fieldChanged} />
      </div>
      <div className="padded">
        <Button
          intent="warning"
          icon="remove"
          text="cancel"
          onClick={props.toggleClosed}
        />
        <Button
          intent="primary"
          icon="floppy-disk"
          text={action === "edit" ? "Update" : "Save"}
          onClick={props.saveEmail}
          style={{ float: "right" }}
        />
        <div style={{ clear: "right" }}></div>
      </div>
    </Dialog>
  );
};

export default DialogEmail;
