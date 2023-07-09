import {Route, Routes, Link} from 'react-router-dom';
import logo from '../images/logo/Vectorlogowhit.svg';

function Header({logout}) {
  const email = localStorage.getItem('email');

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='белый логотип место ' />
      <nav className='header__nav'>
        <p className='header__email'>{email ? email : ''}</p>
        <button
          id='header__button'
          className='header__button'
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          <Routes>
            <Route
              path='/sign-up'
              element={
                <Link className='header__button' to='/sign-in'>
                  Войти
                </Link>
              }
            />
            <Route
              path='/sign-in'
              element={
                <Link className='header__button' to='/sign-up'>
                  Регистрация
                </Link>
              }
            />
            <Route
              path='/'
              element={
                <Link className='header__button' to='/sign-in'>
                  Выйти
                </Link>
              }
            />
          </Routes>
        </button>
      </nav>
    </header>
  );
}
export default Header;
