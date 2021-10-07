import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import FormUser from "../forms/FormUser";
import TableEmails from "../components/TableEmails";
import TablePhones from "../components/TablePhones";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import { FlashHandler } from "../lib/flash-handler";
import { FullName } from "../lib/fullname";

const UserNew = props => {
  const api = new ApiFetch();
  const flash = new FlashHandler();

  const blank = {
    Name: {
      First: "",
      Middle: "",
      Last: ""
    },
    Credentials: {
      Username: "",
      Password: ""
    },
    Emails: [],
    Phones: [],
    Roles: []
  };

  const [user, setUser] = React.useState(blank);

  const items = [
    { href: "/", text: "Home" },
    { href: "/users", text: "Users" },
    { href: "/users/new", text: "Register" }
  ];

  const fieldChanged = event => {
    const { name, value } = event.target;
    // const newUser = JSON.parse(JSON.stringify(user));
    if (name.indexOf(".") > -1) {
      const newUser = {};
      for (let key in user) {
        if (Array.isArray(user[key])) {
          newUser[key] = [...user[key]];
        } else if (typeof user[key] === "object") {
          newUser[key] = { ...user[key] };
        } else {
          newUser[key] = user[key];
        }
      }
      let [parent, child] = name.split(".");
      newUser[parent][child] = value;
      setUser(newUser);
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const addPhone = async phone => {
    setUser({
      ...user,
      Phones: [...user.Phones, phone]
    });
  };

  const addEmail = async email => {
    setUser({
      ...user,
      Emails: [...user.Emails, email]
    });
  };

  const register = async () => {
    try {
      const results = await api.postData("register", user, buildHeaders());
      console.log(results);
      flash.success(`User: ${FullName(results.Name)} registered`);
      window.location = "/users";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormUser user={user} fieldChanged={fieldChanged} />
        <TableEmails emails={user.Emails} addEmail={addEmail} />
        <TablePhones phones={user.Phones} addPhone={addPhone} />
        <Button
          intent="primary"
          icon="floppy-disk"
          text="Save"
          onClick={register}
        />
      </Card>
    </div>
  );
};

export default UserNew;
