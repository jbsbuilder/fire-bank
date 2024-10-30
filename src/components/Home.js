// Home.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import SignOut from './SignOut';

const Home = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().balance;
      });
      setTotalMoney(total);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserBalance(userDoc.data().balance);
        }
      } else {
        setUserBalance(0);
      }
    };

    fetchUserBalance();
  }, []);

  const handleTransferClick = () => {
    console.log('Transfer button clicked'); // Verify this log appears in the console
    navigate('/transfer');
  }

  return (
    <div>
      <h1>Total Money Created: ${totalMoney}</h1>
      <h2>Your Balance: ${userBalance}</h2>
      <button onClick={handleTransferClick}>Go to Transfer</button>
      <SignOut />
    </div>
  );
};

export default Home;