'use client'
import React, { useState, useEffect } from 'react';

function LoadingDots() {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + '.';
        } else {
          return '.';
        }
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []); 

  return (
    <div>
      <p>Please Wait{dots}</p>
    </div>
  );
}

export default LoadingDots;


