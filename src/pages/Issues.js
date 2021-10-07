import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import CardIssue from "../components/CardIssue";
import { issueSort } from "../lib/issue-sort";
import { Breadcrumbs } from "@blueprintjs/core";
import FilterIssue from "../components/FilterIssue";

const Issues = props => {
  const [issues, setIssues] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [filter, setFilter] = React.useState({});
  const [count, setCount] = React.useState(0);

  const items = [
    { href: "/", text: "Home" },
    { href: "/issues", text: "Issues" }
  ];

  const reFetch = newFilter => {
    setFilter(newFilter);
  };

  React.useEffect(() => {
    const api = new ApiFetch();

    const loadIssues = async () => {
      const results = await api.getData("issue", filter, buildHeaders());
      results.sort(issueSort);
      setIssues(results);
      setCount(results.length);
      setFetched(true);
    };

    loadIssues();
  }, [fetched, filter]);

  return (
    <div>
      <Breadcrumbs items={items} />
      <FilterIssue reFetch={reFetch} count={count} />
      {issues.map(issue => (
        <CardIssue key={issue.Id} issue={issue} />
      ))}
    </div>
  );
};

export default Issues;
