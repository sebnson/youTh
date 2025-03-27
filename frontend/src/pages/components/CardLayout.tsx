import React, { useState, useEffect } from 'react';

interface CardLayoutProps {
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDesktop = windowWidth >= 720;
  const cardWidth = 640; // 카드 너비

  const shouldShowLeftFlexAuto =
    isDesktop && (windowWidth - 76 - cardWidth) / 2 > 76;

  return (
    <div className="flex w-full h-screen pt-[5rem] pb-0">
      {isDesktop && <div className="w-[76px] flex-none"></div>}
      {shouldShowLeftFlexAuto && <div className="flex-auto"></div>}

      <div
        className={`${!isDesktop ? 'w-full' : ''} bg-[#ffffff] rounded-t-[2rem] shadow-md flex-none relative`}
        style={{
          height: 'calc(100vh - 60px)',
          width: isDesktop ? `${cardWidth}px` : '100%',
        }}
      >
        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>

      <div className="flex-auto"></div>
    </div>
  );
};

export default CardLayout;
