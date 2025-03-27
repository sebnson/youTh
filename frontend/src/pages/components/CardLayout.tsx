import React from 'react';

interface CardLayoutProps {
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full pt-[5rem] pb-0 justify-center px-5">
      {/* 카드 본체 */}
      <div className="w-full flex card-layout-at-700 max-w-special-nav justify-center">
        <div
          className="w-full flex bg-[#ffffff] rounded-t-[2rem] shadow-md relative w640"
          style={{ height: 'calc(100vh - 60px)' }}
        >
          <div className="flex flex-grow relative flex-col overflow-auto scrollbar-hide">
            <div className="w-[90%] mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
