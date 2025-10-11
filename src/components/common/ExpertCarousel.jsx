import { useState, useRef, useEffect } from 'react'

const expertsData = [
  {
    id: 1,
    name: 'GS.TS Nguyễn Văn Huy',
    title: 'Chuyên gia Di sản văn hóa',
    image: '/images/expert1.jpg',
    description: 'Chuyên gia số hóa di sản Việt Nam và triển khai VR/AR.',
    icon: 'fa-robot',
    tooltip: 'Phỏng vấn về số hóa di sản',
    videoUrl: 'https://www.youtube.com/embed/_XX248bq6Pw'
  },
  {
    id: 2,
    name: 'PGS.TS Trần Thị Mai',
    title: 'Nhà khảo cổ học',
    image: '/images/expert2.jpg',
    description: 'Chuyên gia truyền thông số & nền tảng giáo dục trực tuyến.',
    icon: 'fa-users',
    tooltip: 'Chia sẻ chiến lược giáo dục số',
    videoUrl: 'https://www.youtube.com/embed/_XX248bq6Pw'
  },
  {
    id: 3,
    name: 'TS Lê Quang Minh',
    title: 'Chuyên gia Kiến trúc cổ',
    image: '/images/expert3.jpg',
    description: 'Nghệ thuật số & triển lãm VR/AR.',
    icon: 'fa-vr-cardboard',
    tooltip: 'Triển lãm và nghệ thuật số',
    videoUrl: 'https://www.youtube.com/embed/_XX248bq6Pw'
  }
]

export default function ExpertCarousel({ onViewVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef(null)

  // Auto play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % expertsData.length)
      }, 5000)
    }
    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + expertsData.length) % expertsData.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % expertsData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  // Calculate visible cards indices
  const getVisibleCards = () => {
    const cards = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + expertsData.length) % expertsData.length
      cards.push({ data: expertsData[index], offset: i, originalIndex: index })
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-8" ref={carouselRef}>
      {/* Section Header */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
        <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
          <i className="fa-solid fa-users text-amber-600" />
          <span className="text-sm uppercase tracking-wider text-amber-700 font-bold">DIỄN GIẢ</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Diễn giả đồng hành
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg px-4">
          Gặp gỡ những người truyền cảm hứng, dẫn dắt bạn qua hành trình khám phá chiều sâu lịch sử và văn hóa Việt Nam.
        </p>
      </div>

      {/* Carousel Container - Responsive height */}
      <div className="relative h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 md:left-4 z-20 bg-white hover:bg-amber-50 text-gray-800 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group border-2 border-amber-200 hover:border-amber-400"
          aria-label="Previous expert"
        >
          <i className="fa-solid fa-chevron-left text-lg md:text-xl group-hover:text-amber-600 transition-colors" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 md:right-4 z-20 bg-white hover:bg-amber-50 text-gray-800 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group border-2 border-amber-200 hover:border-amber-400"
          aria-label="Next expert"
        >
          <i className="fa-solid fa-chevron-right text-lg md:text-xl group-hover:text-amber-600 transition-colors" />
        </button>

        {/* Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleCards.map(({ data, offset }) => {
            const isCenter = offset === 0
            const isLeft = offset === -1

            return (
              <div
                key={data.id}
                className={`absolute transition-all duration-700 ease-out ${
                  isCenter
                    ? 'z-30 scale-100 opacity-100 translate-x-0'
                    : isLeft
                    ? 'z-10 scale-75 opacity-40 -translate-x-[400px]'
                    : 'z-10 scale-75 opacity-40 translate-x-[400px]'
                }`}
                style={{
                  transform: `
                    translateX(${offset * 400}px) 
                    scale(${isCenter ? 1 : 0.75}) 
                    rotateY(${offset * 15}deg)
                  `,
                  opacity: isCenter ? 1 : 0.4
                }}
              >
                <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100 w-[300px] sm:w-[340px] md:w-[380px] group ${
                  isCenter ? 'hover:shadow-amber-300/50 cursor-pointer' : 'pointer-events-none'
                }`}>
                  {/* Tooltip */}
                  {isCenter && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 z-10 shadow-lg">
                      <i className={`fa-solid ${data.icon} mr-1`} />
                      {data.tooltip}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-gray-100">
                    <img
                      src={data.image}
                      alt={data.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isCenter ? 'group-hover:scale-110' : ''
                      }`}
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent ${
                      isCenter ? 'opacity-0 group-hover:opacity-100' : ''
                    } transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                      {data.name}
                    </h3>
                    <p className="text-amber-600 font-medium text-sm mb-3">{data.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{data.description}</p>
                    
                    {isCenter && (
                      <button
                        onClick={() => onViewVideo && onViewVideo(data)}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-300/50 flex items-center justify-center gap-2 group/btn"
                      >
                        <i className="fa-solid fa-play-circle text-lg" />
                        <span>Xem phỏng vấn</span>
                        <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-3 mt-10 md:mt-12">
        {expertsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-10 md:w-12 h-2.5 md:h-3 bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg ring-2 ring-amber-300 ring-offset-2'
                : 'w-2.5 md:w-3 h-2.5 md:h-3 bg-gray-300 hover:bg-amber-400 hover:scale-125 hover:shadow-md'
            }`}
            aria-label={`Go to expert ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="group text-sm text-gray-600 hover:text-amber-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-amber-400 hover:bg-amber-50"
        >
          <i className={`fa-solid ${isAutoPlaying ? 'fa-pause' : 'fa-play'} text-amber-600 transition-transform group-hover:scale-110`} />
          <span className="font-medium">{isAutoPlaying ? 'Tạm dừng tự động' : 'Bật tự động chuyển'}</span>
        </button>
      </div>
    </div>
  )
}
