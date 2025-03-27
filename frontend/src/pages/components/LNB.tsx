import { Heart, House, Plus, UserRound } from 'lucide-react';
import iconImage from '../../assets/icon.svg';

const LNB = () => {
  return (
    <div className="w-[76px] h-full min-h-[30rem] fixed top-0 left-0 flex flex-col items-center">
      {/* 로고 */}
      <div className="py-4">
        <img src={iconImage} alt="logo" />
      </div>

      {/* 버튼 아이콘 */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
          <House size={24} />
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
          <Plus size={24} />
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
          <Heart size={24} />
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
          <UserRound size={24} />
        </div>
      </div>
    </div>
  );
};

export default LNB;
