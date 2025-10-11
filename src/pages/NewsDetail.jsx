import { Link, useParams } from 'react-router-dom'
import { getNewsById } from '../data/mockData'

const NewsDetail = () => {
const { newsId } = useParams()
const article = getNewsById(newsId)

if (!article) {
return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <div className="rounded-[40px] bg-[#f6eadf] p-10 text-center shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Lỗi 404</p>
        <h1 className="mt-4 text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">
        Không tìm thấy bài viết
        </h1>
        <p className="mt-4 text-sm text-brand-brown-600 sm:text-base">
        Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.
        </p>
        <Link
        to="/news"
        className="mt-8 inline-block rounded-full bg-gradient-to-br from-[#3b2412] to-[#2e1e10] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(83,48,33,0.3)] transition hover:scale-105 hover:shadow-[0_18px_40px_rgba(83,48,33,0.4)]"
        >
        Trở về tin tức
        </Link>
    </div>
    </div>
)
}

return (
<div className="mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-6">
    <div className="overflow-hidden rounded-[40px] bg-[#f6eadf] shadow-[0_32px_60px_rgba(83,48,33,0.12)]">
    <div className="relative h-[400px] overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b2412]/80 via-[#3b2412]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white sm:p-12">
        <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            {article.category}
        </span>
        <h1 className="mt-4 text-3xl font-serif font-semibold sm:text-4xl">{article.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm opacity-90">
            <span>Bởi {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
        </div>
        </div>
    </div>

    <div className="p-8 sm:p-12">
        <p className="text-lg leading-relaxed text-brand-brown-900">{article.description}</p>

        {article.content && (
        <div
            className="prose prose-brand mt-8 max-w-none space-y-6 text-base leading-relaxed text-brand-brown-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
        />
        )}

        <div className="mt-10 flex items-center justify-between border-t border-brand-brown-200 pt-8">
        <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-brown-300 px-6 py-2.5 text-sm font-semibold text-brand-brown-900 transition hover:border-brand-brown-400 hover:bg-brand-brown-50"
        >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            Trở về tin tức
        </Link>

        <div className="flex items-center gap-2 text-sm text-brand-brown-600">
            <span>Chia sẻ:</span>
            <button
            className="rounded-full p-2 transition hover:bg-brand-brown-100"
            aria-label="Share on Facebook"
            >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
            </button>
            <button
            className="rounded-full p-2 transition hover:bg-brand-brown-100"
            aria-label="Share on Twitter"
            >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
            </button>
        </div>
        </div>
    </div>
    </div>
</div>
)
}

export default NewsDetail
