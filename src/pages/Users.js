import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import CardUser from "../components/CardUser";
import { userSort } from "../lib/user-sort";
import { Session } from "../lib/session";
import { Breadcrumbs } from "@blueprintjs/core";
import FilterUser from "../components/FilterUser";

const Users = props => {
  const [users, setUsers] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const items = [
    { href: "/", text: "Home" },
    { href: "/users", text: "Users" }
  ];

  React.useEffect(() => {
    const api = new ApiFetch();
    const session = new Session();

    const loadUsers = async () => {
      const results = await api.getData("user", {}, buildHeaders(session.data));
      results.sort(userSort);
      setUsers(results);
      setCount(results.length);
      setFetched(true);
    };

    loadUsers();
  }, [fetched]);

  return (
    <div>
      <Breadcrumbs items={items} />
      <FilterUser count={count} />
      {users.map(user => (
        <CardUser key={user.Id} user={user} />
      ))}
    </div>
  );
};

export default Users;
