import React from "react";
import { HTMLTable, Button } from "@blueprintjs/core";
import RowPhone from "./RowPhone";
import DialogPhone from "../dialogs/DialogPhone";
import { v4 } from "uuid";

const TablePhones = props => {
  const { phones } = props;

  const newPhone = () => {
    setAction("new");
    setEditor({
      ...blank,
      UUID: v4()
    });
    setShowEditor(true);
  };

  const editPhone = uuid => {
    const phone = phones.find(p => p.UUID === uuid);
    if (phone) {
      setAction("edit");
      setEditor(phone);
      setShowEditor(true);
    }
  };

  const blank = {
    Number: "",
    Type: "Cellular",
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
    if (name === "Public") {
      value = !editor.Public;
    }
    setEditor({
      ...editor,
      [name]: value
    });
  };

  const savePhone = () => {
    const phone = editor;
    props.addPhone(phone);
    setEditor(blank);
    setShowEditor(false);
  };

  if (!phones.length) {
    return (
      <div style={{ display: "inline-block" }}>
        <Button
          text="New Phone"
          icon="add"
          intent="success"
          small={true}
          onClick={newPhone}
          className="margin-r"
        />
        <DialogPhone
          phone={editor}
          open={showEditor}
          action={action}
          toggleClosed={toggleClosed}
          fieldChanged={fieldChanged}
          savePhone={savePhone}
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
                text="New Phone"
                icon="add"
                intent="success"
                small={true}
                onClick={newPhone}
              />
            </th>
            <th>Number</th>
            <th>Type</th>
            <th>Usage</th>
            <th>Display</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {phones.map(phone => (
            <RowPhone key={phone.Id} phone={phone} editPhone={editPhone} />
          ))}
        </tbody>
      </HTMLTable>
      <DialogPhone
        phone={editor}
        open={showEditor}
        action={action}
        toggleClosed={toggleClosed}
        fieldChanged={fieldChanged}
        savePhone={savePhone}
      />
    </div>
  );
};

export default TablePhones;
