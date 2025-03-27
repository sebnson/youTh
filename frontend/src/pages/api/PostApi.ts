import axios from 'axios';

// const API_BASE_URL = 'http://172.16.200.108:8080/api';
const API_BASE_URL = import.meta.env.API_BASE_URL;

interface CreatePostRequest {
  userId: string;
  content: string;
  image?: string | null;
}

interface PostResponse {
  id: number;
  content: string;
  useYn: boolean;
  createdAt: string;
  userId: number;
  likes: number;
  comments: number;
}

/**
 * 게시글 작성 API 함수
 * @param postData 게시글 데이터 (유저 ID, 내용, 이미지)
 * @returns 게시글 응답 데이터
 */
export const createPost = async (
  postData: CreatePostRequest,
): Promise<PostResponse> => {
  try {
    // 내용이 500자를 초과하는지 확인
    if (postData.content.length > 500) {
      throw new Error('게시글 내용은 최대 500자까지 입력 가능합니다.');
    }

    const response = await axios.post<PostResponse>(
      `${API_BASE_URL}/boards`,
      {
        userId: postData.userId,
        content: postData.content,
        image: postData.image || null,
      },
      {
        timeout: 10000, // 10초 타임아웃 설정
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // API 에러 처리
      const errorMessage =
        error.response?.data?.message || '게시글 작성에 실패했습니다.';
      console.error('게시글 작성 API 에러:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // 기타 에러 처리
      const errorMessage =
        error instanceof Error
          ? error.message
          : '게시글 작성 중 오류가 발생했습니다.';
      console.error('게시글 작성 중 오류:', errorMessage);
      throw new Error(errorMessage);
    }
  }
};

/**
 * 게시글 목록 조회 API 함수
 * @returns 게시글 목록 응답 데이터
 */
export const getPosts = async (): Promise<PostResponse[]> => {
  try {
    const response = await axios.get<PostResponse[]>(`${API_BASE_URL}/boards`, {
      timeout: 10000, // 10초 타임아웃 설정
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        '게시글 목록을 불러오는데 실패했습니다.';
      console.error('게시글 목록 조회 API 에러:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('게시글 목록 조회 중 오류 발생:', error);
      throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    }
  }
};
