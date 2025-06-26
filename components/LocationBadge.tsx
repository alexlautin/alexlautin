"use client";

import { useState, useRef } from 'react';
import { GoLocation } from 'react-icons/go';

export default function LocationBadge() {
  const locationRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (locationRef.current) {
      const rect = locationRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div 
      ref={locationRef}
      className="absolute top-4 right-4 overflow-hidden flex items-center px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform hover:scale-110 text-gray-600 hover:text-blue-500"
      style={{
        background: isHovering 
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #EFF6FF, #DBEAFE)` 
          : '#EFF6FF',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <GoLocation className="w-5 h-5 mr-1.5 text-blue-500" />
      <span className="font-medium">NYC</span>
    </div>
  );
}