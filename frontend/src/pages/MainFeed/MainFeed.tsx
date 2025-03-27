import { useEffect, useState } from 'react';
import ContentCard from '@/pages/components/ContentCard.tsx';
import EditModal from '@/pages/components/EditModal';
import { ContentItem } from '@/types/content';
import { getPosts } from '@/api/PostApi';

const MainFeed = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Add state for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  // Function to fetch contents
  const fetchContents = async () => {
    try {
      setLoading(true);

      // 실제 API 호출로 게시글 목록 가져오기
      const posts = await getPosts();

      // ContentItem 형식으로 변환
      const contentItems = posts.map((post) => ({
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        modifiedAt: post.createdAt,
        userId: post.userId,
        nickname: post.nickname,
        likes: post.likes,
        comments: post.comments,
        image: null, // 기본값으로 null 사용
      })) as ContentItem[];

      setContents(contentItems);
    } catch (error) {
      console.error('게시글 목록을 가져오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleEdit = (id: number) => {
    setCurrentPostId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      console.log(`Deleting post with ID: ${id}`);
      // 삭제 API 연결 필요
      // 임시로 프론트에서만 삭제
      setContents(contents.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="py-4">
      <div className="space-y-4">
        {contents.length > 0
          ? contents.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          : !loading && (
              <div className="text-center py-4">게시글이 없습니다.</div>
            )}

        {loading && (
          <div className="text-center py-4">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                로딩 중...
              </span>
            </div>
          </div>
        )}
      </div>

      {currentPostId !== null && (
        <EditModal
          isOpen={isEditModalOpen}
          onOpenChange={(open) => {
            setIsEditModalOpen(open);
            if (!open && currentPostId) {
              fetchContents();
              setCurrentPostId(null);
            }
          }}
          postId={currentPostId}
        />
      )}
    </div>
  );
};

export default MainFeed;
