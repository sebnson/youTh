import { useEffect, useState, useRef, useCallback } from 'react';
import ContentCard from '@/pages/components/ContentCard.tsx';
import { ContentItem } from '@/types/content';

const MainFeed = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageSize = 5; // Number of items to load per page

  // Function to fetch contents with pagination
  const fetchContents = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      // Simulate API call with pagination
      // In a real app, you would call your API with the page number
      // For example: const response = await api.get(`/contents?page=${pageNum}&size=${pageSize}`);

      // Simulating delay for API call
      await new Promise((resolve) => setTimeout(resolve, 800));

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
        author: {
          id: 1,
          nickname: 'sebeen',
        },
        likes: 12,
        comments: 1,
      },
      {
        id: 2,
        content:
          '새로운 프로젝트를 시작했습니다! 앞으로 많은 응원 부탁드려요 😊',
        createdAt: '2024-03-27T10:15:22',
        modifiedAt: '2024-03-27T10:15:22',
        author: {
          id: 2,
          nickname: '다른사용자',
        },
        likes: 8,
        comments: 4,
      },
      {
        id: 3,
        content: '오늘 점심은 뭐 먹을까요? 추천받아요 🍛',
        createdAt: '2024-03-27T11:50:20',
        modifiedAt: '2024-03-27T11:50:20',
        author: {
          id: 3,
          nickname: 'foodie',
        },
        likes: 8,
        comments: 3,
      },
      {
        id: 4,
        content: 'React 공부하는 중인데 어렵네요 😵‍💫',
        createdAt: '2024-03-27T13:05:30',
        modifiedAt: '2024-03-27T13:05:30',
        author: {
          id: 4,
          nickname: 'developer',
        },
        likes: 15,
        comments: 4,
      },
      {
        id: 5,
        content: '운동하고 왔어요! 개운하다 💪',
        createdAt: '2024-03-27T15:20:00',
        modifiedAt: '2024-03-27T15:20:00',
        author: {
          id: 5,
          nickname: 'runner',
        },
        likes: 30,
        comments: 6,
      },
      {
        id: 6,
        content: '다음 여행지는 어디로 갈까요? ✈️',
        createdAt: '2024-03-27T17:10:45',
        modifiedAt: '2024-03-27T17:10:45',
        author: {
          id: 6,
          nickname: 'traveler',
        },
        likes: 12,
        comments: 7,
      },
      {
        id: 7,
        content: '새로운 노트북을 샀어요! 성능이 대박이에요 💻',
        createdAt: '2024-03-27T18:45:15',
        modifiedAt: '2024-03-27T18:45:15',
        author: {
          id: 7,
          nickname: 'techguy',
        },
        likes: 22,
        comments: 3,
      },
      {
        id: 8,
        content: '요즘 날씨가 좋아서 기분도 좋아요 ☀️',
        createdAt: '2024-03-27T19:30:25',
        modifiedAt: '2024-03-27T19:30:25',
        author: {
          id: 8,
          nickname: 'sunny',
        },
        likes: 18,
        comments: 2,
      },
      {
        id: 9,
        content: '코딩하면서 커피 한 잔, 완벽한 조합! ☕',
        createdAt: '2024-03-27T20:45:10',
        modifiedAt: '2024-03-27T20:45:10',
        author: {
          id: 9,
          nickname: 'coder',
        },
        likes: 35,
        comments: 4,
      },
      {
        id: 10,
        content: '오늘 독서 모임 다녀왔어요. 좋은 책 추천해 주세요 📖',
        createdAt: '2024-03-27T21:55:35',
        modifiedAt: '2024-03-27T21:55:35',
        author: {
          id: 10,
          nickname: 'booklover',
        },
        likes: 27,
        comments: 8,
      },
      {
        id: 11,
        content: '하루를 마무리하며 조용히 음악 듣는 중 🎶',
        createdAt: '2024-03-27T22:10:50',
        modifiedAt: '2024-03-27T22:10:50',
        author: {
          id: 11,
          nickname: 'musicfan',
        },
        likes: 19,
        comments: 3,
      },
      {
        id: 12,
        content: '프로그래밍 어렵지만 재밌어요! 오늘도 한 걸음 💡',
        createdAt: '2024-03-27T23:30:05',
        modifiedAt: '2024-03-27T23:30:05',
        author: {
          id: 12,
          nickname: 'newbie',
        },
        likes: 24,
        comments: 6,
      },
      {
        id: 13,
        content: '오랜만에 친구들이랑 만나서 너무 반가웠어요!',
        createdAt: '2024-03-28T01:00:20',
        modifiedAt: '2024-03-28T01:00:20',
        author: {
          id: 13,
          nickname: 'social',
        },
        likes: 20,
        comments: 5,
      },
      {
        id: 14,
        content: '드디어 다이어트 시작! 이번엔 성공하길 🙏',
        createdAt: '2024-03-28T02:30:40',
        modifiedAt: '2024-03-28T02:30:40',
        author: {
          id: 14,
          nickname: 'healthy',
        },
        likes: 31,
        comments: 10,
      },
      {
        id: 15,
        content: '하루 한 페이지 일기 쓰기 도전 중 📝',
        createdAt: '2024-03-28T04:10:10',
        modifiedAt: '2024-03-28T04:10:10',
        author: {
          id: 15,
          nickname: 'writer',
        },
        likes: 16,
        comments: 2,
      },
      {
        id: 16,
        content: '새로운 취미로 사진 찍기 시작했어요 📷',
        createdAt: '2024-03-28T05:20:50',
        modifiedAt: '2024-03-28T05:20:50',
        author: {
          id: 16,
          nickname: 'photographer',
        },
        likes: 22,
        comments: 7,
      },
      {
        id: 17,
        content: '밤하늘 별이 너무 예쁘네요 🌌',
        createdAt: '2024-03-28T07:45:30',
        modifiedAt: '2024-03-28T07:45:30',
        author: {
          id: 17,
          nickname: 'stargazer',
        },
        likes: 28,
        comments: 5,
      },
      {
        id: 18,
        content: '오늘 하루도 고생 많았어요! 푹 쉬세요 😴',
        createdAt: '2024-03-28T09:10:15',
        modifiedAt: '2024-03-28T09:10:15',
        author: {
          id: 18,
          nickname: 'nightowl',
        },
        likes: 14,
        comments: 3,
      },
      {
        id: 19,
        content: '오늘 하루도 고생 많았어요! 푹 쉬렴',
        createdAt: '2024-03-28T09:10:15',
        modifiedAt: '2024-03-28T09:10:15',
        author: {
          id: 18,
          nickname: '다부다비',
        },
        likes: 14,
        comments: 3,
      },
    ] as ContentItem[];
  };

  // Set up intersection observer for infinite scroll
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

  const handleEdit = (id: number) => {
    alert(`Editing post with ID: ${id}`);
    // edit modal 띄우기
    // post data 가져오기 (api 연결)
    // edit 후 save changes (api 연결)
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
    </div>
  );
};

export default MainFeed;
