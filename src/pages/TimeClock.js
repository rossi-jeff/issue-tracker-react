import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import TableTimeClocks from "../components/TableTimeClocks";
import { Session } from "../lib/session";
import { Breadcrumbs } from "@blueprintjs/core";
import FilterTimeClock from "../components/FilterTimeClock";

const TimeClock = props => {
  const [timeclocks, setTimeClocks] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const items = [
    { href: "/", text: "Home" },
    { href: "/timeclock", text: "Time Clock" }
  ];

  React.useEffect(() => {
    const api = new ApiFetch();
    const session = new Session();

    const loadTimeClocks = async () => {
      const results = await api.getData(
        "timeclock",
        {},
        buildHeaders(session.data)
      );
      setTimeClocks(results);
      setCount(results.length);
      setFetched(true);
    };

    loadTimeClocks();
  }, [fetched]);

  return (
    <div>
      <Breadcrumbs items={items} />
      <FilterTimeClock count={count} />
      <TableTimeClocks timeclocks={timeclocks} />
    </div>
  );
};

export default TimeClock;
