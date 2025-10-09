import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../components/layouts/AppLayout';
import MainLayout from '../components/layouts/MainLayout';
import { Profile, Friends } from '../pages';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <div>Home Page</div>
          },
          {
            path: '/',
            element: <div>Home page</div>
          },
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/profile/:userId',
            element: <Profile />
          },
          {
            path: '/friends',
            element: <Friends />
          },
          {
            path: '/about',
            element: <div>About Page</div>
          },
          {
            path: '/discover',
            element: <div>Discover Page</div>
          },
          {
            path: '/news',
            element: <div>News Page</div>
          },
          {
            path: '/education',
            element: <div>Education Page</div>
          },
          {
            path: '/store',
            element: <div>Store Page</div>
          },
          {
            path: '/settings',
            element: <div>Settings Page</div>
          },
          {
            path: '/guide',
            element: <div>Guide Page</div>
          },
          {
            path: '/contact',
            element: <div>Contact Page</div>
          }
        ]
      },
      {
        path: '*',
        element: <div>404 Not Found</div>
      }
    ]
  }
])

export default router;