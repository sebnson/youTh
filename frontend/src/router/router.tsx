import App from '@/App';
import Login from '@/pages/Login/Login';
import MainFeed from '@/pages/MainFeed/MainFeed';
import MyFeed from '@/pages/MyFeed/MyFeed';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true, // 기본 경로 ('/')
        Component: MainFeed,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'myFeed',
        Component: MyFeed,
      },
    ],
  },
]);

export default router;
