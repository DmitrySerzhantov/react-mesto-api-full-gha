import React from "react";
import logoOk from "../images/logo/Union.svg";
import logoNo from "../images/logo/UnionNo.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_open"}`}
    >
      <div className="popup__container">
        <form className="infoTooltip">
          <img
            className="infoTooltip__logo"
            src={props.isRegesterInfoTooltip ? logoOk : logoNo}
            alt=""
          />
          <h2 className="infoTooltip__text">{props.text}</h2>
          <button
            type="button"
            className="popup__close"
            value="close"
            name="close"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}
export default InfoTooltip;
