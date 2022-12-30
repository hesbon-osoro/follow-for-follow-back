import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrement the countdown value in local storage
      const newCountdown = Number(localStorage.getItem('countdown')) - 1;
      localStorage.setItem('countdown', JSON.stringify(newCountdown));
      setCountdown(newCountdown);
    }, 60000); // Run every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {countdown > 0 ? (
        <h2>Refresh in {countdown}min.</h2>
      ) : (
        <h2>Try refreshing now.</h2>
      )}
    </>
  );
};

export default CountdownTimer;
