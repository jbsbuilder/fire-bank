// SignIn.js
import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle sign-in
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default SignIn;