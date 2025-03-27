import { Heart, MessageCircle, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ContentItem } from '@/types/content';
import { useUserStore } from '@/store/userStore';
import defaultProfile from '../../assets/defaultProfile.svg';
import { MyFeedResponse } from '@/api/GetApi';

interface ContentCardProps {
  item: ContentItem | MyFeedResponse | undefined;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ContentCard = ({ item, onEdit, onDelete }: ContentCardProps) => {
  const { userId } = useUserStore();
  const [isLiked, setIsLiked] = useState(false);
  const isAuthor = userId === item.userId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // 좋아요api 호출 업데이트
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item?.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item?.id);
    }
  };

  return (
    <div className="w-[90%] mx-auto flex items-center border-b border-gray-200 py-4">
      <div className="space-y-3">
        {/* 프로필 및 작성자 정보 */}
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="w-12 h-12">
              <img
                src={defaultProfile}
                alt="profile"
                className="rounded-full"
              />
            </div>
            <div className="ml-3 flex flex-col">
              <p className="font-['Pretendard'] font-bold text-base">
                {item?.nickname}
              </p>
              <p className="font-['Pretendard'] text-sm text-gray-500">
                {formatDate(item?.createdAt)}
                {item?.modifiedAt &&
                  item?.modifiedAt !== item?.createdAt &&
                  ' (수정됨)'}
              </p>
            </div>
          </div>

          {/* 작성자인 경우 수정/삭제 버튼 표시 */}
          {isAuthor && (
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Edit post"
              >
                <Pencil size={16} className="text-gray-500" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Delete post"
              >
                <Trash2 size={16} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {/* 게시글 내용 */}
        <div className="pl-12">
          <p className="font-['Pretendard'] text-base whitespace-pre-wrap">
            {item?.content}
          </p>
        </div>

        {/* 좋아요 및 댓글 수 */}
        <div className="pl-12 flex items-center space-x-4">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={handleLike}
          >
            <Heart
              size={20}
              className={
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }
            />
            <span className="font-['Pretendard'] text-sm text-gray-600">
              {isLiked ? item?.likes + 1 : item?.likes}
            </span>
            {/* like하면 현재 userStore에 있는 user의 정보를 받아 likeApi로 보내야 함 */}
          </div>

          <div className="flex items-center space-x-1 cursor-pointer">
            <MessageCircle size={20} className="text-gray-500" />
            <span className="font-['Pretendard'] text-sm text-gray-600">
              {item?.comments}
            </span>
            {/* 댓글 클릭 시 해당 게시글 화면으로 넘어감: 해당 card와 달린 댓글만 보임 (컴포넌트 이동 필요) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
