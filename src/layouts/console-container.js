import React from "react";
import "./console-container.css";
export default function ConsoleContainer(props) {
  const { isShow } = props;
  return (
    <div
      id="console-container"
      className={["console-container", !isShow ? "hidden" : ""].join(" ").trim()}
    ></div>
  );
}
