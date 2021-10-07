import React from "react";
import IssueDashboard from "./IssueDashboard";
import DialogEditIssue from "../dialogs/DialogEditIssue";

const ColumnDashboard = props => {
  const { issues, status, droppable, enabled } = props;
  const id = `column-${status}`;

  const blank = {
    Title: "",
    Details: "",
    Type: "",
    Status: "New",
    Priority: "",
    Complexity: "",
    AssignedToId: "",
    ProjectId: ""
  };

  const [editor, setEditor] = React.useState(blank);
  const [showEditor, setShowEditor] = React.useState(false);

  const fieldChanged = event => {
    const { name, value } = event.target;
    setEditor({
      ...editor,
      [name]: value
    });
  };

  const saveEditor = () => {
    console.log("saveEditor");
    const issue = editor;
    setShowEditor(false);
    setEditor(blank);
    props.saveEditor(issue);
  };

  const toggleClosed = () => {
    setShowEditor(false);
  };

  const editIssue = uuid => {
    const issue = issues.find(i => i.UUID === uuid);
    if (issue) {
      setEditor(issue);
      setShowEditor(true);
    }
  };

  const handleDragStart = ev => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "copy";
  };

  const issueLoaded = uuid => {
    document
      .getElementById(uuid)
      .addEventListener("dragstart", handleDragStart);
  };

  React.useEffect(() => {
    const handleDrop = ev => {
      ev.preventDefault();
      const uuid = ev.dataTransfer.getData("text/plain");
      props.issueDropped({ uuid, status });
    };

    const handleDragOver = ev => {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
    };

    const setDroppable = () => {
      if (!droppable) return;
      if (!enabled) return;
      let target = document.getElementById(id);
      if (target) {
        target.addEventListener("drop", handleDrop);
        target.addEventListener("dragover", handleDragOver);
      }
    };

    setDroppable();
    // including props to in args WILL cause infinite loop
    // eslint-disable-next-line
  }, [status, droppable, id, enabled]);

  return (
    <div className="padded" id={id}>
      <h2>{status}</h2>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {issues.map(issue => (
          <IssueDashboard
            key={issue.UUID}
            issue={issue}
            issueLoaded={issueLoaded}
            editIssue={editIssue}
            enabled={props.enabled}
          />
        ))}
      </div>
      <DialogEditIssue
        issue={editor}
        open={showEditor}
        fieldChanged={fieldChanged}
        toggleClosed={toggleClosed}
        sendUpdate={saveEditor}
      />
    </div>
  );
};

export default ColumnDashboard;
