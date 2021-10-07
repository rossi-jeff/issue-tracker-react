import React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import FormPhone from "../forms/FormPhone";

const DialogPhone = props => {
  const { phone, open, action } = props;

  const title = action === "edit" ? "Edit Phone" : "New Phone";

  return (
    <Dialog
      title={title}
      isOpen={open}
      onClose={props.toggleClosed}
      canOutsideClickClose={false}
    >
      <div className="scroll-300">
        <FormPhone phone={phone} fieldChanged={props.fieldChanged} />
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
          onClick={props.savePhone}
          style={{ float: "right" }}
        />
        <div style={{ clear: "right" }}></div>
      </div>
    </Dialog>
  );
};

export default DialogPhone;
