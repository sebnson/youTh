import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://172.16.200.108:8080/api';

interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
  useYn: boolean;
  createdAt: string;
  modifiedAt: string;
}

interface LogoutRequest {
  id: number
}

interface LogoutResponse {
  status: number
}

/**
 * 로그인 API 함수
 * @param loginData 로그인 요청 데이터 (이메일, 비밀번호, 로그인 상태 유지)
 * @returns 로그인 응답 데이터
 */
export const loginUser = async (
  loginData: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/users/login`,
      loginData,
    );

    // 로그인 성공 시 사용자 정보를 스토어에 저장
    if (response.data && response.status === 200) {
      const { id, name, nickname } = response.data;
      const userStore = useUserStore.getState();
      userStore.setUserInfo(id, name, nickname);

      // 로그인 상태 유지 옵션이 true인 경우 세션 스토리지에 저장
      if (loginData.rememberMe) {
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            userId: String(id),
            username: name,
            userNickname: nickname,
          }),
        );
      }
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // API 에러 처리
      const errorMessage =
        error.response?.data?.message || '로그인에 실패했습니다.';
      console.error('로그인 API 에러:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // 기타 에러 처리
      console.error('로그인 중 알 수 없는 에러 발생:', error);
      throw new Error('로그인 중 오류가 발생했습니다.');
    }
  }
};

/**
 * 자동 로그인 함수 (세션 스토리지에 저장된 사용자 정보를 불러와 스토어에 설정)
 * @returns 로그인 상태 여부 (boolean)
 */
export const autoLogin = (): boolean => {
  const savedUser = sessionStorage.getItem('user');

  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      const userStore = useUserStore.getState();
      userStore.setUserInfo(
        userData.userId || '',
        userData.username || '',
        userData.userNickname || '',
      );
      return true;
    } catch (error) {
      console.error('자동 로그인 중 오류 발생:', error);
      sessionStorage.removeItem('user');
    }
  }

  return false;
};

// 로그아웃
export const logoutUser = async (
  logoutData: LogoutRequest,
): Promise<LogoutResponse> => {
  try {
    const response = await axios.post<LogoutResponse>(
      `${API_BASE_URL}/users/logout`,
      logoutData,
    );
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error); // 자세한 오류 로깅
    throw new Error(`로그아웃 실패: ${error.message || '알 수 없는 오류'}`);
  }
};
