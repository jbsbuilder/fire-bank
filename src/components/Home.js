// Home.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [userBalance, setUserBalance] = useState(0);

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

  return (
    <div>
      <h1>Total Money Created: ${totalMoney}</h1>
      <h2>Your Balance: ${userBalance}</h2>
    </div>
  );
};

export default Home;