import React, { useEffect, useState } from 'react'
import Post from './Post/Post';
import { db } from '../../firebase';
import './Posts.css';
import AlertMessage from '../UI/AlertMessage/AlertMessage';


const Posts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [alertDialog, setAlertDialog] = useState(false);

  useEffect(() => {
    let query = db.collection('posts');
    if (username) {
      query = query.where("username", "==", username);
    }
    query.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })))
    })
  }, [username]);

  const onDeletePost = (postId) => {
    db.collection("posts").doc(postId).delete()
      .then(() => {
        setAlertDialog(true);
      }).catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className="posts">

      {alertDialog && <AlertMessage
        message="The post was deleted successfully"
        show={alertDialog}
        positiveBtn="OK"
        onPositiveBtnClick={() => setAlertDialog(false)}
      />}

      {posts.length === 0 ?
        (username ? (<h2 style={{ textAlign: 'center' }}>You have not posted anything🤳</h2>) :
          (<h2 style={{ textAlign: 'center' }}>Clean as slate!💩</h2>)) :
        username ? <p style={{ textAlign: 'center', marginBottom: "20px" }}>Have a look at your own posts!👌</p> :
          <p style={{ textAlign: 'center', marginBottom: "20px" }}>See what people have posted!✨</p>}
      {
        posts.map(({ id, post }) => {
          return <Post
            key={id}
            postId={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            onDeletePost={onDeletePost}
            currentUser={username} />
        }
        )
      }
    </div>
  )
}

export default Posts;
