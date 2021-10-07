import React from "react";
import { buildHeaders, ApiFetch } from "../lib/api-fetch";
import CardProject from "../components/CardProject";
import { projectSort } from "../lib/project-sort";
import { Session } from "../lib/session";
import { Breadcrumbs } from "@blueprintjs/core";
import FilterProject from "../components/FilterProject";

const Projects = props => {
  const [fetched, setFetched] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const items = [
    { href: "/", text: "Home" },
    { href: "/projects", text: "Projects" }
  ];

  React.useEffect(() => {
    const api = new ApiFetch();
    const session = new Session();

    const loadProjects = async () => {
      const results = await api.getData(
        "project",
        {},
        buildHeaders(session.data)
      );
      results.sort(projectSort);
      setProjects(results);
      setCount(results.length);
      setFetched(true);
    };

    loadProjects();
  }, [fetched]);

  return (
    <div>
      <Breadcrumbs items={items} />
      <FilterProject count={count} />
      {projects.map(project => (
        <CardProject key={project.Id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
