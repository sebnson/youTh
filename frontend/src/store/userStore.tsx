import { create } from 'zustand';

interface UserState {
  userId: string;
  username: string;
  userNickname: string;
  setUserInfo: (userId: string, username: string, userNickname: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: '1', // Mock
  username: 'sebeen son', // mock
  userNickname: 'sebnson', // mock
  setUserInfo: (userId, username, userNickname) =>
    set({ userId, username, userNickname }),
}));
