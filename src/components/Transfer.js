// Transfer.js
import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Transfer = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState(0);

  const handleTransfer = async () => {
    const recipientDoc = doc(db, "users", recipientEmail);
    const docSnap = await getDoc(recipientDoc);

    if (docSnap.exists()) {
      const recipientBalance = docSnap.data().balance;
      await updateDoc(recipientDoc, {
        balance: recipientBalance + amount
      });
      // Update sender's balance similarly
    } else {
      console.error("Recipient not found");
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default Transfer;