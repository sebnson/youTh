import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Image, X } from 'lucide-react';
import { useState, useRef, ChangeEvent } from 'react';
import defaultProfile from '../../assets/defaultProfile.svg';
import { useUserStore } from '../../store/userStore';
import { createPost } from '@/pages/api/PostApi';

interface PostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPostSuccess?: () => void; // 게시 성공 시 호출될 콜백 함수
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onOpenChange,
  onPostSuccess,
}) => {
  const { userId, username, userNickname } = useUserStore();
  const [postContent, setPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Convert to Base64 for storage/submission
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
    if (e.target.value.length <= 500) {
      setPostContent(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!isPostButtonEnabled) return;

    setIsSubmitting(true);

    try {
      const response = await createPost({
        userId,
        content: postContent,
        image: selectedImageBase64,
      });

      console.log('게시글 작성 성공:', response);

      alert(
        JSON.stringify({
          title: '게시 완료',
          description: '게시글이 성공적으로 등록되었습니다.',
          variant: 'default',
        }),
      );

      resetForm();
      onOpenChange(false);

      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '게시글 작성에 실패했습니다.';

      alert(
        JSON.stringify({
          title: '게시 실패',
          description: errorMessage,
          variant: 'destructive',
        }),
      );

      console.error('게시글 작성 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPostContent('');
    setSelectedImage(null);
    setSelectedImageBase64(null);
  };

  const isPostButtonEnabled = postContent.trim().length > 0 && !isSubmitting;
  const charactersRemaining = 500 - postContent.length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle className="font-['Pretendard']">
            새로운 스레드
          </DialogTitle>
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
              placeholder="새로운 소식이 있나요?"
              value={postContent}
              onChange={handleContentChange}
              className="w-full min-h-[200px] resize-none p-3 rounded-md bg-gray-100 font-['Pretendard']"
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
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer text-[#B8B8B8] hover:text-[#111111]"
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
            />

            <Button
              disabled={!isPostButtonEnabled}
              className={!isPostButtonEnabled ? 'opacity-90' : ''}
              onClick={handleSubmit}
            >
              {isSubmitting ? '게시 중...' : '게시'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
