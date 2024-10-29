// Home.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const navigate = useNavigate

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

  const handleTransferClick = () => {
    navigate('/transfer');
  }

  return (
    <div>
      <h1>Total Money Created: ${totalMoney}</h1>
      <h2>Your Balance: ${userBalance}</h2>
      <button onClick={handleTransferClick}>Go to Transfer</button>
    </div>
  );
};

export default Home;