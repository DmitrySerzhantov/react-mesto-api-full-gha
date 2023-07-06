import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_open"}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          action="#"
          method="get"
          name={props.name}
          noValidate
          id={props.id}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="popup__button btn-save-profil"
            value="submit"
            name="submit"
          >
            {props.textButton || "Сохранить"}
          </button>
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
export default PopupWithForm;
