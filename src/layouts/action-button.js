import React from "react";
import "./action-button.css";
export default function ActionButton(props) {
  //
  return (
    <>
      <button
        className={["rcl-action-button", props.className].join(" ").trim()}
        {...props}
      >
        ...
      </button>
    </>
  );
}
