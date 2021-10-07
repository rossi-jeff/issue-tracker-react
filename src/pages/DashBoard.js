import React from "react";
import { Session } from "../lib/session";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { issueSort } from "../lib/issue-sort";
import ColumnDashboard from "../components/ColumnDashboard";
import { Breadcrumbs } from "@blueprintjs/core";
import { FlashHandler } from "../lib/flash-handler";

const DashBoard = props => {
  const [issues, setIssues] = React.useState([]);
  const [issuesNew, setIssuesNew] = React.useState([]);
  const [issuesAssigned, setIssuesAssigned] = React.useState([]);
  const [issuesAccepted, setIssuesAccepted] = React.useState([]);
  const [issuesFixed, setIssuesFixed] = React.useState([]);
  const [issuesOther, setIssuesOther] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);

  const flash = new FlashHandler();
  const session = new Session();

  const { signedIn } = session.data;

  const items = [
    { href: "/", text: "Home" },
    { href: "/dashboard", text: "Dashboard" }
  ];

  const updateIssue = async issue => {
    let api = new ApiFetch();
    try {
      const results = await api.patchData(
        `issue/${issue.UUID}`,
        issue,
        buildHeaders(session.data)
      );
      flash.success(`Issue ${results.SequenceNumber} updated`);
      setFetched(false);
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  const issueDropped = ev => {
    const { uuid, status } = ev;
    let issue = issues.find(i => i.UUID === uuid);
    if (issue) {
      issue.Status = status;
      updateIssue(issue);
    }
  };

  React.useEffect(() => {
    let api = new ApiFetch();

    const sortIssues = () => {
      if (!issues.length) return;
      let iNew = [],
        iAss = [],
        iAcc = [],
        iFix = [],
        iOth = [];
      for (let issue of issues) {
        switch (issue.Status) {
          case "New":
            iNew.push(issue);
            break;
          case "Assigned":
            iAss.push(issue);
            break;
          case "Accepted":
            iAcc.push(issue);
            break;
          case "Fixed":
            iFix.push(issue);
            break;
          default:
            iOth.push(issue);
        }
      }
      setIssuesNew(iNew);
      setIssuesAssigned(iAss);
      setIssuesAccepted(iAcc);
      setIssuesFixed(iFix);
      setIssuesOther(iOth);
    };

    const loadIssues = async () => {
      if (fetched) return;
      const results = await api.getData("issue", {}, buildHeaders());
      results.sort(issueSort);
      setIssues(results);
      setFetched(true);
    };

    loadIssues().then(() => {
      sortIssues();
    });
    // React insists to include issues in arguments, but that causes infinite loop
    // eslint-disable-next-line
  }, [fetched]);

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Breadcrumbs items={items} />
      <table style={{ width: "100%" }}>
        <tbody>
          <tr valign="top">
            <td style={{ width: "25%" }}>
              <ColumnDashboard
                issues={issuesNew}
                status="New"
                droppable={true}
                issueDropped={issueDropped}
                saveEditor={updateIssue}
                enabled={signedIn}
              />
            </td>
            <td style={{ width: "25%" }}>
              <ColumnDashboard
                issues={issuesAssigned}
                status="Assigned"
                droppable={true}
                issueDropped={issueDropped}
                saveEditor={updateIssue}
                enabled={signedIn}
              />
            </td>
            <td style={{ width: "25%" }}>
              <ColumnDashboard
                issues={issuesAccepted}
                status="Accepted"
                droppable={true}
                issueDropped={issueDropped}
                saveEditor={updateIssue}
                enabled={signedIn}
              />
            </td>
            <td style={{ width: "25%" }}>
              <ColumnDashboard
                issues={issuesFixed}
                status="Fixed"
                droppable={true}
                issueDropped={issueDropped}
                saveEditor={updateIssue}
                enabled={signedIn}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <ColumnDashboard
          issues={issuesOther}
          droppable={false}
          status="Other"
          saveEditor={updateIssue}
          enabled={signedIn}
        />
      </div>
    </div>
  );
};

export default DashBoard;
