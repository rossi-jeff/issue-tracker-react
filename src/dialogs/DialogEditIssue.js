import React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import FormIssue from "../forms/FormIssue";

const DialogEditIssue = props => {
  const { issue, open } = props;

  return (
    <Dialog
      title="Edit Issue"
      isOpen={open}
      onClose={props.toggleClosed}
      canOutsideClickClose={false}
    >
      <div className="scroll-300">
        <FormIssue issue={issue} fieldChanged={props.fieldChanged} />
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
          text="Update"
          onClick={props.sendUpdate}
          style={{ float: "right" }}
        />
        <div style={{ clear: "right" }}></div>
      </div>
    </Dialog>
  );
};

export default DialogEditIssue;
