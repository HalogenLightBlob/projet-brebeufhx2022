import React from "react";
import "./popup.css";

export default function Popup(props) {
  return props.trigger ? (
    <div class="popup">
      <div class="popup-inner">
        <button
          class="close-btn"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
