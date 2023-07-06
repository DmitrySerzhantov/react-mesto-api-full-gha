import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleCardClick(card) {
    props.setSelectedCard(card);
  }
  return (
    <main className="content">
      <section className="profile" aria-label="секция профиля страницы">
        <button
          className="profile__container-avatar"
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Кнопка добавления контента"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <ul className="cards" aria-label="контентная часть страницы">
        {props.cards.map((card) => (
          <Card
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </main>
  );
}
export default Main;
