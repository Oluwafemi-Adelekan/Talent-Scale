import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export const Tab: React.FC<TabButtonProps> = ({ isActive, onClick, children, isFirst, isLast }) => {
  const baseClasses = "px-4 py-1.5 text-sm font-medium focus:z-10 focus:ring-2 focus:ring-gray-300";
  const activeClasses = "bg-white text-[#1b3824] shadow-sm";
  const inactiveClasses = "text-gray-500 hover:bg-gray-200";
  const roundedClasses = isFirst ? "rounded-l-md" : isLast ? "rounded-r-md" : "";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${roundedClasses}`}
    >
      {children}
    </button>
  );
}; 