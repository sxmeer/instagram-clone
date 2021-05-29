import { Avatar } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import UserContext from '../../provider/UserContext';
import { signOut } from '../../Util/authUtil';
import ConfirmMessage from '../UI/ConfirmMessage/ConfirmMessage';

const Header = (props) => {
  const user = useContext(UserContext);
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const onSignOutHandler = () => {
    signOut(() => {
      setDialogOpenState(false);
      props.history.replace("/");
    });
  }
  return (

    <div className="header">
      {dialogOpenState &&
        <ConfirmMessage
          message="Do you want to log out?"
          show={dialogOpenState}
          onNegativeBtnClick={() => { setDialogOpenState(false) }}
          onPositiveBtnClick={onSignOutHandler}
          positiveBtn="Yes"
          negativeBtn="No"
        />
      }
      <div className="header__container">

        <img
          onClick={() => {
            props.history.replace("/posts");
          }}
          className="header__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="" />

        {user ?
          <div className="header__loginContainer">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Avatar
                className="header__userAvatar"
                alt={user?.displayName?.toUpperCase()}
                src="/src/abc.jpg" />
            </Link>
            <button
              className="primaryButtonOutline ripple mx-1 py-1 px-2"
              onClick={() => { setDialogOpenState(true) }}> Log Out </button>
          </div>
          :
          <div className="header__loginContainer">
            <Link to="/login" className="primaryButton ripple mx-1 py-1 px-2"> Log in </Link>
            <Link to="/signup" className="primaryButtonOutline ripple mx-1 py-1 px-2"> Sign up </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Header;
