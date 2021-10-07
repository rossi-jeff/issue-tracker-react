import React from "react";
import { Breadcrumbs, Button } from "@blueprintjs/core";
import { FlashHandler } from "../lib/flash-handler";

const Home = props => {
  const flash = new FlashHandler();

  const items = [{ href: "/", text: "Home" }];

  const testSuccess = () => {
    flash.success("test message");
  };

  const testError = () => {
    flash.error("test message");
  };

  const testInfo = () => {
    flash.info("test message");
  };

  return (
    <div>
      <Breadcrumbs items={items} />
      <Button
        text="Success"
        intent="success"
        icon="tick-circle"
        onClick={testSuccess}
        className="margin-r"
      />
      <Button
        text="Error"
        intent="danger"
        icon="warning-sign"
        onClick={testError}
        className="margin-r"
      />
      <Button
        text="Info"
        icon="info-sign"
        onClick={testInfo}
        className="margin-r"
      />
    </div>
  );
};

export default Home;
