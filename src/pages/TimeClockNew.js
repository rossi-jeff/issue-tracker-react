import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import FormTimeClock from "../forms/FormTimeClock";
import { FlashHandler } from "../lib/flash-handler";

const TimeClockNew = props => {
  const session = new Session();
  const api = new ApiFetch();
  const flash = new FlashHandler();

  const blank = {
    Start: {
      Date: "",
      Time: ""
    },
    End: {
      Date: "",
      Time: ""
    },
    UserId: null,
    ProjectId: null,
    IssueId: null
  };

  const [timeclock, setTimeClock] = React.useState(blank);

  const items = [
    { href: "/", text: "Home" },
    { href: "/timeclock", text: "Time Clock" },
    { href: "/timeclock/new", text: "New Time Clock" }
  ];

  const fieldChanged = event => {
    const { name, value } = event.target;
    if (name.indexOf(".") > -1) {
      const newClock = {};
      for (let key in timeclock) {
        if (typeof timeclock[key] === "object") {
          newClock[key] = { ...timeclock[key] };
        } else {
          newClock[key] = timeclock[key];
        }
      }
      let [parent, child] = name.split(".");
      newClock[parent][child] = value;
      setTimeClock(newClock);
    } else {
      setTimeClock({
        ...timeclock,
        [name]: value
      });
    }
  };

  const saveTimeClock = async () => {
    try {
      await api.postData("timeclock", timeclock, buildHeaders(session.data));
      flash.success(`Time clock added`);
      window.location = "/timeclock";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  const { signedIn } = session.data;

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormTimeClock timeclock={timeclock} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="floppy-disk"
          text="Save"
          disabled={!signedIn}
          onClick={saveTimeClock}
        />
      </Card>
    </div>
  );
};

export default TimeClockNew;
