import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  React.useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);
  return (
    <PopupWithForm
      openPopup={props.openPopup}
      onSubmit={handleSubmit}
      name="cards-add"
      title="Новое место"
      id="1"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        id="input-name-card"
        type="text"
        className="popup__input popup__input_text_name-card"
        name="nameCards"
        placeholder="Название"
        value={cardName ?? ""}
        onChange={(e) => setCardName(e.target.value)}
      />
      <span id="input-name-card-error" className="popup__text-error">
        {" "}
      </span>
      <input
        required
        id="input-link"
        type="url"
        className="popup__input popup__input_img_link"
        name="linkImg"
        placeholder="Ссылка на картинку"
        value={cardLink ?? ""}
        onChange={(e) => setCardLink(e.target.value)}
      />
      <span id="input-link-error" className="popup__text-error">
        {" "}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
