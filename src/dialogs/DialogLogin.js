import React from "react";
import { Dialog, Button, Icon } from "@blueprintjs/core";
import FormLogin from "../forms/FormLogin";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";

const DialogLogin = props => {
  const session = new Session();
  const api = new ApiFetch();
  const [open, setOpen] = React.useState(false);

  const blank = {
    Username: "",
    Password: ""
  };

  const [state, setState] = React.useState({
    ...blank
  });

  const toggleOpen = () => {
    setOpen(true);
  };

  const toggleClosed = () => {
    setOpen(false);
  };

  const fieldChanged = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const send = async () => {
    try {
      const results = await api.postData(
        "auth/login",
        state,
        buildHeaders(session.data)
      );
      session.login(results);
      toggleClosed();
    } catch (e) {
      alert("Unauthorized");
    }
  };

  const logout = async () => {
    try {
      await api.deleteData(
        `auth/${session.data.SessionId}`,
        {},
        buildHeaders(session.data)
      );
    } catch (e) {
      console.log(e);
    }
    session.logout();
    window.location = "/";
  };

  const loginButton = () => {
    if (session.data.signedIn) {
      return (
        <Button className="bp3-minimal" title="Log Out" onClick={logout}>
          <Icon icon="log-out" color="white" />
        </Button>
      );
    } else {
      return (
        <Button className="bp3-minimal" title="Log In" onClick={toggleOpen}>
          <Icon icon="log-in" color="white" />
        </Button>
      );
    }
  };

  return (
    <div>
      {loginButton()}
      <Dialog
        title="Log In"
        isOpen={open}
        onClose={toggleClosed}
        canOutsideClickClose={false}
      >
        <FormLogin
          state={state}
          fieldChanged={fieldChanged}
          send={send}
          cancel={toggleClosed}
        />
      </Dialog>
    </div>
  );
};

export default DialogLogin;
