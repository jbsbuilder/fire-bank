// Transfer.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setMessage('You must be signed in to make a transfer.');
      return;
    }

    if (!recipientEmail || !amount) {
      setMessage('Please fill in all fields.');
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    try {
      const senderDocRef = doc(db, "users", user.uid);

      // Query Firestore to find the recipient by email
      const q = query(collection(db, "users"), where("email", "==", recipientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('Recipient not found.');
        return;
      }

      const recipientDocRef = querySnapshot.docs[0].ref;
      const recipientDoc = querySnapshot.docs[0].data();

      const senderDoc = await getDoc(senderDocRef);

      if (!senderDoc.exists()) {
        setMessage('Sender not found.');
        return;
      }

      const senderBalance = senderDoc.data().balance;
      if (senderBalance < amountNumber) {
        setMessage('Insufficient balance.');
        return;
      }

      await updateDoc(senderDocRef, {
        balance: senderBalance - amountNumber
      });

      await updateDoc(recipientDocRef, {
        balance: recipientDoc.balance + amountNumber
      });

      setMessage('Transfer successful!');
      navigate('/home'); // Navigate back to home page
    } catch (error) {
      setMessage('Transfer failed. Please try again.');
      console.error('Error transferring money:', error);
    }
  };

  return (
    <div>
      <h1>Transfer Page</h1>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Recipient Email:</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Transfer;