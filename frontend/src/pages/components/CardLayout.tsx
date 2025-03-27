import React from 'react';

interface CardLayoutProps {
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-screen pt-[5rem] pb-0">
      <div className="flex-auto"></div>
      <div
        className="w-full md:w-[640px] bg-[#ffffff] rounded-t-[2rem] shadow-md flex-none relative"
        style={{
          height: 'calc(100vh - 60px)',
        }}
      >
        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>
      <div className="flex-auto"></div>
    </div>
  );
};

export default CardLayout;
