import React from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button,
  Colors,
  Popover,
  Icon
} from "@blueprintjs/core";
import NavMenu from "./NavMenu";
import DialogLogin from "../dialogs/DialogLogin";

const NavBar = props => {
  return (
    <Navbar
      fixedToTop={true}
      style={{ color: Colors.WHITE, background: Colors.COBALT1 }}
    >
      <NavbarGroup>
        <Popover content={<NavMenu />}>
          <Button className="bp3-minimal" title="Open Menu" color="white">
            <Icon icon="menu" color="white" />
          </Button>
        </Popover>
        <NavbarDivider />
        <NavbarHeading>Issue Tracker</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup className="bp3-align-right">
        <DialogLogin />
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
