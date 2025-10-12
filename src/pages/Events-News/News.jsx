import { useMemo, useState } from 'react'
import NewsCard from '../../components/cards/NewsCard'
import HeroCarousel from '../../components/home/HeroCarousel'
import { news } from '../../data/mockData'

const News = () => {
const [query, setQuery] = useState('')

const filteredNews = useMemo(() => {
if (!query.trim()) return news

const lowercaseQuery = query.toLowerCase()
return news.filter((article) => {
    const fields = [article.title, article.description, article.content, article.category, article.author]
    return fields.some((field) => field?.toLowerCase().includes(lowercaseQuery))
})
}, [query])

const featuredNews = useMemo(() => news.slice(0, 3), [])

return (
<div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <HeroCarousel
    items={featuredNews}
    getCtaHref={(article) => (article?.id ? `/news/${article.id}` : null)}
    ctaLabel="Đọc chi tiết"
    />

    <section className="rounded-[40px] bg-[#f6eadf] p-10 shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
    <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Tin tức</p>
        <h1 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Kho tin tức</h1>
        <p className="text-sm text-brand-brown-600 sm:text-base">
        Tìm kiếm và theo dõi những câu chuyện di sản mới nhất từ khắp ba miền đất nước.
        </p>
    </div>

    <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white/95 p-6 shadow-[0_20px_45px_rgba(83,48,33,0.12)] backdrop-blur">
        <label htmlFor="news-search" className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-brown-400">
        Từ khóa
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
            id="news-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tiêu đề, chủ đề hoặc tác giả"
            className="w-full rounded-full border border-brand-brown-200/80 bg-white px-5 py-3 text-sm text-brand-brown-900 shadow-inner outline-none transition focus:border-brand-brown-400 focus:ring focus:ring-amber-200/70"
        />
        <span className="text-xs text-brand-brown-400 sm:w-auto">
            {filteredNews.length} bài viết phù hợp
        </span>
        </div>
    </div>

    <div className="mt-12">
        {filteredNews.length === 0 ? (
        <div className="rounded-[28px] bg-gradient-to-b from-white via-white to-[#fff2e6] p-10 text-center text-sm text-brand-brown-600 shadow-[0_24px_50px_rgba(83,48,33,0.14)]">
            Không tìm thấy tin tức phù hợp với từ khóa. Vui lòng thử lại với từ khóa khác.
        </div>
        ) : (
        <div className="grid gap-8 md:grid-cols-3">
            {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} />
            ))}
        </div>
        )}
    </div>
    </section>
</div>
)
}

export default News
