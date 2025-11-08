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
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8" ref={carouselRef}>
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-14 animate-in fade-in slide-in-from-top duration-700">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 px-5 py-2.5 rounded-full mb-5 shadow-sm border border-amber-200/50">
          <i className="fa-solid fa-users text-amber-600 text-sm" />
          <span className="text-xs md:text-sm uppercase tracking-widest text-amber-700 font-bold">Chuyên gia</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 via-amber-800 to-gray-800 bg-clip-text text-transparent">
          Phỏng vấn Diễn giả
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base px-4">
          Gặp gỡ những người truyền cảm hứng, khám phá chiều sâu lịch sử và văn hóa Việt Nam
        </p>
      </div>

      {/* Carousel Container - Horizontal Layout */}
      <div className="relative h-[260px] md:h-[280px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-1 md:left-3 z-20 bg-white/95 backdrop-blur-sm hover:bg-amber-50 text-gray-700 p-2.5 md:p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-amber-200/50 hover:border-amber-400"
          aria-label="Previous expert"
        >
          <i className="fa-solid fa-chevron-left text-base md:text-lg group-hover:text-amber-600 transition-colors" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-1 md:right-3 z-20 bg-white/95 backdrop-blur-sm hover:bg-amber-50 text-gray-700 p-2.5 md:p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-amber-200/50 hover:border-amber-400"
          aria-label="Next expert"
        >
          <i className="fa-solid fa-chevron-right text-base md:text-lg group-hover:text-amber-600 transition-colors" />
        </button>

        {/* Cards - Horizontal Rectangle Layout */}
        <div className="relative w-full h-full flex items-center justify-center px-10 md:px-16">
          {visibleCards.map(({ data, offset }) => {
            const isCenter = offset === 0
            
            // Rút gọn chiều rộng và tăng khoảng cách để không đè lên nhau
            const translateDistance = 420 // Khoảng cách giữa các card

            return (
              <div
                key={data.id}
                className={`absolute transition-all duration-700 ease-out ${
                  isCenter
                    ? 'z-30 scale-100 opacity-100'
                    : 'z-10 scale-85 opacity-30'
                }`}
                style={{
                  transform: `
                    translateX(${offset * translateDistance}px) 
                    scale(${isCenter ? 1 : 0.85})
                  `,
                  opacity: isCenter ? 1 : 0.3
                }}
              >
                {/* Card với layout ngang gọn hơn */}
                <div className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-amber-100/50 w-[340px] sm:w-[360px] md:w-[380px] lg:w-[400px] group flex flex-row transition-all duration-300 ${
                  isCenter ? 'hover:shadow-amber-300/40 cursor-pointer hover:border-amber-200' : 'pointer-events-none'
                }`}>
                  {/* Image bên trái - chiếm 38% width */}
                  <div className="relative w-[38%] overflow-hidden bg-gradient-to-br from-amber-50 to-gray-100 flex-shrink-0">
                    <img
                      src={data.image}
                      alt={data.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isCenter ? 'group-hover:scale-110' : ''
                      }`}
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 ${
                      isCenter ? 'opacity-0 group-hover:opacity-100' : ''
                    } transition-opacity duration-300`} />
                    
                    {/* Icon overlay với animation */}
                    {isCenter && (
                      <div className="absolute bottom-3 right-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <i className={`fa-solid ${data.icon} text-xs`} />
                      </div>
                    )}
                  </div>

                  {/* Content bên phải - chiếm 62% width */}
                  <div className="w-[62%] p-4 md:p-5 flex flex-col justify-between bg-gradient-to-br from-white to-amber-50/30">
                    {/* Tooltip tinh tế hơn */}
                    {isCenter && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-300 z-10 shadow-md">
                        {data.tooltip}
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-2.5">
                      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {data.name}
                      </h3>
                      <p className="text-amber-600 font-medium text-[11px] md:text-xs mb-2 flex items-center gap-1.5">
                        <i className="fa-solid fa-graduation-cap text-xs" />
                        <span>{data.title}</span>
                      </p>
                      <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-3">
                        {data.description}
                      </p>
                    </div>
                    
                    {/* Button với design mới */}
                    {isCenter && (
                      <button
                        onClick={() => onViewVideo && onViewVideo(data)}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3 py-2 md:py-2.5 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-amber-400/50 flex items-center justify-center gap-2 group/btn active:scale-95"
                      >
                        <i className="fa-solid fa-play-circle text-sm md:text-base" />
                        <span>Xem phỏng vấn</span>
                        <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-300 group-hover/btn:translate-x-0.5" />
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
      <div className="flex justify-center gap-2.5 mt-8 md:mt-10">
        {expertsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 md:w-10 h-2 md:h-2.5 bg-gradient-to-r from-amber-500 to-amber-600 shadow-md ring-2 ring-amber-300/50 ring-offset-1'
                : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-amber-400 hover:scale-125 hover:shadow-sm'
            }`}
            aria-label={`Go to expert ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
