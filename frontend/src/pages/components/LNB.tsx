import { Heart, House, Plus, UserRound } from 'lucide-react';
import iconImage from '../../assets/icon.svg';

const LNB = () => {
  return (
    <nav className="fixed w-[76px] h-full min-h-[30rem] top-0 left-0 flex flex-col items-center z-10">
      {/* 로고 */}
      <div className="nav-header-container py-4">
        <img src={iconImage} alt="logo" />
      </div>

      {/* 버튼 아이콘 */}
      <div className="flex flex-col justify-center items-center flex-grow nav-footer-container">
        <div className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded">
          <House size={24} />
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded">
          <Plus size={24} />
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded">
          <Heart size={24} />
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded">
          <UserRound size={24} />
        </div>
      </div>
    </nav>
  );
};

export default LNB;
