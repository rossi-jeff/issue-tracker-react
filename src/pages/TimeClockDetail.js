import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import { useParams } from "react-router-dom";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import FormTimeClock from "../forms/FormTimeClock";
import { FlashHandler } from "../lib/flash-handler";

const TimeClockDetail = props => {
  const session = new Session();
  let api = new ApiFetch();
  const flash = new FlashHandler();

  const { uuid } = useParams();
  const [fetched, setFetched] = React.useState(false);
  const [timeclock, setTimeClock] = React.useState({});

  const [items, setItems] = React.useState([
    { href: "/", text: "Home" },
    { href: "/timeclock", text: "Time Clock" }
  ]);

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

  const updateTimeClock = async () => {
    try {
      await api.patchData(
        `timeclock/${timeclock.UUID}`,
        timeclock,
        buildHeaders(session.data)
      );
      flash.success(`Time clock updated`);
      window.location = "/timeclock";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  React.useEffect(() => {
    let api = new ApiFetch();

    const loadTimeClock = async () => {
      const results = await api.getData(
        `timeclock/${uuid}`,
        {},
        buildHeaders()
      );

      if (items.length === 2) {
        setItems([
          ...items,
          { href: `/timeclock/${uuid}`, text: "Edit Time Clock" }
        ]);
      }

      setTimeClock(results);
      setFetched(true);
    };

    loadTimeClock();
  }, [fetched, uuid, items]);

  const { signedIn } = session.data;

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormTimeClock timeclock={timeclock} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="updated"
          text="Update"
          disabled={!signedIn}
          onClick={updateTimeClock}
        />
      </Card>
    </div>
  );
};

export default TimeClockDetail;
