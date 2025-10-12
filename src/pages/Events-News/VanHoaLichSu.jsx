import React, { useEffect, useRef, useState } from 'react'
import nhangoImg from '../../assets/nhango.jpg'
import nhathoImg from '../../assets/nhatho.png'
import nhathoDucbaImg from '../../assets/nhathoducba.jpg'
import nhathoDucbaAiImg from '../../assets/nhathoducbaai.png'
import hueImg from '../../assets/hue.jpg'
import diadaoImg from '../../assets/diadao.png'

const dynastyData = {
ngo: {
    title: "Ngô & Các Giai đoạn sơ khai",
    img: nhangoImg,
    desc: "Những nền tảng đầu tiên của nhà nước và xã hội Việt cổ — tiền đề cho các triều đại sau.",
    figures: [
        { name: "Ngô Quyền", img: nhangoImg, bio: "Chiến thắng Bạch Đằng (938) giành độc lập từ Trung Hoa." },
        { name: "Dương Tam Kha", img: nhangoImg, bio: "Nhân vật triều Ngô, có ảnh hưởng tới chính trị nội bộ." }
    ]
},
ly: {
    title: "Triều Lý (1009–1225)",
    img: nhathoDucbaImg,
    desc: "Triều Lý xây dựng Thăng Long, phát triển Phật giáo, hệ thống kinh tế và giáo dục.",
    figures: [
        { name: "Lý Thái Tổ", img: nhathoDucbaImg, bio: "Vua sáng lập cố đô Thăng Long (Hà Nội)." },
        { name: "Lý Công Uẩn", img: nhathoDucbaImg, bio: "Nhà lãnh đạo và chính trị gia tiêu biểu của triều Lý." }
    ]
},
tran: {
    title: "Triều Trần (1225–1400)",
    img: diadaoImg,
    desc: "Nổi bật với các chiến thắng chống quân Nguyên, củng cố quân lực và văn hóa.",
    figures: [
        { name: "Trần Hưng Đạo", img: diadaoImg, bio: "Danh tướng đại tài, người chỉ huy chiến thắng Bạch Đằng." },
        { name: "Trần Nhân Tông", img: diadaoImg, bio: "Vua và thiền sư, có ảnh hưởng lớn về tinh thần và văn hóa." }
    ]
},
le: {
    title: "Triều Lê (1428–1789)",
    img: hueImg,
    desc: "Kỷ nguyên Lê sơ và Lê trung hưng, phát triển văn hiến và luật pháp.",
    figures: [
        { name: "Lê Lợi", img: hueImg, bio: "Lãnh tụ khởi nghĩa Lam Sơn, sáng lập triều Lê." },
        { name: "Nguyễn Trãi", img: hueImg, bio: "Danh sĩ, nhà văn hóa, nhà chính trị thời Lê." }
    ]
},
nguyen: {
    title: "Triều Nguyễn (1802–1945)",
    img: nhathoImg,
    desc: "Triều đại phong kiến cuối cùng, để lại nhiều di sản kiến trúc và văn hóa vật thể.",
    figures: [
        { name: "Nguyễn Ánh (Gia Long)", img: nhathoImg, bio: "Người sáng lập triều Nguyễn." },
        { name: "Nguyễn Huệ (Quang Trung)", img: nhathoImg, bio: "Nhà quân sự kiệt xuất, đánh tan quân Thanh." }
    ]
},
modern: {
    title: "Hiện đại (Đổi mới & Số hóa)",
    img: nhathoDucbaAiImg,
    desc: "Giai đoạn hội nhập, số hóa, bảo tồn di sản bằng công nghệ và AI.",
    figures: [
        { name: "Nhà nghiên cứu văn hóa", img: nhathoDucbaAiImg, bio: "Những chuyên gia đang số hóa và nghiên cứu di sản." },
        { name: "Cộng đồng trẻ", img: nhathoDucbaAiImg, bio: "Thế hệ kết nối kỹ thuật số với quá khứ." }
    ]
}
}

export default function VanHoaLichSu() {
const [modalData, setModalData] = useState(null)
const [slideshowIndex, setSlideshowIndex] = useState(0)
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

function openModal(key) {
if (!key || !dynastyData[key]) return
setModalData(dynastyData[key])
document.body.style.overflow = 'hidden'
}
function closeModal() {
setModalData(null)
document.body.style.overflow = ''
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
                            <div className="text-sm text-gray-600">Click vào triều đại để xem chi tiết</div>
                        </div>

                        <nav className="mt-4 pl-6" aria-label="Timeline tree">
                            <ul className="relative">
                                <li className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-amber-400 before:to-amber-600">
                                    <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('ngo')}>
                                                <div className="w-11 h-11 rounded-md flex items-center justify-center bg-gradient-to-tr from-amber-500 to-amber-600 overflow-hidden border-2 border-amber-300 shadow-md">
                                                    <img loading="lazy" src={nhangoImg} alt="Ngô" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                                </div>
                                                
                                            <div>
                                                <div className="font-semibold text-amber-800">Ngô (Dự kiến)</div>
                                                <div className="text-sm text-gray-600">Khởi lập vương triều</div>
                                            </div>
                                        </div>

                                        <div className="ml-6 mt-3 space-y-3">
                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('ly')}>
                                                <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm"><img loading="lazy" src={nhathoDucbaImg} alt="Lý" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" /></div>
                                                <div>
                                                    <div className="font-semibold text-amber-800">Lý (1009–1225)</div>
                                                    <div className="text-sm text-gray-600">Quốc gia thịnh vượng, Phật giáo thịnh hành</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('tran')}>
                                                <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm"><img loading="lazy" src={diadaoImg} alt="Trần" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" /></div>
                                                <div>
                                                    <div className="font-semibold text-amber-800">Trần (1225–1400)</div>
                                                    <div className="text-sm text-gray-600">Chiến thắng quân Nguyên, phát triển văn hóa</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('le')}>
                                                <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm"><img loading="lazy" src={hueImg} alt="Lê" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" /></div>
                                                <div>
                                                    <div className="font-semibold text-amber-800">Lê (1428–1789)</div>
                                                    <div className="text-sm text-gray-600">Lê sơ, Lê trung hưng</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('nguyen')}>
                                                <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm"><img loading="lazy" src={nhathoImg} alt="Nguyễn" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" /></div>
                                                <div>
                                                    <div className="font-semibold text-amber-800">Nguyễn (1802–1945)</div>
                                                    <div className="text-sm text-gray-600">Triều Nguyễn & di sản kiến trúc</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-50 border border-amber-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-md transition-all duration-300" onClick={() => openModal('modern')}>
                                                <div className="w-11 h-11 rounded-md overflow-hidden border-2 border-amber-300 shadow-sm"><img loading="lazy" src={nhathoDucbaAiImg} alt="Hiện đại" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" /></div>
                                                <div>
                                                    <div className="font-semibold text-amber-800">Hiện đại</div>
                                                    <div className="text-sm text-gray-600">Đổi mới, số hóa di sản</div>
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

                <footer className="text-center text-gray-600 mt-8">© 2025 MT4 — Nghệ Thuật Ký Ức 4.0 • Liên hệ: hello@mt4.vn</footer>
            </div>
        </div>
    )
}
