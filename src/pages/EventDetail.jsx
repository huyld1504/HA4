import { Link, useParams } from 'react-router-dom'
import { getEventById } from '../data/mockData'

const EventDetail = () => {
const { eventId } = useParams()
const event = getEventById(eventId)

if (!event) {
return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <div className="rounded-[40px] bg-[#f6eadf] p-10 text-center shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Lỗi 404</p>
        <h1 className="mt-4 text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">
        Không tìm thấy sự kiện
        </h1>
        <p className="mt-4 text-sm text-brand-brown-600 sm:text-base">
        Sự kiện bạn tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.
        </p>
        <Link
        to="/events"
        className="mt-8 inline-block rounded-full bg-gradient-to-br from-[#3b2412] to-[#2e1e10] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(83,48,33,0.3)] transition hover:scale-105 hover:shadow-[0_18px_40px_rgba(83,48,33,0.4)]"
        >
        Trở về danh sách sự kiện
        </Link>
    </div>
    </div>
)
}

return (
<div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
    {/* Hero Banner */}
    <div className="overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(59,36,18,0.08)]">
    <div className="relative h-[500px] overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        
        {/* Badge */}
        <div className="absolute left-8 top-8 sm:left-12 sm:top-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
            <span className="text-2xl">🎨</span>
            <span className="text-xs font-bold uppercase tracking-wider text-white">Sự kiện đặc biệt</span>
        </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white sm:p-12">
        <h1 className="mb-4 text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
            {event.title}
        </h1>
        <p className="mb-6 max-w-2xl text-lg opacity-95">{event.description}</p>
        
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
            </svg>
            <span>📅 {event.date}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>⏰ {event.time}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <span>📍 {event.location}</span>
            </div>
        </div>
        </div>
    </div>

    {/* Content Sections */}
    <div className="mt-8 space-y-6">
        {/* Giới thiệu nhanh */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">💡</span> Giới thiệu nhanh
            </h3>
        </div>
        <div className="p-6">
            <p className="text-base leading-relaxed text-gray-700">{event.shortIntro || 'Sự kiện này giới thiệu những hoạt động chính liên quan đến di sản, nghệ thuật và nghiên cứu văn hóa. Tham gia để khám phá, học hỏi và kết nối với các chuyên gia trong lĩnh vực.'}</p>
        </div>
        </div>

        {/* Chủ đề */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">🎯</span> Chủ đề sự kiện
            </h3>
        </div>
        <div className="p-6">
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="text-base leading-relaxed text-gray-700">{event.theme || '"Ký ức địa danh" — chủ đề khuyến khích tác phẩm gắn kết ký ức cá nhân với di tích, văn hóa và câu chuyện địa phương.'}</p>
            </div>
        </div>
        </div>

        {/* Timeline */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">📅</span> Timeline chính
            </h3>
        </div>
        <div className="p-6">
            <div className="space-y-3">
            {event.timeline && event.timeline.length > 0 ? (
                event.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border-l-4 border-amber-400">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
                    {index + 1}
                    </div>
                    <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.time}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.label}</p>
                    </div>
                </div>
                ))
            ) : (
                <>
                <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border-l-4 border-amber-400">
                    <span className="text-xl">1️⃣</span>
                    <div><strong className="text-gray-900">01/10/2025</strong> — Mở đăng ký & nhận tác phẩm</div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border-l-4 border-amber-400">
                    <span className="text-xl">2️⃣</span>
                    <div><strong className="text-gray-900">12/12/2025</strong> — Hạn chót nộp tác phẩm</div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border-l-4 border-amber-400">
                    <span className="text-xl">3️⃣</span>
                    <div><strong className="text-gray-900">20/12/2025</strong> — Chấm giải & công bố</div>
                </div>
                <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 border-l-4 border-amber-400">
                    <span className="text-xl">4️⃣</span>
                    <div><strong className="text-gray-900">01/01/2026</strong> — Triển lãm online</div>
                </div>
                </>
            )}
            </div>
        </div>
        </div>

        {/* Thể lệ & yêu cầu */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">📋</span> Thể lệ & yêu cầu
            </h3>
        </div>
        <div className="p-6">
            <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <span className="text-xl">✅</span>
                <p className="text-sm text-gray-700">Tác phẩm: tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <span className="text-xl">✅</span>
                <p className="text-sm text-gray-700">Kích thước tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <span className="text-xl">✅</span>
                <p className="text-sm text-gray-700">Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <span className="text-xl">✅</span>
                <p className="text-sm text-gray-700">Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <span className="text-xl">✅</span>
                <p className="text-sm text-gray-700">Mỗi người được gửi tối đa 3 tác phẩm.</p>
            </div>
            </div>
        </div>
        </div>

        {/* Tiêu chí chấm */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">⭐</span> Tiêu chí chấm
            </h3>
        </div>
        <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
                <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-gray-900">Sáng tạo & ý tưởng</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">40%</span>
                </div>
                <p className="text-sm text-gray-600">Độc đáo, truyền tải ký ức/di sản</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
                <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-gray-900">Chất lượng nghệ thuật</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">30%</span>
                </div>
                <p className="text-sm text-gray-600">Bố cục, màu sắc, kỹ thuật</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
                <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-gray-900">Tương tác công nghệ</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">20%</span>
                </div>
                <p className="text-sm text-gray-600">Sử dụng AI/AR/VR/âm thanh sáng tạo</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
                <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-gray-900">Tác động văn hóa</span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">10%</span>
                </div>
                <p className="text-sm text-gray-600">Truyền cảm hứng & giáo dục cộng đồng</p>
            </div>
            </div>
        </div>
        </div>

        {/* Gợi ý */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">💭</span> Gợi ý
            </h3>
        </div>
        <div className="p-6">
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="text-base leading-relaxed text-gray-700">Kết hợp tư liệu lịch sử, lời kể dân gian, hoặc ký ức cá nhân để tăng chiều sâu chủ đề. Viết một đoạn ngắn giải thích nguồn cảm hứng và cách bạn dùng công nghệ.</p>
            </div>
        </div>
        </div>

        {/* Ban Giám Khảo & Giải thưởng */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">🏆</span> Ban Giám Khảo & Cơ cấu giải
            </h3>
        </div>
        <div className="p-6 space-y-4">
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="text-base leading-relaxed text-gray-700">Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI. Cơ cấu giải thưởng gồm Giải Nhất, Giải Nhì, Giải Khuyến khích và Giải Khán giả bình chọn.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 p-6 text-center text-white shadow-lg">
                <div className="mb-2 text-4xl">🥇</div>
                <p className="mb-1 text-sm font-bold uppercase tracking-wider">Giải Nhất</p>
                <p className="text-2xl font-bold">10.000.000₫</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 p-6 text-center text-white shadow-lg">
                <div className="mb-2 text-4xl">🥈</div>
                <p className="mb-1 text-sm font-bold uppercase tracking-wider">Giải Nhì</p>
                <p className="text-2xl font-bold">5.000.000₫</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-center text-white shadow-lg">
                <div className="mb-2 text-4xl">🥉</div>
                <p className="mb-1 text-sm font-bold uppercase tracking-wider">Khuyến khích</p>
                <p className="text-sm font-bold">Quà tặng & Chứng nhận</p>
            </div>
            </div>
        </div>
        </div>

        {/* FAQ */}
        <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <span className="text-3xl">❓</span> Câu hỏi thường gặp
            </h3>
        </div>
        <div className="p-6 space-y-3">
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="mb-2 font-bold text-gray-900">Đăng ký có mất phí không?</p>
            <p className="text-sm text-gray-700">Hoàn toàn miễn phí.</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="mb-2 font-bold text-gray-900">Bản quyền tác phẩm thuộc về ai?</p>
            <p className="text-sm text-gray-700">Tác giả giữ bản quyền; ban tổ chức xin quyền sử dụng cho mục triển lãm/truyền thông có ghi nguồn.</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5 border-l-4 border-amber-400">
            <p className="mb-2 font-bold text-gray-900">Có thể gửi nhiều tác phẩm không?</p>
            <p className="text-sm text-gray-700">Có, tối đa 3 tác phẩm mỗi tác giả.</p>
            </div>
        </div>
        </div>
    </div>

    {/* Tags */}
    {event.tags && event.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
        {event.tags.map((tag, index) => (
            <span
            key={index}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:shadow-md"
            >
            #{tag}
            </span>
        ))}
        </div>
    )}

    {/* CTA Buttons */}
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
        to={`/register/${event.id}`}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-center text-base font-bold text-white shadow-lg shadow-amber-500/30 transition hover:shadow-xl hover:shadow-amber-500/40"
        >
        <span className="relative z-10 flex items-center justify-center gap-2">
            ✨ Đăng ký tham gia ngay
            <svg className="h-5 w-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 transition group-hover:opacity-100"></div>
        </Link>
        <Link
        to="/events"
        className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-center text-base font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
        Xem sự kiện khác
        </Link>
    </div>
    </div>
    </div>
</div>
)
}

export default EventDetail
