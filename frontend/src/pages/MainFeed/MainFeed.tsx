import { useEffect, useState, useRef, useCallback } from 'react';
import ContentCard from '@/pages/components/ContentCard.tsx';
import EditModal from '@/pages/components/EditModal';
import { ContentItem } from '@/types/content';

const MainFeed = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageSize = 5; // Number of items to load per page

  // Add state for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  // Function to fetch contents with pagination
  const fetchContents = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      // Simulate API call with pagination
      // In a real app, you would call your API with the page number
      // For example: const response = await api.get(`/contents?page=${pageNum}&size=${pageSize}`);

      // Simulating delay for API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock: Get a slice of your mock data based on page number
      // This would be replaced with actual API response data
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // This is just a placeholder - your actual data would come from API
      const mockData = await getMockData();
      const newData = mockData.slice(startIndex, endIndex);

      // Check if we've reached the end of the data
      if (newData.length < pageSize) {
        setHasMore(false);
      }

      // Add new data to existing content
      if (pageNum === 1) {
        setContents(newData);
      } else {
        setContents((prev) => [...prev, ...newData]);
      }
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to get mock data - using your provided mock data
  const getMockData = async () => {
    // Mock data from your document
    return [
      {
        id: 1,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 2,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 3,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 4,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 5,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 6,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
      {
        id: 7,
        content:
          '오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!오늘은 날씨가 정말 좋네요. 모두 즐거운 하루 되세요!',
        createdAt: '2024-03-27T12:35:10',
        modifiedAt: '2024-03-27T12:35:10',
        userId: 1,
        nickname: 'fucking',
        likes: 12,
        comments: 1,
      },
    ] as ContentItem[];
  };

  const lastContentElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1, // 요소의 10%만 보여도 감지
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore],
  );

  // 초기 로드 시 화면에 콘텐츠가 꽉 차지 않을 경우 추가 로드를 위한 체크
  useEffect(() => {
    if (!loading && contents.length > 0 && hasMore) {
      // 화면 높이와 문서 높이를 비교하여 스크롤이 생기지 않으면 추가로 콘텐츠를 로드
      const checkIfMoreContentNeeded = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // 스크롤바가 없거나 하단에 매우 가까운 경우 더 많은 콘텐츠 로드
        if (windowHeight + scrollTop >= documentHeight - 100 && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      };

      // 콘텐츠 로드 후 검사
      setTimeout(checkIfMoreContentNeeded, 100);

      // 창 크기 변경 시 재검사
      window.addEventListener('resize', checkIfMoreContentNeeded);
      return () =>
        window.removeEventListener('resize', checkIfMoreContentNeeded);
    }
  }, [loading, contents.length, hasMore]);

  // Initial load and load more when page changes
  useEffect(() => {
    fetchContents(page);
  }, [page, fetchContents]);

  // Updated edit handler to open the edit modal
  const handleEdit = (id: number) => {
    setCurrentPostId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      console.log(`Deleting post with ID: ${id}`);
      // api 연결
      setContents(contents.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="py-4">
      <div className="space-y-4">
        {contents.length > 0
          ? contents.map((item, index) => {
              if (contents.length === index + 1) {
                return (
                  <div ref={lastContentElementRef} key={item.id}>
                    <ContentCard
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                );
              } else {
                return (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              }
            })
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
              // fetch just the updated post
              fetchContents(1); // Reset to page 1 and refresh
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
