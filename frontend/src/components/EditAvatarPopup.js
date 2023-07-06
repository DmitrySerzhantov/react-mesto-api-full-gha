import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useRef } from "react";

function EditAvatarPopup(props) {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);
  return (
    <PopupWithForm
      openPopup={props.openPopup}
      onSubmit={handleSubmit}
      name="avatar-update"
      title="Обновить аватар"
      id="3"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        required
        id="input-avatar"
        type="url"
        className="popup__input popup__input_img_link"
        name="linkImg"
        placeholder="Ссылка на картинку"
        ref={ref}
      />
      <span id="input-avatar-error" className="popup__text-error">
        {""}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
