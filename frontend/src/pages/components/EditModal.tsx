import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Image, X } from 'lucide-react';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import defaultProfile from '../../assets/defaultProfile.svg';
import { useUserStore } from '../../store/userStore';
import { ContentItem } from '@/types/content';
import { getPostDetail, updatePost } from '@/api/PostApi';
interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number;
  onUpdateSuccess?: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  postId,
  onUpdateSuccess,
}) => {
  const { username, userNickname } = useUserStore();
  const [postContent, setPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalPost, setOriginalPost] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [charactersRemaining, setCharactersRemaining] = useState(500);

  useEffect(() => {
    if (isOpen && postId) {
      fetchPostData();
    }
  }, [isOpen, postId]);

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      let postData;
      try {
        postData = await getPostDetail(postId);
      } catch (apiError) {
        console.warn('API 호출 실패, 목데이터를 사용합니다:', apiError);
        const mockData = await getMockData();
        postData = mockData.find((post) => post.id === postId);

        if (!postData) {
          throw new Error('목데이터에서도 게시글을 찾을 수 없습니다.');
        }
      }

      if (postData) {
        setOriginalPost(postData as unknown as ContentItem);
        setPostContent(postData.content);
        setCharactersRemaining(500 - postData.content.length);

        if (postData.image) {
          setSelectedImage(postData.image as string);
          setOriginalImageUrl(postData.image as string);
          setIsImageRemoved(false);
        } else {
          setSelectedImage(null);
          setOriginalImageUrl(null);
        }
      } else {
        console.error(`Post with ID ${postId} not found`);
        alert(
          JSON.stringify({
            title: '게시글을 찾을 수 없음',
            description: '요청하신 게시글을 찾을 수 없습니다.',
            variant: 'destructive',
          }),
        );
        onOpenChange(false);
      }
    } catch (error) {
      console.error('게시글 가져오기 실패 (API 및 목데이터):', error);
      alert(
        JSON.stringify({
          title: '게시글 로딩 실패',
          description: '게시글을 불러오는 중 오류가 발생했습니다.',
          variant: 'destructive',
        }),
      );
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock 데이터
  const getMockData = async () => {
    return [
      {
        id: 1,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'sebeen',
          nickname: 'sebnson',
        },
        likes: 12,
        comments: 1,
        image: null,
        useYn: true,
      },
    ];
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedImageFile(file);
      setIsImageRemoved(false);
      console.log('File selected:', file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSelectedImageFile(null);
    setIsImageRemoved(true);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= 500) {
      setPostContent(newContent);
      setCharactersRemaining(500 - newContent.length);
    }
  };

  const handleSubmit = async () => {
    if (!isPostButtonEnabled) return;

    setIsLoading(true);

    try {
      // 이미지 처리 로직
      let imageToSend = null;

      if (selectedImageFile) {
        imageToSend = selectedImageFile;
      } else if (isImageRemoved) {
        imageToSend = null;
      } else if (originalImageUrl) {
        imageToSend = originalImageUrl;
      }

      // API 호출
      const response = await updatePost(postId, {
        content: postContent,
        image: imageToSend,
      });

      console.log('게시글 수정 성공:', response);

      // 성공 알림
      alert(
        JSON.stringify({
          title: '수정 완료',
          description: '게시글이 성공적으로 수정되었습니다.',
          variant: 'default',
        }),
      );

      onOpenChange(false);

      // 수정 성공 콜백 호출 (목록 새로고침 등)
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 수정에 실패했습니다.';

      alert(
        JSON.stringify({
          title: '수정 실패',
          description: errorMessage,
          variant: 'destructive',
        }),
      );

      console.error('게시글 수정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setPostContent('');
      setSelectedImage(null);
      setSelectedImageFile(null);
      setOriginalImageUrl(null);
      setIsImageRemoved(false);
      setOriginalPost(null);
      setCharactersRemaining(500);
    }
  }, [isOpen]);

  const isPostButtonEnabled = postContent.trim().length > 0 && !isLoading;

  if (isLoading && !originalPost) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex justify-center py-8">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                로딩 중...
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle className="font-['Pretendard']">게시글 수정</DialogTitle>
        </DialogHeader>
        <div className="flex items-start">
          <div className="w-12 h-12">
            <img src={defaultProfile} alt="profile" />
          </div>
          <div className="mt-1 ml-1.5">
            <p className="text-lg font-['Pretendard'] font-bold">{username}</p>
            <div className="-mt-2 text-[14px] text-[#4d4d4d] font-['Pretendard']">
              <p>{userNickname}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              placeholder="수정할 내용을 입력하세요"
              value={postContent}
              onChange={handleContentChange}
              className="w-full min-h-[200px] resize-none p-3 rounded-md bg-gray-100 font-['Pretendard']"
              disabled={isLoading}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {charactersRemaining}/500
            </div>
          </div>

          {selectedImage && (
            <div className="mt-2 relative inline-block">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                className="absolute -top-2 -right-2 bg-[#b8b8b8] bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                onClick={handleDeleteImage}
                type="button"
                disabled={isLoading}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div
              className={`cursor-pointer text-[#B8B8B8] hover:text-[#111111] ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={handleImageClick}
            >
              <Image size={24} />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              id="edit-picture"
              disabled={isLoading}
            />

            <Button
              disabled={!isPostButtonEnabled}
              className={!isPostButtonEnabled ? 'opacity-90' : ''}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
              ) : null}
              수정 완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
