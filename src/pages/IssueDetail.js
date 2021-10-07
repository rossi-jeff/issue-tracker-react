import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import { useParams } from "react-router-dom";
import FormIssue from "../forms/FormIssue";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import { FlashHandler } from "../lib/flash-handler";
import { RemoveBlanks } from "../lib/RemoveBlanks";

const IssueDetail = props => {
  const session = new Session();
  let api = new ApiFetch();
  const flash = new FlashHandler();

  const { signedIn } = session.data;

  const { uuid } = useParams();
  const [fetched, setFetched] = React.useState(false);
  const [issue, setIssue] = React.useState({});

  const updateIssue = async () => {
    try {
      const results = await api.patchData(
        `issue/${uuid}`,
        RemoveBlanks(issue),
        buildHeaders(session.data)
      );
      console.log(results);
      flash.success(`Issue: ${results.SequenceNumber} updated`);
      setIssue(results);
      window.location = "/issues";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  const fieldChanged = event => {
    const { name, value } = event.target;
    setIssue({
      ...issue,
      [name]: value
    });
  };

  const [items, setItems] = React.useState([
    { href: "/", text: "Home" },
    { href: "/issues", text: "Issues" }
  ]);

  React.useEffect(() => {
    let api = new ApiFetch();

    const loadIssue = async () => {
      const results = await api.getData(`issue/${uuid}`, {}, buildHeaders());

      if (items.length === 2) {
        setItems([
          ...items,
          {
            href: `/issues/${results.UUID}`,
            text: `${results.SequenceNumber} | ${results.Title}`
          }
        ]);
      }

      setIssue(results);
      setFetched(true);
    };

    loadIssue();
  }, [fetched, uuid, items]);

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormIssue issue={issue} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="updated"
          text="Update"
          disabled={!signedIn}
          onClick={updateIssue}
        />
      </Card>
    </div>
  );
};

export default IssueDetail;
