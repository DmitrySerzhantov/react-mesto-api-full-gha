import Header from './Header';
import '../pages/index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {useState, useEffect} from 'react';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {checkToken, login, register, logout} from '../utils/auth';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegesterInfoTooltip, setisRegesterInfoTooltip] = useState(false);
  const [openPopup, setOpenPopup] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const userEmail = localStorage.getItem('email');

  const [textInfoTooltip, setTextInfoTooltip] = useState('');

  useEffect(() => {
    console.log();
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userEmail) {
      api
        .getUserProfile()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });

      tokenCheck();
    }
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .setUserProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(data) {
    api
      .setInitialNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const tokenCheck = () => {
    checkToken()
      .then((user) => {
        localStorage.setItem('email', user.email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleLogin(password, email) {
    login(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem('email', email);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        setisRegesterInfoTooltip(false);
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res.data) {
          setTextInfoTooltip('Вы успешно зарегистрировались!');
          setisRegesterInfoTooltip(true);
          navigate('/sign-in');
        }
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        setisRegesterInfoTooltip(false);
        setIsInfoTooltipOpen(true);

        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header logout={logout} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onEditAvatar={(e) => {
                  setisEditAvatarPopupOpen(true);
                  setOpenPopup(e);
                }}
                onEditProfile={() => {
                  setIsEditProfilePopupOpen(true);
                }}
                onAddPlace={(e) => {
                  setisAddPlacePopupOpen(true);
                  setOpenPopup(e);
                }}
                setSelectedCard={(card) => {
                  setSelectedCard({value: true, ...card});
                }}
                loggedIn={loggedIn}
              />
            }
          />

          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegister} />}
          />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/'
            element={
              loggedIn ? (
                <Navigate to={'/'} />
              ) : (
                <Navigate to={'/sign-in'} replace />
              )
            }
          />
        </Routes>

        <Footer />
        <AddPlacePopup
          openPopup={openPopup}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          id='2'
          title='Вы уверенны?'
          name='delete-card'
          textButton='Да'
        ></PopupWithForm>
        <EditAvatarPopup
          openPopup={openPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            closeAllPopups();
          }}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegesterInfoTooltip={isRegesterInfoTooltip}
          text={textInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
