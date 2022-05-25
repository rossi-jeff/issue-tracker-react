import React from "react";
import { Breadcrumbs, Tab, Tabs } from "@blueprintjs/core";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";

const Home = props => {
  const items = [{ href: "/", text: "Home" }];
  const [resources, setResources] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    const api = new ApiFetch();

    const loadResources = async () => {
      const results = await api.getData("resource", {}, buildHeaders());
      if (results.length) setSelected(results[0].Id);
      setResources(results);
      setFetched(true);
    };

    loadResources();
  }, [fetched]);

  const TabContent = props => {
    const { Details, Url } = props;
    return (
      <div style={{ padding: "1em", width: "70%" }}>
        <div style={{ marginBottom: "1em" }}>{Details}</div>
        <a
          href={Url}
          target="_blank"
          style={{ float: "right" }}
          rel="noreferrer"
        >
          Visit
        </a>
        <div style={{ clear: "right" }}></div>
      </div>
    );
  };

  return (
    <div>
      <Breadcrumbs items={items} />
      <h3>Welcome to Issue Tracker</h3>
      <div style={{ marginBottom: "1em" }}>
        This site is a functional example of an issue tracking application. All
        of the existing data has been generated randomly. It is not intended to
        be used as a replacement for current leaders in the field such as Jira.
        The goal of the site is simply a proof of concept for an issue tracking
        application.
      </div>
      <div style={{ marginBottom: "1em" }}>
        Construction of the site used the component based framewok React, with
        the blueprintjs UI components. The benefit of using a component based
        framework is that it becomes easier to follow the DRY ( don't repeat
        yourself ) principle. In addition, effort was made not to reinvent the
        wheel. In so doing, the open source packages listed below were utilized.
      </div>
      <div style={{ marginBottom: "2em" }}>
        This site is one of three front end applications using the frameworks
        Vue, React, and Svelte Kit respectively
      </div>
      <Tabs id="resource-tabs" selectedTabId={selected} onChange={setSelected}>
        {resources.map(resource => (
          <Tab
            key={resource.Id}
            id={resource.Id}
            title={resource.Name}
            panel={<TabContent Details={resource.Details} Url={resource.Url} />}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Home;
