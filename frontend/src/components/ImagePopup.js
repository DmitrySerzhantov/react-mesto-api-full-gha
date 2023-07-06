import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.card.value ? `popup popup-img popup_open` : `popup popup-img`
      }
    >
      <form className="popup-img__container">
        <img
          className="popup-img__image"
          src={props.card.value ? `${props.card.link}` : `${null}`}
          alt={props.card.name}
        />
        <h2 className="popup-img__name-img">{props.card.name}</h2>
        <button
          type="button"
          className="popup__close popup-img__close-btn"
          value="close"
          name="close"
          onClick={props.onClose}
        ></button>
      </form>
    </div>
  );
}

export default ImagePopup;
