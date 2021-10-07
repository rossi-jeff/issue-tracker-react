import React from "react";
import { HTMLTable, Button } from "@blueprintjs/core";
import RowEmail from "./RowEmail";
import DialogEmail from "../dialogs/DialogEmail";
import { v4 } from "uuid";

const TableEmails = props => {
  const { emails } = props;

  const blank = {
    Address: "",
    Usage: "Personal",
    Public: false
  };

  const [editor, setEditor] = React.useState(blank);
  const [showEditor, setShowEditor] = React.useState(false);
  const [action, setAction] = React.useState("new");

  const toggleClosed = () => {
    setShowEditor(false);
  };

  const fieldChanged = event => {
    let { name, value } = event.target;
    console.log("fieldChanged", name, value);
    if (name === "Public") {
      value = !editor.Public;
    }
    setEditor({
      ...editor,
      [name]: value
    });
  };

  const newEmail = () => {
    setAction("new");
    setEditor({
      ...blank,
      UUID: v4()
    });
    setShowEditor(true);
  };

  const editEmail = uuid => {
    const email = emails.find(e => e.UUID === uuid);
    if (email) {
      setAction("edit");
      setEditor(email);
      setShowEditor(true);
    }
  };

  const saveEmail = () => {
    const email = editor;
    props.addEmail(email);
    setEditor(blank);
    setShowEditor(false);
  };

  if (!emails.length) {
    return (
      <div style={{ display: "inline-block" }}>
        <Button
          text="New Email"
          icon="add"
          intent="success"
          small={true}
          onClick={newEmail}
          className="margin-r"
        />
        <DialogEmail
          email={editor}
          open={showEditor}
          action={action}
          toggleClosed={toggleClosed}
          fieldChanged={fieldChanged}
          saveEmail={saveEmail}
        />
      </div>
    );
  }

  return (
    <div>
      <HTMLTable
        striped={true}
        condensed={true}
        bordered={true}
        style={{ width: "100%", margin: "1em 0 1em 0" }}
        className="responsive" // todo
      >
        <thead>
          <tr>
            <th>
              <Button
                text="New Email"
                icon="add"
                intent="success"
                small={true}
                onClick={newEmail}
              />
            </th>
            <th>Address</th>
            <th>Usage</th>
            <th>Display</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {emails.map(email => (
            <RowEmail key={email.Id} email={email} editEmail={editEmail} />
          ))}
        </tbody>
      </HTMLTable>
      <DialogEmail
        email={editor}
        open={showEditor}
        action={action}
        toggleClosed={toggleClosed}
        fieldChanged={fieldChanged}
        saveEmail={saveEmail}
      />
    </div>
  );
};

export default TableEmails;
