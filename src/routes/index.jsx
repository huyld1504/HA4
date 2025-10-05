import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../components/layouts/AppLayout';
import MainLayout from '../components/layouts/MainLayout';

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