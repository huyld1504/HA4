// Mock data cho trang Tài liệu & Bài giảng
export const periodsData = [
  {
    id: 'bac-thuoc',
    name: 'Thời kỳ Bắc thuộc',
    period: '111 TCN - 939 SCN',
    color: 'from-red-500 to-orange-500',
    description: 'Thời kỳ Việt Nam bị các triều đại phương Bắc thống trị',
    documents: [
      {
        id: 1,
        title: 'Khởi nghĩa Hai Bà Trưng',
        description: 'Làm đạo khởi nghĩa chống ánh đô hộ phương Bắc',
        type: 'Bài giảng',
        duration: '25 phút',
        level: 'Trung cấp',
        views: '2,340',
        rating: 4.8,
        author: 'GS. Nguyễn Văn Huyền',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        downloadCount: 1250,
        createdDate: '2024-09-15',
        category: 'Lịch sử'
      },
      {
        id: 2,
        title: 'Khởi nghĩa Bà Triệu',
        description: 'Sự kiện chống Bắc thuộc thế kỷ 3',
        type: 'Tài liệu',
        pages: 45,
        level: 'Cao cấp',
        views: '1,890',
        rating: 4.6,
        author: 'PGS. Trần Thị Mai',
        thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop',
        downloadCount: 867,
        createdDate: '2024-08-22',
        category: 'Lịch sử'
      }
    ]
  },
  {
    id: 'ly-tran',
    name: 'Thời kỳ Lý - Trần',
    period: '1009 - 1400',
    color: 'from-blue-500 to-indigo-500',
    description: 'Thời kỳ phát triển rực rỡ của văn hóa và kinh tế Đại Việt',
    documents: [
      {
        id: 3,
        title: 'Lý Thái Tổ',
        description: 'Người sáng lập triều Lý, ban Chiếu dời đô',
        type: 'Bài giảng',
        duration: '40 phút',
        level: 'Trung cấp',
        views: '2,890',
        rating: 4.7,
        author: 'GS. Phạm Đức Minh',
        thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
        downloadCount: 1567,
        createdDate: '2024-09-28',
        category: 'Lịch sử'
      },
      {
        id: 4,
        title: 'Chiến thắng Bạch Đằng 1288',
        description: 'Trận Hưng Đạo lành đạo chiến thắng quân Nguyên',
        type: 'Tài liệu',
        pages: 78,
        level: 'Cao cấp',
        views: '4,230',
        rating: 4.9,
        author: 'TS. Hoàng Minh Tuấn',
        thumbnail: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop',
        downloadCount: 2340,
        createdDate: '2024-09-10',
        category: 'Lịch sử'
      }
    ]
  },
  {
    id: 'tay-son',
    name: 'Thời kỳ Tây Sơn',
    period: '1771 - 1802',
    color: 'from-green-500 to-emerald-500',
    description: 'Thời kỳ cách mạng nông dân và thống nhất đất nước',
    documents: []
  },
  {
    id: 'nguyen',
    name: 'Thời kỳ Nguyễn',
    period: '1802 - 1945',
    color: 'from-purple-500 to-pink-500',
    description: 'Triều đại cuối cùng của Việt Nam phong kiến',
    documents: []
  },
  {
    id: 'hien-dai',
    name: 'Thời kỳ Hiện đại',
    period: '1945 - nay',
    color: 'from-indigo-500 to-cyan-500',
    description: 'Thời kỳ đổi mới và phát triển của Việt Nam',
    documents: []
  }
];

export const categories = [
  { id: 'all', name: 'Tất cả', count: 156 },
  { id: 'lectures', name: 'Bài giảng', count: 89 },
  { id: 'documents', name: 'Tài liệu', count: 67 },
  { id: 'history', name: 'Lịch sử', count: 45 },
  { id: 'culture', name: 'Văn hóa', count: 38 },
  { id: 'art', name: 'Nghệ thuật', count: 25 },
  { id: 'architecture', name: 'Kiến trúc', count: 19 }
];

export const levels = [
  { id: 'all', name: 'Tất cả cấp độ' },
  { id: 'basic', name: 'Cơ bản' },
  { id: 'intermediate', name: 'Trung cấp' },
  { id: 'advanced', name: 'Cao cấp' }
];

export const sortOptions = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'oldest', name: 'Cũ nhất' },
  { id: 'most-viewed', name: 'Xem nhiều nhất' },
  { id: 'highest-rated', name: 'Đánh giá cao nhất' },
  { id: 'most-downloaded', name: 'Tải về nhiều nhất' }
];