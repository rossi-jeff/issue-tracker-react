import React from "react";
import { Button } from "@blueprintjs/core";

const RowEmail = props => {
  const { email } = props;

  const editEmail = () => {
    props.editEmail(email.UUID);
  };

  return (
    <tr>
      <td>
        <Button
          text="Edit"
          icon="edit"
          intent="primary"
          small={true}
          onClick={editEmail}
        />
      </td>
      <td>{email.Address}</td>
      <td>{email.Usage}</td>
      <td>{email.Public ? "Yes" : "No"}</td>
      <td>
        <Button text="Delete" icon="delete" intent="danger" small={true} />
      </td>
    </tr>
  );
};

export default RowEmail;
