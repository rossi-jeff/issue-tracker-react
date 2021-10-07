import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import { Session } from "../lib/session";
import { Card, Elevation, Button, Breadcrumbs } from "@blueprintjs/core";
import FormProject from "../forms/FormProject";
import { FlashHandler } from "../lib/flash-handler";

const ProjectNew = props => {
  const session = new Session();
  const api = new ApiFetch();
  const flash = new FlashHandler();

  const { signedIn } = session.data;

  const blank = {
    Name: "",
    Details: ""
  };

  const [project, setProject] = React.useState(blank);

  const items = [
    { href: "/", text: "Home" },
    { href: "/projects", text: "Projects" },
    { href: "/projects/new", text: "New Project" }
  ];

  const fieldChanged = event => {
    const { name, value } = event.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const saveProject = async () => {
    try {
      const results = await api.postData(
        "project",
        project,
        buildHeaders(session.data)
      );
      flash.success(`Project: ${results.Name} added`);
      window.location = "/projects";
    } catch (e) {
      flash.error(`Error: ${e.message}`);
    }
  };

  return (
    <div>
      <Breadcrumbs items={items} />
      <Card elevation={Elevation.TWO}>
        <FormProject project={project} fieldChanged={fieldChanged} />
        <Button
          intent="primary"
          icon="floppy-disk"
          text="Save"
          onClick={saveProject}
          disabled={!signedIn}
        />
      </Card>
    </div>
  );
};

export default ProjectNew;
