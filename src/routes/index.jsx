import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '../components/layouts/AppLayout'
import MainLayout from '../components/layouts/MainLayout'
import { Home, Events, News, EventDetail, NewsDetail, EventRegistration, VanHoaLichSu, PhanTichGocNhin, Forum } from '../pages'
import TrangChu from '../pages/Home/Home.jsx'
import GioiThieu from '../pages/GioiThieu/GioiThieu.jsx'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <TrangChu />,
          },
          {
            path: 'gioithieu',
            element: <GioiThieu />,
          },
          {
            path: 'events/:eventId',
            element: <EventDetail />,
          },
          {
            path: 'vanhoalichsu',
            element: <VanHoaLichSu />,
          },
          {
            path: 'phantichgocnhin',
            element: <PhanTichGocNhin />,
          },
          {
            path: 'forum',
            element: <Forum />,
          },
          {
            path: 'register/:eventId',
            element: <EventRegistration />,
          },
          {
            path: 'news',
            element: <News />,
          },
          {
            path: 'news/:newsId',
            element: <NewsDetail />,
          },
        ],
      },
      {
        path: '*',
        element: (
          <div className="mx-auto max-w-6xl px-4 py-24 text-center">
            <h1 className="text-4xl font-serif font-semibold text-brand-brown-900">404 - Không tìm thấy trang</h1>
            <p className="mt-4 text-brand-brown-600">Trang bạn đang tìm kiếm không tồn tại.</p>
          </div>
        ),
      },
    ],
  },
])

export default router