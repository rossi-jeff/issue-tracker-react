import React from "react";
import { Button } from "@blueprintjs/core";

const RowPhone = props => {
  const { phone } = props;

  const editPhone = () => {
    props.editPhone(phone.UUID);
  };

  return (
    <tr>
      <td>
        <Button
          text="Edit"
          icon="edit"
          intent="primary"
          small={true}
          onClick={editPhone}
        />
      </td>
      <td>{phone.Number}</td>
      <td>{phone.Type}</td>
      <td>{phone.Usage}</td>
      <td>{phone.Public ? "Yes" : "No"}</td>
      <td>
        <Button text="Delete" icon="delete" intent="danger" small={true} />
      </td>
    </tr>
  );
};

export default RowPhone;
