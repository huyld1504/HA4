import React from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../../components/cards/EventCard'
import NewsCard from '../../components/cards/NewsCard'
import HeroCarousel from '../../components/home/HeroCarousel'
import SpeakerCarousel from '../../components/home/SpeakerCarousel'
import { events, news, speakers } from '../../data/mockData'

const Home = () => {
  const featuredEvents = events.slice(0, 3)
  const latestNews = news.slice(0, 3)
  const upcomingEvents = events.slice(0, 3)
  const highlightedSpeakers = speakers.slice(0, 4)

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
        {/* Hero Carousel */}
        <HeroCarousel items={featuredEvents} />

        {/* Featured News Section */}
        <section className="rounded-[40px] bg-[#f6eadf] p-10 shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Tin tức</p>
            <h2 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Tin tức nổi bật</h2>
            <p className="text-sm text-brand-brown-600 sm:text-base">
              Khám phá những câu chuyện mới về di sản và văn hóa Việt Nam được tuyển chọn kỹ lưỡng mỗi tuần.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/news"
              className="inline-flex items-center rounded-full border-2 border-brand-brown-700 px-8 py-3 font-semibold text-brand-brown-700 transition hover:bg-brand-brown-700 hover:text-white"
            >
              Xem thêm
            </Link>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="rounded-[40px] bg-[#f6eadf] p-10 shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Sự kiện</p>
            <h2 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Sự kiện nổi bật</h2>
            <p className="text-sm text-brand-brown-600 sm:text-base">
              Trải nghiệm những hoạt động văn hóa đặc sắc diễn ra khắp ba miền đất nước với các chuyên gia đầu ngành.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/events"
              className="inline-flex items-center rounded-full border-2 border-brand-brown-700 px-8 py-3 font-semibold text-brand-brown-700 transition hover:bg-brand-brown-700 hover:text-white"
            >
              Xem thêm
            </Link>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="rounded-[40px] bg-[#f6eadf] p-10 shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Diễn giả</p>
            <h2 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Diễn giả đồng hành</h2>
            <p className="text-sm text-brand-brown-600 sm:text-base">
              Gặp gỡ những người truyền cảm hứng, dẫn dắt bạn qua hành trình khám phá chiều sâu lịch sử và văn hóa Việt Nam.
            </p>
          </div>
          <div className="mt-12">
            <SpeakerCarousel speakers={highlightedSpeakers} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
