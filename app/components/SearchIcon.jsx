// File: components/Icons/SearchIcon.jsx
'use client';

import { useState } from 'react';

const AnimatedSearchIcon = ({ 
  isActive = false,
  className = "",
  size = 24,
  animateOnHover = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const shouldAnimate = isActive || (animateOnHover && isHovered);

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      {/* Background circle (animated) */}
      <div 
        className={`absolute inset-0 rounded-full bg-red-500 transition-all duration-300 ${
          shouldAnimate ? 'opacity-20 scale-110' : 'opacity-0 scale-100'
        }`}
      />
      
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`relative transition-transform duration-300 ${
          shouldAnimate ? 'scale-110' : 'scale-100'
        }`}
        width={size}
        height={size}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      
      {/* Pulse effect */}
      {shouldAnimate && (
        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30"></div>
      )}
    </div>
  );
};

export default AnimatedSearchIcon;
