import React, { useEffect, useRef, useState } from 'react'
import { dynastyData as dynastyDataRaw } from '../../data/mockData'
import nhangoImg from '../../assets/nhango.jpg'
import nhathoImg from '../../assets/nhatho.png'
import nhathoDucbaImg from '../../assets/nhathoducba.jpg'
import nhathoDucbaAiImg from '../../assets/nhathoducbaai.png'
import hueImg from '../../assets/hue.jpg'
import diadaoImg from '../../assets/diadao.png'

// Map images to dynasty data
const imageMap = {
    '/src/assets/nhango.jpg': nhangoImg,
    '/src/assets/nhatho.png': nhathoImg,
    '/src/assets/nhathoducba.jpg': nhathoDucbaImg,
    '/src/assets/nhathoducbaai.png': nhathoDucbaAiImg,
    '/src/assets/hue.jpg': hueImg,
    '/src/assets/diadao.png': diadaoImg
}

// Replace string paths with actual imported images
const dynastyData = Object.keys(dynastyDataRaw).reduce((acc, key) => {
    const dynasty = dynastyDataRaw[key]
    acc[key] = {
        ...dynasty,
        img: imageMap[dynasty.img] || dynasty.img,
        figures: dynasty.figures.map(f => ({
            ...f,
            img: imageMap[f.img] || f.img
        }))
    }
    return acc
}, {})

export default function VanHoaLichSu() {
const [modalData, setModalData] = useState(null)
const [eventModalData, setEventModalData] = useState(null)
const [slideshowIndex, setSlideshowIndex] = useState(0)
const [openDynasty, setOpenDynasty] = useState(null)
const slideshowRef = useRef(null)
const autoplayRef = useRef(null)
const compareAfterRef = useRef(null)
const compareBoxRef = useRef(null)
const sliderRef = useRef(null)
const [isDragging, setIsDragging] = useState(false)

useEffect(() => {
    // autoplay slideshow
    autoplayRef.current = setInterval(() => {
        setSlideshowIndex(i => (i + 1) % 4)
    }, 4500)
    return () => clearInterval(autoplayRef.current)
}, [])

useEffect(() => {
    // update compare initial position
    const box = compareBoxRef.current
    const after = compareAfterRef.current
    const slider = sliderRef.current
    if (!box || !after || !slider) return
    const rect = box.getBoundingClientRect()
    const initial = rect.width / 2
    after.style.width = initial + 'px'
    slider.style.left = initial + 'px'

    const handleMouseMove = (e) => {
        if (!isDragging) return
        setPos(e.clientX)
    }
    const handleTouchMove = (e) => {
        if (!isDragging) return
        setPos(e.touches[0].clientX)
    }
    function setPos(clientX) {
        const rect = box.getBoundingClientRect()
        let px = clientX - rect.left
        if (px < 0) px = 0
        if (px > rect.width) px = rect.width
        after.style.width = px + 'px'
        slider.style.left = px + 'px'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('mouseup', () => setIsDragging(false))
    window.addEventListener('touchend', () => setIsDragging(false))

    // keyboard support when slider has focus
    const handleKey = (e) => {
        const slider = sliderRef.current
        const box = compareBoxRef.current
        const after = compareAfterRef.current
        if (!slider || !box || !after) return
        const rect = box.getBoundingClientRect()
        let left = parseFloat(slider.style.left || rect.width/2)
        if (e.key === 'ArrowLeft') {
            left = Math.max(0, left - 10)
            after.style.width = left + 'px'
            slider.style.left = left + 'px'
        }
        if (e.key === 'ArrowRight') {
            left = Math.min(rect.width, left + 10)
            after.style.width = left + 'px'
            slider.style.left = left + 'px'
        }
    }
    window.addEventListener('keydown', handleKey)

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('mouseup', () => setIsDragging(false))
        window.removeEventListener('touchend', () => setIsDragging(false))
        window.removeEventListener('keydown', handleKey)
    }
}, [isDragging])

useEffect(() => {
    // pause autoplay on hover
    const el = slideshowRef.current
    if (!el) return
    function onEnter() { clearInterval(autoplayRef.current) }
    function onLeave() { autoplayRef.current = setInterval(() => setSlideshowIndex(i => (i + 1) % 4), 4500) }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
    }
}, [])

function closeModal() {
    setModalData(null)
    document.body.style.overflow = ''
}

function openEventModal(event) {
    setEventModalData(event)
    document.body.style.overflow = 'hidden'
}
function closeEventModal() {
    setEventModalData(null)
    document.body.style.overflow = ''
}

function toggleDynasty(key) {
    setOpenDynasty(prev => prev === key ? null : key)
}

function startDrag(e) {
    e.preventDefault()
    setIsDragging(true)
}

function compareClick(e) {
    const box = compareBoxRef.current
    if (!box) return
    const rect = box.getBoundingClientRect()
    let px = e.clientX - rect.left
    if (px < 0) px = 0
    if (px > rect.width) px = rect.width
    compareAfterRef.current.style.width = px + 'px'
    sliderRef.current.style.left = px + 'px'
}

const slideshowImages = [hueImg, diadaoImg, nhathoImg, nhathoDucbaAiImg]

    return (
        <div className="min-h-screen bg-[#f6eadf] text-gray-800 py-7">
            <div className="max-w-[1200px] mx-auto px-5">
                <header className="relative grid gap-5 p-8 rounded-[24px] bg-cover overflow-hidden shadow-xl" style={{ backgroundImage: `url(${nhathoDucbaImg})` }} role="banner">
                    {/* darker overlay for legible white text on image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" aria-hidden="true" />
                    <div className="relative z-10 backdrop-blur-sm bg-black/30 p-5 rounded-xl">
                        <h1 className="text-3xl text-white font-bold drop-shadow-lg">📜 Văn hóa & Lịch sử — Nghệ Thuật Ký Ức 4.0</h1>
                        <p className="text-base text-white/95 max-w-[90%] mt-2 drop-shadow">Hành trình lịch sử Việt Nam được kể lại bằng hình ảnh, tri thức và công nghệ — nơi ký ức gặp gỡ tương lai.</p>
                    </div>
                </header>

                <main className="grid lg:grid-cols-[1fr_460px] gap-6 mt-6" role="main">
                    <section className="bg-white p-5 rounded-xl shadow-xl border border-amber-200">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <h2 className="text-xl text-amber-800 font-semibold">Hành trình lịch sử (MiniTree)</h2>
                            <div className="text-sm text-gray-600">Click vào triều đại để xem các sự kiện</div>
                        </div>

                        <nav className="mt-4 pl-6" aria-label="Timeline tree">
                            <ul className="relative">
                                <li className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-amber-400 before:to-amber-600">
                                    <div className="flex flex-col gap-3">
                                        {/* Nhà Ngô */}
                                        <div>
                                            <div 
                                                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                onClick={() => toggleDynasty('ngo')}
                                            >
                                                <div className="w-11 h-11 rounded-md flex items-center justify-center bg-gradient-to-tr from-amber-500 to-amber-600 overflow-hidden border-2 border-amber-300 shadow-md flex-shrink-0">
                                                    <img loading="lazy" src={nhangoImg} alt="Ngô" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-amber-800">Ngô (939-967)</div>
                                                    <div className="text-sm text-gray-600 line-clamp-1">Khởi lập vương triều</div>
                                                </div>
                                                <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'ngo' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            
                                            {/* Events cho Nhà Ngô */}
                                            <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'ngo' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                    {dynastyData.ngo.events.map((event, idx) => (
                                                        <div 
                                                            key={idx} 
                                                            className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                            onClick={() => openEventModal(event)}
                                                        >
                                                            <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                            <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                            <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nhà Đinh */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('dinh')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhangoImg} alt="Đinh" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Đinh (968–980)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Thống nhất đất nước, Đại Cồ Việt</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'dinh' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'dinh' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.dinh.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Tiền Lê */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('tienle')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhangoImg} alt="Tiền Lê" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Tiền Lê (980–1009)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Đánh thắng quân Tống</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'tienle' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'tienle' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.tienle.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Lý */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('ly')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhathoDucbaImg} alt="Lý" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Lý (1009–1225)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Quốc gia thịnh vượng, Phật giáo thịnh hành</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'ly' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'ly' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.ly.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Trần */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('tran')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={diadaoImg} alt="Trần" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Trần (1225–1400)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Chiến thắng quân Nguyên, phát triển văn hóa</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'tran' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'tran' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.tran.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Hồ */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('ho')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={hueImg} alt="Hồ" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Hồ (1400–1407)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Cải cách triệt để, ngắn ngủi</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'ho' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'ho' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.ho.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Lê */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('le')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={hueImg} alt="Lê" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Lê (1428–1789)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Lê sơ, Lê trung hưng</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'le' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'le' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.le.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Mạc */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('mac')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={diadaoImg} alt="Mạc" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Mạc (1527–1592)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Song song với Lê</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'mac' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'mac' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.mac.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Tây Sơn */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('tayson')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhathoImg} alt="Tây Sơn" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Tây Sơn (1778–1802)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Quang Trung, chiến thắng Ngọc Hồi</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'tayson' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'tayson' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.tayson.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nhà Nguyễn */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('nguyen')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhathoImg} alt="Nguyễn" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Nguyễn (1802–1945)</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Triều Nguyễn & di sản kiến trúc</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'nguyen' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'nguyen' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.nguyen.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hiện đại */}
                                            <div>
                                                <div 
                                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300 min-h-[76px]" 
                                                    onClick={() => toggleDynasty('modern')}
                                                >
                                                    <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                                                        <img loading="lazy" src={nhathoDucbaAiImg} alt="Hiện đại" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-amber-800">Hiện đại</div>
                                                        <div className="text-sm text-gray-600 line-clamp-1">Đổi mới, số hóa di sản</div>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-amber-600 transition-transform duration-300 flex-shrink-0 ${openDynasty === 'modern' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                
                                                <div className={`overflow-hidden transition-all duration-300 ${openDynasty === 'modern' ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                                    <div className="ml-14 space-y-2 border-l-2 border-amber-300 pl-4">
                                                        {dynastyData.modern.events.map((event, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 hover:bg-amber-100 transition cursor-pointer"
                                                                onClick={() => openEventModal(event)}
                                                            >
                                                                <div className="font-medium text-amber-900 text-sm">{event.name}</div>
                                                                <div className="text-xs text-amber-700 mt-1">Năm: {event.year}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{event.tomtat}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <aside>
                        <div className="bg-white p-4 rounded-xl shadow-xl mb-4 border border-amber-200">
                            <h3 className="text-amber-800 font-semibold mb-3">So sánh: Ảnh gốc ↔ Ảnh AI</h3>
                            <div className="relative overflow-hidden rounded-lg h-[240px] shadow-lg" ref={compareBoxRef} onClick={compareClick}>
                                <img src={nhathoDucbaImg} alt="Ảnh gốc" className="w-full h-[240px] object-cover" />
                                <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden" ref={compareAfterRef}>
                                    <img src={nhathoDucbaAiImg} alt="Phiên bản AI" className="w-full h-[240px] object-cover" />
                                </div>
                                <div className="absolute top-0 h-full w-1 left-1/2 -translate-x-1 bg-gradient-to-b from-amber-500 to-amber-600 shadow-xl cursor-ew-resize" ref={sliderRef}
                                    role="separator" aria-orientation="horizontal" tabIndex={0} aria-label="Kéo để so sánh ảnh"
                                    onMouseDown={(e) => startDrag(e)} onTouchStart={(e) => { e.preventDefault(); setIsDragging(true) }} />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-xl border border-amber-200">
                            <h3 className="text-amber-800 font-semibold mb-3">Bộ sưu tập AI</h3>
                            <div className="relative overflow-hidden rounded-lg h-[240px] shadow-lg" ref={slideshowRef}>
                                {slideshowImages.map((src, i) => (
                                    <img key={i} src={src} className={`${i === slideshowIndex ? 'block' : 'hidden'} w-full h-[240px] object-cover transition-opacity duration-500`} alt={`Tranh AI ${i+1}`} />
                                ))}
                                <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full text-gray-800 shadow-lg transition" onClick={() => setSlideshowIndex((slideshowIndex-1+slideshowImages.length)%slideshowImages.length)} aria-label="Previous">&#10094;</button>
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full text-gray-800 shadow-lg transition" onClick={() => setSlideshowIndex((slideshowIndex+1)%slideshowImages.length)} aria-label="Next">&#10095;</button>
                            </div>
                            <div className="flex justify-center gap-3 mt-3">
                                {slideshowImages.map((_, i) => (
                                    <button key={i} className={`${i === slideshowIndex ? 'bg-amber-600 scale-110' : 'bg-gray-300'} w-3 h-3 rounded-full transition-all duration-300 hover:scale-110`} onClick={() => setSlideshowIndex(i)} aria-label={`Go to slide ${i+1}`} />
                                ))}
                            </div>
                        </div>
                    </aside>
                </main>

                {/* Modal */}
                <div className={`${modalData ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm p-6`} onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
                    {modalData && (
                        <div className="max-w-[920px] w-full bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-2xl relative border-2 border-amber-300 animate-in fade-in zoom-in duration-300">
                            <button className="absolute right-4 top-3 text-gray-600 text-2xl hover:text-amber-700 transition" onClick={closeModal} aria-label="Đóng">&times;</button>
                            <div className="flex gap-5 flex-col sm:flex-row">
                                <img className="w-full sm:w-[260px] h-[200px] sm:h-[160px] object-cover rounded-lg flex-shrink-0 border-2 border-amber-300 shadow-lg" src={modalData.img} alt={modalData.title} />
                                <div>
                                    <h3 className="text-amber-800 text-2xl font-bold">{modalData.title}</h3>
                                    <p className="text-gray-700 mt-3 leading-relaxed">{modalData.desc}</p>
                                </div>
                            </div>
                            <h4 className="text-amber-800 font-semibold mt-6 mb-3 text-lg">Danh nhân tiêu biểu</h4>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                {modalData.figures.map((f, idx) => (
                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center hover:bg-amber-100 hover:shadow-md transition" key={idx}>
                                        <img src={f.img} alt={f.name} className="w-full h-[120px] object-cover rounded-md mb-3 border border-amber-200" />
                                        <h4 className="text-amber-800 font-semibold text-base">{f.name}</h4>
                                        <p className="text-gray-600 text-sm mt-2">{f.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Event Detail Modal */}
                <div className={`${eventModalData ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm p-6`} onClick={(e) => { if (e.target === e.currentTarget) closeEventModal() }}>
                    {eventModalData && (
                        <div className="max-w-[920px] w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-2xl relative border-2 border-purple-300">
                            <button className="sticky top-0 right-0 float-right text-gray-600 text-3xl hover:text-purple-700 transition z-10" onClick={closeEventModal} aria-label="Đóng">&times;</button>
                            
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-purple-800 mb-2">{eventModalData.name}</h2>
                                <div className="text-purple-600 font-semibold mb-4">📅 Năm: {eventModalData.year}</div>
                            </div>

                            {/* Tóm tắt */}
                            <div className="mb-6 p-4 bg-purple-100 rounded-lg border border-purple-200">
                                <h3 className="text-lg font-semibold text-purple-800 mb-2">📌 Tóm tắt</h3>
                                <p className="text-gray-700 leading-relaxed">{eventModalData.tomtat}</p>
                            </div>

                            {/* Bối cảnh lịch sử */}
                            {eventModalData.context && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                        <span>📜</span> Bối cảnh lịch sử
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-purple-100">
                                        {eventModalData.context}
                                    </p>
                                </div>
                            )}

                            {/* Diễn biến */}
                            {eventModalData.dienbien && eventModalData.dienbien.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                        <span>⚔️</span> Diễn biến sự kiện
                                    </h3>
                                    <ol className="space-y-3">
                                        {eventModalData.dienbien.map((step, idx) => (
                                            <li key={idx} className="flex gap-3 bg-white p-4 rounded-lg border border-purple-100 hover:bg-purple-50 transition">
                                                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {/* Ý nghĩa */}
                            {eventModalData.ynghia && eventModalData.ynghia.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                        <span>💡</span> Ý nghĩa lịch sử
                                    </h3>
                                    <ul className="space-y-2">
                                        {eventModalData.ynghia.map((meaning, idx) => (
                                            <li key={idx} className="flex gap-3 bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                                                <span className="text-purple-600 font-bold">✓</span>
                                                <p className="text-gray-700 leading-relaxed flex-1">{meaning}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <footer className="text-center text-gray-600 mt-8">© 2025 MT4 — Nghệ Thuật Ký Ức 4.0 • Liên hệ: hello@mt4.vn</footer>
            </div>
        </div>
    )
}
