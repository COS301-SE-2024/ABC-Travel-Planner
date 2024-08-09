"use client";
import React, { useEffect } from 'react';

const ClearLocalStorage = () => {
  useEffect(() => {
    localStorage.removeItem('searchResults');
  }, []);

  return null;
};

export default ClearLocalStorage;
