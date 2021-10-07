import React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";

const NavMenu = props => {
  return (
    <Menu large={false}>
      <MenuItem text="Home" href="/" />
      <MenuItem text="DashBoard" href="/dashboard" />
      <MenuItem text="Projects" href="/projects" />
      <MenuItem text="Issues" href="/issues" />
      <MenuItem text="Users" href="/users" />
      <MenuItem text="TimeClock" href="/timeclock" />
    </Menu>
  );
};

export default NavMenu;
