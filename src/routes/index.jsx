import { createBrowserRouter } from 'react-router-dom';

import { Home, Events, News, EventDetail, NewsDetail, EventRegistration, VanHoaLichSu, PhanTichGocNhin, Forum, TraiNghiem, TaoTranh, CongNghe, GiaoDuc, BaiGiangMinhHoa, BaiGiangDetail, TaiLieuBaiGiang, TaiLieuDetail, BaiHocMinhHoaDetail, VirtualChronicle } from '../pages'
import AppLayout from '../components/layouts/AppLayout.jsx';
import MainLayout from '../components/layouts/MainLayout.jsx';

import SurveyPage from '../pages/SurveyPage';
import TrangChu from '../pages/Home/Home.jsx';
import GioiThieu from '../pages/GioiThieu/GioiThieu.jsx';
import UploadTaiLieu from '../pages/UploadTaiLieu';

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
            path: 'events/:eventId/register',
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
            path: 'giaoduc',
            element: <GiaoDuc />,
          },
          {
            path: 'bai-giang-minh-hoa',
            element: <BaiGiangMinhHoa />,
          },
          {
            path: 'tai-lieu-bai-giang',
            element: <TaiLieuBaiGiang />,
          },
          {
            path: 'bai-giang/:id',
            element: <BaiGiangDetail />,
          },
          {
            path: 'tai-lieu/:id',
            element: <TaiLieuDetail />,
          },
          {
            path: 'bai-hoc-minh-hoa/:id',
            element: <BaiHocMinhHoaDetail />,
          },
          {
            path: 'virtual-chronicle',
            element: <VirtualChronicle />,
          },
          {
            path: 'survey/:courseId',
            element: <SurveyPage />,
          },
          {
            path: 'upload-tai-lieu',
            element: <UploadTaiLieu />,
          },
          {
            path: 'trainghiem',
            element: <TraiNghiem />,
          },
          {
            path: 'taotranh',
            element: <TaoTranh />,
          },
          {
            path: 'congngheai',
            element: <CongNghe />,
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
]);

export default router;