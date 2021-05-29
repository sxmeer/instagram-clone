import React, { useState, useEffect, useContext } from 'react'
import { storage, db } from '../../firebase'
import firebase from 'firebase';
import './ImageUpload.css';
import UserContext from '../../provider/UserContext';

function ImageUpload() {
  const user = useContext(UserContext);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [uploadButtonText, setUploadButtonText] = useState('UPLOAD');

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  const checkForDisablingUploadButton = () => {
    console.log("caption", caption, "image", image);
    if (!caption || !image) {
      setUploadDisabled(true);
      setUploadButtonText('UPLOAD');
    } else {
      setUploadDisabled(false);
      setUploadButtonText('UPLOAD');
    }
  }

  useEffect(() => {
    if (!caption || !image) {
      setUploadDisabled(true);
      setUploadButtonText('UPLOAD');
    } else {
      setUploadDisabled(false);
      setUploadButtonText('UPLOAD');
    }
  }, [image, caption])

  const handleUpload = (event) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
        setUploadDisabled(true);
        setUploadButtonText('UPLOADING..')
      },
      (error) => {
        // error function
        console.log(error);
        checkForDisablingUploadButton();
        alert(error.message);
      },
      () => {
        //complete function
        storage.ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName
            })
            setProgress(0);
            setCaption('');
            setImage(null);
          })
      }
    )
  }

  return (
    <div className="imageUpload">
      {user && <div className="imageUpload__container">

        {progress !== 0 && (
          <progress className="imageUpload__progress" value={progress} max="100" />
        )}
        <input type="text" className="imageUpload__caption" placeholder="Enter a caption..." onChange={(event) => setCaption(event.target.value)} value={caption} />
        <input type="file" className="imageUpload__file" accept="image/*" onChange={handleChange} />
        <button className="primaryButton py-1 my-1" onClick={handleUpload}
          disabled={uploadDisabled}>
          {uploadButtonText}
        </button>
      </div>}

    </div>
  )
}

export default ImageUpload;