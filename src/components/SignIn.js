// SignIn.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { createUserDocument, updateUserBalance } from '../firestore';

const SignIn = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await createUserDocument(user);
        await updateUserBalance(user.uid, 100); // Add $100 to the user's balance
        navigate('/home'); // Redirect to home page after sign-in
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