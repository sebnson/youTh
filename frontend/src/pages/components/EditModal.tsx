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

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  postId,
}) => {
  const { userId, username, userNickname } = useUserStore();
  const [postContent, setPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalPost, setOriginalPost] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && postId) {
      fetchPostData();
    }
  }, [isOpen, postId]);

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      // api 호출
      // const response = await fetch(`/api/posts/${postId}`);
      // const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data
      const mockContents = await getMockData();
      const postData = mockContents.find((post) => post.id === postId);

      if (postData) {
        setOriginalPost(postData);
        setPostContent(postData.content);

        if (postData.image) {
          setSelectedImage(postData.image);
          setSelectedImageBase64(postData.image);
        } else {
          setSelectedImage(null);
          setSelectedImageBase64(null);
        }
      } else {
        console.error(`Post with ID ${postId} not found`);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock
  const getMockData = async () => {
    return [
      {
        id: 1,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        author: {
          id: 1,
          nickname: 'sebeen',
        },
        likes: 12,
        comments: 1,
        image: null,
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

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImageBase64(base64String);
      };
      reader.readAsDataURL(file);
      console.log('File selected:', file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSelectedImageBase64(null);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch(`/api/posts/${postId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     content: postContent,
      //     image: selectedImageBase64,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update post');
      // }

      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 500));

      alert(
        `게시글 ID: ${postId}\n` +
          `유저 ID: ${userId}\n` +
          `유저 이름: ${username}\n` +
          `유저 닉네임: ${userNickname}\n` +
          `수정된 내용: ${postContent}\n` +
          `이미지: ${selectedImageBase64 || '없음'}`,
      );

      onOpenChange(false);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('게시글 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setPostContent('');
      setSelectedImage(null);
      setSelectedImageBase64(null);
      setOriginalPost(null);
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
          <textarea
            placeholder="수정할 내용을 입력하세요"
            value={postContent}
            onChange={handleContentChange}
            className="w-full min-h-[200px] resize-none p-3 rounded-md bg-gray-100 font-['Pretendard']"
            disabled={isLoading}
          />

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
              id="picture"
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
