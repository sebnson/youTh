import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Image, X } from 'lucide-react';
import { useState, useRef } from 'react';
import defaultProfile from '../../assets/defaultProfile.svg';
import { useUserStore } from '../../store/userStore';

const PostModal = () => {
  const { userId, username, userNickname } = useUserStore();
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    // Show state values in an alert dialog with user information and full base64 image string
    alert(
      `유저 ID: ${userId}\n` +
        `유저 이름: ${username}\n` +
        `유저 닉네임: ${userNickname}\n` +
        `게시 내용: ${postContent}\n` +
        `이미지: ${selectedImageBase64 || '없음'}`,
    );

    // Here you would typically send the data to your backend
    // The complete base64 string is stored in selectedImageBase64
  };

  const isPostButtonEnabled = postContent.trim().length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-[#F1F1F1] hover:rounded-2xl text-[#B8B8B8] hover:text-[#111111]">
          <Plus size={24} />
        </div>
      </DialogTrigger>
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
            <p className="text-lg font-['Pretendard'] font-bold">
              {username || 'username'}
            </p>
            <div className="-mt-2 text-[14px] text-[#4d4d4d] font-['Pretendard']">
              <p>{userNickname || 'nickname'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            placeholder="새로운 소식이 있나요?"
            value={postContent}
            onChange={handleContentChange}
            className="w-full min-h-[100px] resize-none p-3 rounded-md bg-gray-100 font-['Pretendard']"
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
              게시
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
