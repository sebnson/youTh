const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://10.10.140.100:8080/api';

interface CreatePostRequest {
  user_id: number;
  content: string;
  id: number;
}

interface UpdatePostRequest {
  content: string;
  image?: File | null | string;
}

interface PostResponse {
  id: number;
  content: string;
  useYn: boolean;
  createdAt: string;
  userId: number;
  nickname: string;
  likes: number;
  comments: number;
}

interface PostDetailResponse {
  id: number;
  content: string;
  useYn: boolean;
  createdAt: string;
  modifiedAt: string;
  user: {
    id: number;
    email: string;
    name: string;
    nickname: string;
  };
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
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: postData.user_id,
        content: postData.content,
        image: postData.image || null,
      }),
      signal: AbortSignal.timeout(10000), // 10초 타임아웃 설정
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 작성 API 에러:', error.message);
      throw new Error(error.message);
    } else {
      console.error('게시글 작성 중 오류:', error);
      throw new Error('게시글 작성 중 오류가 발생했습니다.');
    }
  }
};

/**
 * 게시글 목록 조회 API 함수
 * @returns 게시글 목록 응답 데이터
 */
export const getPosts = async (): Promise<PostResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10초 타임아웃 설정
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || '게시글 목록을 불러오는데 실패했습니다.',
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 목록 조회 API 에러:', error.message);
      throw new Error(error.message);
    } else {
      console.error('게시글 목록 조회 중 오류 발생:', error);
      throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    }
  }
};

/**
 * 게시글 수정 API 함수
 * @param postId 수정할 게시글 ID
 * @param updateData 수정할 게시글 데이터 (내용, 이미지)
 * @returns 수정된 게시글 응답 데이터
 */
export const updatePost = async (
  postId: number,
  updateData: UpdatePostRequest,
): Promise<PostDetailResponse> => {
  try {
    const formData = new FormData();
    formData.append('content', updateData.content);

    if (updateData.image instanceof File) {
      formData.append('image', updateData.image);
    } else if (updateData.image === null) {
      // 이미지 삭제를 위한 표시
      formData.append('imageRemoved', 'true');
    }

    const response = await fetch(`${API_BASE_URL}/boards/${postId}`, {
      method: 'PATCH',
      body: formData,
      signal: AbortSignal.timeout(15000), // 15초 타임아웃 설정
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '게시글 수정에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 수정 API 에러:', error.message);
      throw new Error(error.message);
    } else {
      console.error('게시글 수정 중 오류:', error);
      throw new Error('게시글 수정 중 오류가 발생했습니다.');
    }
  }
};

/**
 * 게시글 상세 조회 API 함수
 * @param postId 조회할 게시글 ID
 * @returns 게시글 상세 정보
 */
export const getPostDetail = async (
  postId: number,
): Promise<PostDetailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/boards/${postId}`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000), // 10초 타임아웃 설정
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '게시글을 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 조회 API 에러:', error.message);
      throw new Error(error.message);
    } else {
      console.error('게시글 조회 중 오류 발생:', error);
      throw new Error('게시글을 불러오는데 실패했습니다.');
    }
  }
};
