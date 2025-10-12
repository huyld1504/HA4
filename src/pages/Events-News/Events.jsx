import { useMemo, useState } from 'react'
import EventCard from '../../components/cards/EventCard'
import HeroCarousel from '../../components/home/HeroCarousel'
import { events } from '../../data/mockData'

const Events = () => {
const [query, setQuery] = useState('')

const filteredEvents = useMemo(() => {
if (!query.trim()) return events

const lowercaseQuery = query.toLowerCase()
return events.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(lowercaseQuery)
    const locationMatch = event.location.toLowerCase().includes(lowercaseQuery)
    const tagMatch = event.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    return titleMatch || locationMatch || tagMatch
})
}, [query])

const featuredEvents = useMemo(() => events.filter((event) => event.isFeatured), [])

return (
<div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <HeroCarousel items={featuredEvents.length ? featuredEvents : events.slice(0, 3)} />

    <section className="rounded-[40px] bg-[#f6eadf] p-10 shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
    <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Sự kiện</p>
        <h1 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Danh sách sự kiện</h1>
        <p className="text-sm text-brand-brown-600 sm:text-base">
        Lên kế hoạch cho hành trình khám phá di sản với những sự kiện đặc sắc được tuyển chọn kỹ lưỡng.
        </p>
    </div>

    <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white/95 p-6 shadow-[0_20px_45px_rgba(83,48,33,0.12)] backdrop-blur">
        <label htmlFor="event-search" className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-brown-400">
        Từ khóa
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
            id="event-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên sự kiện, địa điểm hoặc chủ đề"
            className="w-full rounded-full border border-brand-brown-200/80 bg-white px-5 py-3 text-sm text-brand-brown-900 shadow-inner outline-none transition focus:border-brand-brown-400 focus:ring focus:ring-amber-200/70"
        />
        <span className="text-xs text-brand-brown-400 sm:w-auto">
            {filteredEvents.length} sự kiện phù hợp
        </span>
        </div>
    </div>

    <div className="mt-12">
        {filteredEvents.length === 0 ? (
        <div className="rounded-[28px] bg-gradient-to-b from-white via-white to-[#fff2e6] p-10 text-center text-sm text-brand-brown-600 shadow-[0_24px_50px_rgba(83,48,33,0.14)]">
            Không tìm thấy sự kiện phù hợp với từ khóa. Vui lòng thử lại với từ khóa khác.
        </div>
        ) : (
        <div className="grid gap-8 md:grid-cols-3">
            {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
            ))}
        </div>
        )}
    </div>
    </section>
</div>
)
}

export default Events
