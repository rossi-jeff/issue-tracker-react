import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import { useParams } from "react-router-dom";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import FormProject from "../forms/FormProject";
import { FlashHandler } from "../lib/flash-handler";

const ProjectDetail = props => {
  const session = new Session();
  let api = new ApiFetch();
  const flash = new FlashHandler();

  const { uuid } = useParams();
  const [fetched, setFetched] = React.useState(false);
  const [project, setProject] = React.useState({});

  const { signedIn } = session.data;

  const [items, setItems] = React.useState([
    { href: "/", text: "Home" },
    { href: "/projects", text: "Projects" }
  ]);

  const fieldChanged = event => {
    const { name, value } = event.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const updateProject = async () => {
    try {
      const results = await api.patchData(
        `project/${uuid}`,
        project,
        buildHeaders(session.data)
      );
      flash.success(`Project ${results.Name} updated`);
      window.location = "/projects";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  React.useEffect(() => {
    let api = new ApiFetch();

    const loadProject = async () => {
      const results = await api.getData(`project/${uuid}`, {}, buildHeaders());

      if (items.length === 2) {
        setItems([
          ...items,
          { href: `/projects/${results.UUID}`, text: results.Name }
        ]);
      }

      setProject(results);
      setFetched(true);
    };

    loadProject();
  }, [fetched, uuid, items]);

  if (!fetched) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormProject project={project} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="updated"
          text="Update"
          disabled={!signedIn}
          onClick={updateProject}
        />
      </Card>
    </div>
  );
};

export default ProjectDetail;
