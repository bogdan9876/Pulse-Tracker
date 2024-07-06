import React from 'react';
import { useSelector } from 'react-redux';
import './loader.css';

function Loader() {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <div className={`loader ${isDarkMode ? 'dark' : ''}`}>Loading...</div>
  );
}

export default Loader;