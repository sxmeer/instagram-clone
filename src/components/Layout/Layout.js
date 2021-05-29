import React, { useContext, useState } from 'react'
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../UI/Modal/Modal';
import CreatePost from '../Posts/CreatePost/CreatePost';
import './Layout.css';
import UserContext from '../../provider/UserContext';
import { Redirect, Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';

const Layout = (props) => {

  const user = useContext(UserContext);

  const [isOpenCreatePost, setOpenCreatePost] = useState(false);

  const toggleCreatePost = () => {
    setOpenCreatePost(prevState => !prevState);
  }

  return (
    <div>
      <Header {...props} />
      <Switch>
        <Route path="/posts" exact component={Posts} />
        <Route path="/profile" exact component={Profile} />
        <Redirect from="/" exact to="/posts" />
      </Switch>
      {user && <><Fab
        style={{ position: "fixed" }}
        className="floatingActionButton"
        onClick={toggleCreatePost}
        color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        <Modal show={isOpenCreatePost} closeModal={toggleCreatePost}>
          <CreatePost onCloseHandler={toggleCreatePost} />
        </Modal></>}
    </div >
  );
}

export default Layout;
