import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import FormIssue from "../forms/FormIssue";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import { FlashHandler } from "../lib/flash-handler";
import { RemoveBlanks } from "../lib/RemoveBlanks";

const IssueNew = props => {
  const session = new Session();
  const api = new ApiFetch();
  const flash = new FlashHandler();

  const { signedIn } = session.data;

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

  const [issue, setIssue] = React.useState(blank);

  const items = [
    { href: "/", text: "Home" },
    { href: "/issues", text: "Issues" },
    { href: "/issues/new", text: "New Issue" }
  ];

  const fieldChanged = event => {
    const { name, value } = event.target;
    setIssue({
      ...issue,
      [name]: value
    });
  };

  const saveIssue = async () => {
    try {
      const results = api.postData(
        "issue",
        RemoveBlanks(issue),
        buildHeaders(session.data)
      );
      flash.success(`Issue: ${results.SequenceNumber} added`);
      window.location = "/issues";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormIssue issue={issue} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="floppy-disk"
          text="Save"
          disabled={!signedIn}
          onClick={saveIssue}
        />
      </Card>
    </div>
  );
};

export default IssueNew;
