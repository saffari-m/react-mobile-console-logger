import React, { useEffect, useState } from "react";
import { ConsoleWrapper } from "../components/console-wrapper";
import ActionButton from "./action-button";
import ConsoleContainer from "./console-container";
import "./index-layout.css";

export default function IndexLayout(props) {
  const { perfix } = props;
  const [showConsole, setShowConsole] = useState(false);
  const consoleWrapper = new ConsoleWrapper();

  useEffect(() => {
    consoleWrapper.init(perfix);
  }, []);

  return (
    <div className="main-layout">
      <ActionButton
        onClick={() => {
          setShowConsole(!showConsole);
        }}
      />

      <ConsoleContainer isShow={showConsole} />
    </div>
  );
}
