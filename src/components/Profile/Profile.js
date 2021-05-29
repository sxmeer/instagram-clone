import React, { useContext } from 'react'
import './Profile.css';
import UserContext from '../../provider/UserContext';
import { Redirect } from 'react-router-dom';
import { isSignedIn } from '../../Util/authUtil';
import { Avatar } from '@material-ui/core';
import Posts from '../Posts/Posts';
const Profile = (props) => {
  const user = useContext(UserContext);

  return (
    <div className="profile">
      {!isSignedIn() && <Redirect to="/" />}
      <div className="profile__nameSections">
        <Avatar
          className="profile__userAvatar"
          alt={user?.displayName?.toUpperCase()}
          src="/src/abc.jpg" />

        <div className="profile__desc">
          <div>Username: <span className="profile__values">{user?.displayName}</span></div>
          <div>Email: <span className="profile__values">{user?.email}</span></div>
        </div>

      </div>
      <div className="profile__postSection">
        <Posts username={user?.displayName} />
      </div>
    </div>
  )
}

export default Profile;
