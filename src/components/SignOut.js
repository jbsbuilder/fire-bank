import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigate('/signin');
            })
            .catch(error => {
                console.error('Error signing out: ', error);
            });
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;