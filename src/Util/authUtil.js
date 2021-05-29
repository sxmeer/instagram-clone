import { auth } from '../firebase';
export const signUp = (email, password, username, next) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      return authUser.user.updateProfile({
        displayName: username
      });
    })
    .then(() => {
      localStorage.setItem("loggedIn", true);
      next({ success: true, message: "sign up success!" });
    })
    .catch((error) => next({ success: false, message: error.message }));
}

export const signIn = (email, password, next) => {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      localStorage.setItem("loggedIn", true);
      next({ success: true, message: "Login success!" });
    })
    .catch((error) => next({ success: false, message: error.message }));
}

export const signOut = (next) => {
  auth.signOut();
  localStorage.removeItem("loggedIn");
  next();
}

export const isSignedIn = () => {
  return localStorage.getItem("loggedIn");
}