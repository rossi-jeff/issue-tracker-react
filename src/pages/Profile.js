import React from "react";
import { Session } from "../lib/session";
import { useParams } from "react-router-dom";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { FullName } from "../lib/fullname";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import FormUser from "../forms/FormUser";
import TableEmails from "../components/TableEmails";
import TablePhones from "../components/TablePhones";
import { FlashHandler } from "../lib/flash-handler";
import { RemoveBlanks } from "../lib/RemoveBlanks";

const Profile = props => {
  const session = new Session();
  const { uuid } = useParams();
  const flash = new FlashHandler();
  let api = new ApiFetch();

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
  const [fetched, setFetched] = React.useState(false);

  const [items, setItems] = React.useState([{ href: "/", text: "Home" }]);

  React.useEffect(() => {
    let api = new ApiFetch();

    const loadUser = async () => {
      const results = await api.getData(`user/${uuid}`, {}, buildHeaders());

      if (items.length === ``) {
        setItems([
          ...items,
          {
            text: `Profile: ${FullName(results.Name)}`,
            href: `/users/${results.UUID}`
          }
        ]);
      }

      setUser(results);
      setFetched(true);
    };

    loadUser();
  }, [fetched, uuid, items]);

  const { signedIn } = session.data;

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
    let results;
    try {
      if (phone.Id) {
        results = await api.patchData(
          `phone/${phone.UUID}`,
          phone,
          buildHeaders(session.data)
        );
        let dupe = [];
        for (let phone of user.Phones) {
          if (phone.UUID === results.UUID) {
            dupe.push(results);
          } else {
            dupe.push(phone);
          }
        }
        setUser({
          ...user,
          Phones: dupe
        });
        flash.success(`Phone: ${results.Number} updated`);
      } else {
        results = await api.postData(
          `user/${uuid}/phone`,
          phone,
          buildHeaders(session.data)
        );
        setUser({
          ...user,
          Phones: [...user.Phones, results]
        });
        flash.success(`Phone: ${results.Number} added`);
      }
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  const addEmail = async email => {
    let results;
    try {
      if (email.Id) {
        results = await api.patchData(
          `email/${email.UUID}`,
          email,
          buildHeaders(session.data)
        );
        let dupe = [];
        for (let email of user.Emails) {
          if (email.UUID === results.UUID) {
            dupe.push(results);
          } else {
            dupe.push(email);
          }
        }
        setUser({
          ...user,
          Emails: dupe
        });
        flash.success(`Email: ${results.Address} updated`);
      } else {
        results = await api.postData(
          `user/${uuid}/email`,
          email,
          buildHeaders(session.data)
        );
        setUser({
          ...user,
          Emails: [...user.Emails, results]
        });
        flash.success(`Email: ${results.Address} added`);
      }
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  const updateUser = async () => {
    try {
      const results = await api.patchData(
        `user/${uuid}`,
        RemoveBlanks(user),
        buildHeaders(session.data)
      );
      setUser(results);
      flash.success(`User: ${FullName(results.Name)} updated`);
      window.location = "/users";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormUser user={user} fieldChanged={fieldChanged} />
        <TableEmails emails={user.Emails} addEmail={addEmail} />
        <TablePhones phones={user.Phones} addPhone={addPhone} />
        <Button
          intent="primary"
          icon="updated"
          text="Update"
          disabled={!signedIn}
          onClick={updateUser}
        />
      </Card>
    </div>
  );
};

export default Profile;
