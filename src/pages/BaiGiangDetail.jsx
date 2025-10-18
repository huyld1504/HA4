import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { periodsData } from '../data/educationData';

const BaiGiangDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [relatedLectures, setRelatedLectures] = useState([]);

  useEffect(() => {
    // Tìm lecture từ periodsData
    let foundLecture = null;

    for (const period of periodsData) {
      const found = period.documents.find(doc => doc.id.toString() === id && doc.type === 'Bài giảng');
      if (found) {
        foundLecture = { ...found, period: period.name };
        break;
      }
    }

    if (foundLecture) {
      setLecture(foundLecture);

      // Tìm lectures liên quan
      const related = [];
      periodsData.forEach(period => {
        period.documents.forEach(doc => {
          if (doc.type === 'Bài giảng' && doc.id !== foundLecture.id && related.length < 3) {
            related.push({ ...doc, period: period.name });
          }
        });
      });
      setRelatedLectures(related);
    }
  }, [id]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const lectureOutline = [
    { time: 0, title: "Giới thiệu chung", duration: "5 phút" },
    { time: 300, title: "Bối cảnh lịch sử", duration: "8 phút" },
    { time: 780, title: "Diễn biến sự kiện", duration: "12 phút" },
    { time: 1500, title: "Ý nghĩa và tác động", duration: "10 phút" },
    { time: 2100, title: "Kết luận", duration: "5 phút" }
  ];

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Không tìm thấy bài giảng</h2>
          <Link to="/bai-giang-minh-hoa" className="text-amber-600 hover:text-amber-800">
            ← Quay lại danh sách bài giảng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-200 bg-black shadow-2xl">
              <div className="aspect-video relative">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                  >
                    {isPlaying ? (
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-4 text-white">
                    <span className="text-sm">{formatTime(currentTime)}</span>
                    <div className="flex-1 bg-white/30 rounded-full h-2 cursor-pointer">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / 2700) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{lecture.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lecture Info */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  📹 Bài giảng
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  {lecture.level}
                </span>
                {lecture.period && (
                  <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-800">
                    {lecture.period}
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-serif font-bold text-stone-800 sm:text-4xl">
                {lecture.title}
              </h1>

              <p className="mb-6 text-lg text-stone-600 leading-relaxed">
                {lecture.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 border-t border-stone-200 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {lecture.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{lecture.author}</p>
                    <p className="text-sm text-stone-600">Chuyên gia</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-stone-600">
                  <span className="flex items-center space-x-1">
                    <span>👁</span>
                    <span>{lecture.views} lượt xem</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{lecture.rating}/5</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>{lecture.createdDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>📥</span>
                    <span>{lecture.downloadCount} tải về</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600 hover:scale-105">
                  <span>📥</span>
                  <span>Tải về</span>
                </button>
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`flex items-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 ${showNotes
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-amber-500 bg-white text-amber-600 hover:bg-amber-50'
                    }`}
                >
                  <span>📝</span>
                  <span>Ghi chú</span>
                </button>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`flex items-center space-x-2 rounded-full border-2 px-6 py-3 font-semibold transition-all hover:scale-105 ${showTranscript
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-blue-500 bg-white text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <span>📄</span>
                  <span>Phiên bản</span>
                </button>
                <button className="flex items-center space-x-2 rounded-full border-2 border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:scale-105">
                  <span>❤️</span>
                  <span>Yêu thích</span>
                </button>
                <button className="flex items-center space-x-2 rounded-full border-2 border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition-all hover:bg-stone-50 hover:scale-105">
                  <span>📤</span>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Lecture Outline */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Nội dung bài giảng</h2>
              <div className="space-y-4">
                {lectureOutline.map((section, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentTime(section.time)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">{section.title}</h3>
                        <p className="text-sm text-stone-600">{section.duration}</p>
                      </div>
                    </div>
                    <div className="text-sm text-stone-500">
                      {formatTime(section.time)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            {showNotes && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Ghi chú của bạn</h2>
                <textarea
                  placeholder="Viết ghi chú cho bài giảng này..."
                  className="w-full h-40 rounded-xl border border-stone-300 p-4 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                ></textarea>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowNotes(false)}
                    className="rounded-full border-2 border-stone-300 bg-white px-6 py-2 font-semibold text-stone-700 transition-all hover:bg-stone-50"
                  >
                    Hủy
                  </button>
                  <button className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600">
                    Lưu ghi chú
                  </button>
                </div>
              </div>
            )}

            {/* Transcript Section */}
            {showTranscript && (
              <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-serif font-bold text-stone-800">Phiên bản văn bản</h2>
                <div className="space-y-4 text-stone-700">
                  <div className="p-4 border-l-4 border-amber-300 bg-amber-50">
                    <p className="text-sm text-amber-800 font-medium mb-2">[00:00 - 05:00] Giới thiệu chung</p>
                    <p>Chào mừng các bạn đến với bài giảng về {lecture.title}. Trong bài học hôm nay, chúng ta sẽ cùng nhau tìm hiểu về một trong những sự kiện quan trọng nhất trong lịch sử dân tộc Việt Nam...</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-300 bg-blue-50">
                    <p className="text-sm text-blue-800 font-medium mb-2">[05:00 - 13:00] Bối cảnh lịch sử</p>
                    <p>Để hiểu rõ về sự kiện này, chúng ta cần nhìn lại bối cảnh lịch sử của thời kỳ. Vào thế kỷ này, đất nước ta đang phải chịu sự đô hộ của...</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-300 bg-green-50">
                    <p className="text-sm text-green-800 font-medium mb-2">[13:00 - 25:00] Diễn biến sự kiện</p>
                    <p>Cuộc khởi nghĩa diễn ra với nhiều giai đoạn khác nhau. Giai đoạn đầu tiên bắt đầu từ...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Thông tin</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Thời lượng:</span>
                  <span className="font-semibold text-stone-800">{lecture.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Cấp độ:</span>
                  <span className="font-semibold text-stone-800">{lecture.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Lượt xem:</span>
                  <span className="font-semibold text-stone-800">{lecture.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Đánh giá:</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-stone-800">{lecture.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(lecture.rating) ? 'text-yellow-400' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Ngày tạo:</span>
                  <span className="font-semibold text-stone-800">{lecture.createdDate}</span>
                </div>
              </div>
            </div>

            {/* Related Lectures */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Bài giảng liên quan</h3>
              <div className="space-y-4">
                {relatedLectures.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/bai-giang/${related.id}`)}
                    className="group cursor-pointer rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-stone-800 group-hover:text-amber-700 line-clamp-2 mb-1">
                          {related.title}
                        </h4>
                        <p className="text-sm text-stone-600 mb-2 truncate">
                          {related.author}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-stone-500">
                          <span>⏱ {related.duration}</span>
                          <span>⭐ {related.rating}</span>
                          <span>{related.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Về tác giả</h3>
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {lecture.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-stone-800 mb-2">{lecture.author}</h4>
                <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                  Chuyên gia nghiên cứu lịch sử Việt Nam với hơn 20 năm kinh nghiệm giảng dạy và nghiên cứu tại các trường đại học hàng đầu.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-stone-600">
                  <div className="text-center">
                    <div className="font-bold text-amber-600">45</div>
                    <div>Bài giảng</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">12K</div>
                    <div>Học viên</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">4.8</div>
                    <div>Đánh giá</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaiGiangDetail;