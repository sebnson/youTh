import { Heart, House, UserRound, Plus, Power } from 'lucide-react';
import { useState } from 'react';
import iconImage from '../../assets/icon.svg';
import PostModal from '@/pages/components/PostModal';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/api/LoginApi';

const LNB = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToMainFeed = () => {
    navigate('/');
  };

  const goToMyFeed = () => {
    navigate('/myFeed');
  };

  const handleLogout = async ({ id }: { id: number }) => {
    const result = await logoutUser({ id });
    if (result.status === 200) {
      alert('삭제 성공');
    } else {
      alert('삭제 실패');
    }
  };

  return (
    <>
      <nav className="fixed w-[76px] h-full min-h-[30rem] top-0 left-0 flex flex-col items-center z-20">
        {/* 로고 */}
        <div className="nav-header-container py-4">
          <img src={iconImage} alt="logo" />
        </div>

        {/* 버튼 아이콘 */}
        <div className="flex flex-col justify-center items-center flex-grow nav-footer-container">
          <div
            className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded"
            onClick={goToMainFeed}
          >
            <House size={24} />
          </div>

          <div
            className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={24} />
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
            <Heart size={24} />
          </div>
          <div
            className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded"
            onClick={goToMyFeed}
          >
            <UserRound size={24} />
          </div>
          <div
            className="flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl w-16 h-16 text-[#B8B8B8] hover:text-[#111111] nav-footer-rounded"
            onClick={() => handleLogout({ id: 2 })}
          >
            <Power size={24} />
          </div>
        </div>
      </nav>
      <PostModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default LNB;
