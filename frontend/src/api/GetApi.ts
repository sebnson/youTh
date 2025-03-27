export interface MyFeedResponse {
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
  userId: number;
  nickname: string;
  likes: number;
  comments: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyFeed = async (userId: number): Promise<MyFeedResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/by-user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('사용자 데이터 조회 실패:', error);
    throw new Error(
      `사용자 데이터 조회 실패: ${error.message || '알 수 없는 오류'}`,
    );
  }
};
