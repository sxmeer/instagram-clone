import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../../firebase';
import './CreatePost.css';
import firebase from 'firebase';
import UserContext from '../../../provider/UserContext';

const CreatePost = (props) => {
  const user = useContext(UserContext);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [uploadButtonText, setUploadButtonText] = useState('UPLOAD');
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [imageError, setImageError] = useState();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      let selectedImage = event.target.files[0];
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (allowedExtensions.exec(selectedImage.name)) {
        setImage(selectedImage);
        setLocalImageUrl(URL.createObjectURL(selectedImage));
        setImageError('');
      } else {
        setImage(null);
        setLocalImageUrl("");
        setImageError('Please select image with .jpg, .jpeg, .png, .gif extensions');
      }
    } else {
      setImageError('No Image Found');
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
            setLocalImageUrl("");
            props.onCloseHandler();
          })
      }
    )
  }

  return (
    <div className="createPost">
      {user && <div className="createPost__container">

        <div className="createPost__imageContainer">
          {localImageUrl ?
            <img
              className="createPost__image"
              alt=""
              src={localImageUrl} /> :
            <p
              style={{ textAlign: "center" }}>
              Please select a photo 🚀
          </p>}
        </div>

        {progress !== 0 && (
          <progress className="createPost__progress" value={progress} max="100" />
        )}

        <textarea
          type="text"
          rows="4"
          className="createPost__caption"
          placeholder="Caption..."
          onChange={(event) => setCaption(event.target.value)}
          value={caption} />

        <p style={{ textAlign: 'center', marginBottom: '4px' }}>{imageError}</p>


        <label style={{ textAlign: "center", padding: "4px", marginTop: "4px" }} className="primaryButton">
          <input type="file"
            className="createPost__file"
            accept="image/*"
            onChange={handleChange} />
            Select Image
        </label>

        <button
          className="primaryButton py-1 my-1"
          onClick={handleUpload}
          disabled={uploadDisabled}>
          {uploadButtonText}
        </button>

      </div>}

    </div>
  )
}

export default CreatePost;
