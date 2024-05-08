import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbar = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollbarStyles = {
    width: '100%',
    height: '100vh',
  };

  const thumbStyles = {
    backgroundColor: isHovered ? 'darkgray' : 'gray',
    borderRadius: '8px',
    transition: 'background-color 0.1s ease',
  };

  return (
    <Scrollbars
      style={scrollbarStyles}
      renderThumbVertical={(props) => (
        <div
          {...props}
          style={thumbStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}/>
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;