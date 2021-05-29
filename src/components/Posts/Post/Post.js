import React, { useState, useEffect, useContext } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../../firebase';
import firebase from 'firebase';
import UserContext from '../../../provider/UserContext';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmMessage from '../../UI/ConfirmMessage/ConfirmMessage';


function Post({ postId, username, caption, imageUrl, currentUser, onDeletePost }) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() })))
        })
    }
    return () => {
      unsubscribe();
    }
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments")
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    setComment('');
  }

  return (
    <div className="post">
      {deleteDialog && <ConfirmMessage
        show={deleteDialog}
        message="Are you sure you want to delete this post?"
        positiveBtn="Yes"
        negativeBtn="No"
        onPositiveBtnClick={() => onDeletePost(postId)}
        onNegativeBtnClick={() => setDeleteDialog(false)}
      />}
      <div className="post__header">
        <div className="post__headerNameContainer">
          <Avatar
            className="post__avatar"
            alt={username.toUpperCase()}
            src="/src/abc.jpg"
          />
          <h3 className="post__name">{username}</h3>
        </div>
        {currentUser && <div style={{ cursor: "pointer" }} onClick={() => setDeleteDialog(true)}>
          <DeleteIcon className="post__delete" />
        </div>}
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
        {comments.map(({ id, comment }) => {
          return (<p key={id} style={{ wordWrap: 'break-word' }}>
            <strong>{comment.username}</strong> {comment.text}
          </p>)
        })}
      </div>

      {
        user &&
        (<form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)} />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment} >Post</button>
        </form>)
      }
    </div >
  )
}

export default Post