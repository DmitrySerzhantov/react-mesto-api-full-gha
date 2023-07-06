import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit-add"
      title="Редактировать профиль"
      id="0"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id="input-name"
        required
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_text_name"
        name="name"
        value={name ?? ""}
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
      />
      <span id="input-name-error" className="popup__text-error">
        {" "}
      </span>
      <input
        id="input-job"
        required
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_text_job"
        name="info"
        value={description ?? ""}
        placeholder="Вид деятельности"
        onChange={(e) => setDescription(e.target.value)}
      />
      <span id="input-job-error" className="popup__text-error">
        {" "}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
