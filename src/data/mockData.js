// Mock data for events
export const events = [
{
    id: '1',
    title: 'Khám phá di sản văn hóa Huế',
    description: 'Hành trình khám phá kiến trúc và văn hóa cung đình triều Nguyễn qua các di tích lịch sử nổi tiếng.',
    shortIntro: 'Một trải nghiệm cả ngày tại cố đô Huế, kết hợp tham quan, thuyết minh chuyên sâu và giao lưu cùng các chuyên gia di sản.',
    theme: 'Ký ức cố đô — khám phá không gian, kiến trúc và nghi lễ cung đình',
    timeline: [
        { time: '08:00', label: 'Tập trung & đón khách tại điểm hẹn' },
        { time: '09:00', label: 'Tham quan Đại Nội - hướng dẫn chuyên đề' },
        { time: '12:00', label: 'Ăn trưa & giao lưu' },
        { time: '13:30', label: 'Tham quan lăng tẩm & đền chùa' },
        { time: '16:30', label: 'Q&A với chuyên gia và kết thúc' }
    ],
    rules: [
        { title: 'Đối tượng', content: 'Sinh viên, nghệ sĩ, nhà nghiên cứu và người yêu văn hóa Việt Nam' },
        { title: 'Số lượng tác phẩm', content: 'Mỗi cá nhân / nhóm được nộp tối đa 3 tác phẩm' },
        { title: 'Định dạng file', content: 'PNG, JPEG (tranh/ảnh), MP4 (video), PDF (báo cáo). Dung lượng ≤100MB' },
        { title: 'Bản quyền', content: 'Tác phẩm phải do người nộp sáng tạo, không vi phạm bản quyền bên thứ ba' },
        { title: 'Thời gian nộp', content: 'Từ ngày 15/12/2024 đến hết 15/01/2025' },
        { title: 'Công bố kết quả', content: 'Dự kiến ngày 01/02/2025 trên website và email' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Sự kiện này sẽ đưa bạn đến với những di tích lịch sử quan trọng nhất của cố đô Huế, bao gồm Đại Nội, các lăng tẩm của các vị vua triều Nguyễn, và các đền chùa cổ kính. Chuyên gia sẽ hướng dẫn và giải thích về kiến trúc, lịch sử và ý nghĩa văn hóa của từng công trình.',
    date: '15/12/2024',
    time: '7 ngày',
    location: 'Huế, Thừa Thiên Huế',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop',
    isFeatured: true,
    tags: ['di sản', 'lịch sử', 'huế']
},
{
    id: '2',
    title: 'Hội thảo nghệ thuật điêu khắc Chăm',
    description: 'Tìm hiểu về nghệ thuật điêu khắc tinh xảo của văn hóa Chăm Pa qua các di tích và tác phẩm nghệ thuật.',
    shortIntro: 'Hội thảo nêu bật các phát hiện mới và phương pháp phục dựng điêu khắc Chăm.',
    theme: 'Bảo tồn & phục dựng di sản điêu khắc Chăm',
    rules: [
        { title: 'Đối tượng', content: 'Mở rộng cho tất cả đối tượng quan tâm đến nghệ thuật Chăm Pa' },
        { title: 'Số lượng tác phẩm', content: 'Tối đa 2 tác phẩm mỗi cá nhân' },
        { title: 'Định dạng file', content: 'PNG, JPEG, PDF. Dung lượng ≤50MB' },
        { title: 'Bản quyền', content: 'Đảm bảo tính nguyên gốc và không vi phạm bản quyền' },
        { title: 'Thời gian nộp', content: 'Đến hết 20/12/2024' },
        { title: 'Công bố kết quả', content: 'Ngày 25/12/2024' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Hội thảo sẽ giới thiệu về lịch sử phát triển nghệ thuật điêu khắc Chăm, các đặc điểm độc đáo trong phong cách nghệ thuật, và ảnh hưởng của văn hóa Chăm đến nghệ thuật Việt Nam. Các chuyên gia hàng đầu sẽ trình bày và thảo luận về các phát hiện mới trong nghiên cứu văn hóa Chăm.',
    date: '20/12/2024',
    time: '7 ngày',
    location: 'Đà Nẵng, Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    isFeatured: true,
    tags: ['nghệ thuật', 'chăm pa', 'điêu khắc']
},
{
    id: '3',
    title: 'Triển lãm tranh dân gian Đông Hồ',
    description: 'Chiêm ngưỡng và tìm hiểu về nghệ thuật tranh dân gian truyền thống Đông Hồ với các nghệ nhân.',
    shortIntro: 'Triển lãm giới thiệu tranh Đông Hồ cổ điển và các tác phẩm đương đại lấy cảm hứng từ tranh dân gian.',
    theme: 'Tranh dân gian — kết nối truyền thống và hiện đại',
    rules: [
        { title: 'Đối tượng', content: 'Sinh viên nghệ thuật, họa sĩ, nhà thiết kế và công chúng yêu tranh dân gian' },
        { title: 'Số lượng tác phẩm', content: 'Mỗi người được nộp tối đa 3 tác phẩm' },
        { title: 'Định dạng file', content: 'PNG, JPEG (tranh), MP4 (video giới thiệu). Dung lượng ≤100MB' },
        { title: 'Bản quyền', content: 'Tác phẩm phải tự sáng tạo, được phép lấy cảm hứng từ tranh Đông Hồ truyền thống' },
        { title: 'Thời gian nộp', content: 'Từ 01/12/2024 đến 20/12/2024' },
        { title: 'Công bố kết quả', content: 'Ngày 28/12/2024 tại triển lãm' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Triển lãm trưng bày hơn 100 tác phẩm tranh Đông Hồ từ các thời kỳ khác nhau, cùng với workshop thực hành in tranh truyền thống. Các nghệ nhân sẽ trực tiếp hướng dẫn và chia sẻ về quy trình tạo ra những bức tranh dân gian độc đáo này.',
    date: '25/12/2024',
    time: '7 ngày',
    location: 'Hà Nội, Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800&h=600&fit=crop',
    isFeatured: true,
    tags: ['tranh dân gian', 'đông hồ', 'triển lãm']
},
{
    id: '4',
    title: 'Lễ hội văn hóa dân tộc thiểu số',
    description: 'Trải nghiệm văn hóa đa dạng của các dân tộc thiểu số Việt Nam qua âm nhạc, múa và ẩm thực.',
    shortIntro: 'Lễ hội quy tụ nhiều dân tộc thiểu số với các hoạt động biểu diễn, hội chợ nghề truyền thống và ẩm thực đặc sắc.',
    theme: 'Sắc màu văn hóa — tôn vinh đa dạng dân tộc',
    rules: [
        { title: 'Đối tượng', content: 'Tất cả các cá nhân và tổ chức quan tâm văn hóa dân tộc' },
        { title: 'Số lượng tác phẩm', content: 'Không giới hạn số lượng tác phẩm' },
        { title: 'Định dạng file', content: 'PNG, JPEG, MP4, PDF. Dung lượng ≤150MB' },
        { title: 'Bản quyền', content: 'Tôn trọng văn hóa dân tộc, không xuyên tạc' },
        { title: 'Thời gian nộp', content: 'Đến hết 25/12/2024' },
        { title: 'Công bố kết quả', content: 'Ngày 05/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Lễ hội quy tụ đại diện từ hơn 20 dân tộc thiểu số, mang đến những màn trình diễn nghệ thuật truyền thống, gian hàng thủ công mỹ nghệ, và ẩm thực đặc sắc. Đây là cơ hội tuyệt vời để tìm hiểu về sự đa dạng văn hóa của Việt Nam.',
    date: '30/12/2024',
    time: '7 ngày',
    location: 'Sapa, Lào Cai',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    isFeatured: false,
    tags: ['lễ hội', 'dân tộc', 'văn hóa']
},
{
    id: '5',
    title: 'Tọa đàm bảo tồn di sản văn hóa',
    description: 'Thảo luận về các phương pháp hiện đại trong bảo tồn và phát huy giá trị di sản văn hóa.',
    shortIntro: 'Tọa đàm chuyên sâu về các phương pháp kỹ thuật và chính sách trong bảo tồn di sản.',
    theme: 'Bảo tồn để phát huy — giải pháp và chính sách',
    rules: [
        { title: 'Đối tượng', content: 'Nhà nghiên cứu, chuyên gia, sinh viên và người quan tâm bảo tồn' },
        { title: 'Số lượng tác phẩm', content: 'Tối đa 2 bài nghiên cứu hoặc đề xuất' },
        { title: 'Định dạng file', content: 'PDF (báo cáo nghiên cứu). Dung lượng ≤50MB' },
        { title: 'Bản quyền', content: 'Nghiên cứu độc lập, trích dẫn nguồn rõ ràng' },
        { title: 'Thời gian nộp', content: 'Đến hết 01/01/2025' },
        { title: 'Công bố kết quả', content: 'Ngày 10/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Tọa đàm tập trung vào các thách thức và giải pháp trong công tác bảo tồn di sản văn hóa vật thể và phi vật thể. Các chuyên gia trong nước và quốc tế sẽ chia sẻ kinh nghiệm và công nghệ mới nhất trong lĩnh vực bảo tồn di sản.',
    date: '05/01/2025',
    time: '7 ngày',
    location: 'TP. Hồ Chí Minh',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    isFeatured: false,
    tags: ['bảo tồn', 'di sản', 'hội thảo']
},
{
    id: '6',
    title: 'Workshop nghệ thuật gốm sứ Bát Tràng',
    description: 'Học nghệ thuật làm gốm truyền thống cùng các nghệ nhân làng gốm Bát Tràng nổi tiếng.',
    shortIntro: 'Workshop thực hành gốm sứ 2 ngày, hướng dẫn từ nhào nặn đến nung bởi nghệ nhân Bát Tràng.',
    theme: 'Kỹ thuật truyền thống & sáng tạo vật liệu',
    rules: [
        { title: 'Đối tượng', content: 'Học viên từ 16 tuổi trở lên, yêu thích nghệ thuật gốm sứ' },
        { title: 'Số lượng tác phẩm', content: 'Mỗi người tạo tối đa 3 sản phẩm gốm trong workshop' },
        { title: 'Định dạng file', content: 'PNG, JPEG (ảnh sản phẩm), MP4 (video quá trình). Dung lượng ≤100MB' },
        { title: 'Bản quyền', content: 'Sản phẩm thuộc về người tham gia, được mang về sau khi nung xong' },
        { title: 'Thời gian nộp', content: 'Đến hết 05/01/2025' },
        { title: 'Công bố kết quả', content: 'Ngày 15/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Workshop 2 ngày với các nghệ nhân hàng đầu của làng gốm Bát Tràng. Người tham gia sẽ được học từ khâu nhào nặn, tạo hình, trang trí đến nung gốm. Mỗi người sẽ được mang về sản phẩm gốm do chính mình làm ra.',
    date: '10/01/2025',
    time: '7 ngày',
    location: 'Bát Tràng, Hà Nội',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop',
    isFeatured: false,
    tags: ['workshop', 'gốm sứ', 'bát tràng']
},
{
    id: '7',
    title: 'Khóa học thư pháp chữ Nôm',
    description: 'Học viên sẽ được tìm hiểu và thực hành nghệ thuật viết chữ Nôm cổ truyền với các thầy giáo có kinh nghiệm.',
    shortIntro: 'Khóa học 4 tuần giới thiệu lịch sử chữ Nôm và kỹ thuật thư pháp truyền thống.',
    theme: 'Bảo tồn văn tự cổ — thư pháp Nôm',
    rules: [
        { title: 'Đối tượng', content: 'Người yêu thích thư pháp, văn hóa chữ Nôm, từ 18 tuổi trở lên' },
        { title: 'Số lượng tác phẩm', content: 'Mỗi học viên hoàn thành 5 bài thư pháp trong khóa học' },
        { title: 'Định dạng file', content: 'PNG, JPEG (ảnh tác phẩm). Dung lượng ≤50MB' },
        { title: 'Bản quyền', content: 'Tác phẩm thuộc về học viên' },
        { title: 'Thời gian nộp', content: 'Đến hết 10/01/2025' },
        { title: 'Công bố kết quả', content: 'Ngày 20/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Khóa học thư pháp chữ Nôm kéo dài 4 tuần, với 2 buổi học mỗi tuần. Học viên sẽ được học về lịch sử chữ Nôm, các nét cơ bản và cách viết các bài thơ Nôm nổi tiếng. Cuối khóa, mỗi học viên sẽ có một tác phẩm hoàn chỉnh để triển lãm.',
    date: '15/01/2025',
    time: '7 ngày',
    location: 'Văn Miếu - Quốc Tử Giám, Hà Nội',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    isFeatured: false,
    tags: ['thư pháp', 'chữ nôm', 'văn hóa']
},
{
    id: '8',
    title: 'Festival âm nhạc cổ truyền Việt Nam',
    description: 'Liên hoan âm nhạc cổ truyền quy tụ các nghệ sĩ nổi tiếng biểu diễn ca trù, chèo, tuồng và nhã nhạc cung đình.',
    shortIntro: 'Festival 3 ngày với hơn 30 tiết mục âm nhạc cổ truyền từ 3 miền đất nước.',
    theme: 'Hòa quyện di sản âm nhạc — từ truyền thống đến hiện đại',
    rules: [
        { title: 'Đối tượng', content: 'Nghệ sĩ, nhóm nhạc cổ truyền, người yêu âm nhạc dân tộc' },
        { title: 'Số lượng tác phẩm', content: 'Mỗi nghệ sĩ/nhóm biểu diễn 1-2 tiết mục' },
        { title: 'Định dạng file', content: 'MP3, MP4 (video biểu diễn). Dung lượng ≤200MB' },
        { title: 'Bản quyền', content: 'Tôn trọng bản quyền tác phẩm âm nhạc truyền thống' },
        { title: 'Thời gian nộp', content: 'Đến hết 15/01/2025' },
        { title: 'Công bố kết quả', content: 'Ngày 25/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Festival âm nhạc cổ truyền là sự kiện văn hóa lớn nhất năm, quy tụ các nghệ sĩ ưu tú từ cả nước. Chương trình gồm các màn trình diễn ca trù, hát chèo, hát tuồng, nhã nhạc cung đình Huế, và nhiều loại hình âm nhạc dân gian khác. Đây là cơ hội để công chúng được thưởng thức nghệ thuật âm nhạc truyền thống đích thực.',
    date: '20/01/2025',
    time: '7 ngày',
    location: 'Nhà hát Lớn Hà Nội',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
    isFeatured: true,
    tags: ['âm nhạc', 'festival', 'ca trù']
},
{
    id: '9',
    title: 'Hội chợ sách cổ và tư liệu lịch sử',
    description: 'Hội chợ trưng bày và giao lưu sách cổ, tư liệu lịch sử quý hiếm về Việt Nam từ các nhà sưu tầm.',
    shortIntro: 'Hội chợ 2 ngày với hàng ngàn đầu sách cổ, tư liệu và bản đồ lịch sử.',
    theme: 'Lưu giữ ký ức — sách cổ & tư liệu quý',
    rules: [
        { title: 'Đối tượng', content: 'Nhà sưu tầm, nhà nghiên cứu, sinh viên và người yêu sách cổ' },
        { title: 'Số lượng tác phẩm', content: 'Không giới hạn số lượng sách/tư liệu trưng bày' },
        { title: 'Định dạng file', content: 'PDF (catalog sách). Dung lượng ≤100MB' },
        { title: 'Bản quyền', content: 'Đảm bảo nguồn gốc hợp pháp của sách và tư liệu' },
        { title: 'Thời gian nộp', content: 'Đến hết 20/01/2025' },
        { title: 'Công bố kết quả', content: 'Ngày 30/01/2025' }
    ],
    requirements: [
        { title: 'Tác phẩm', content: 'Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).' },
        { title: 'Kích thước', content: 'Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.' },
        { title: 'Thông tin bắt buộc', content: 'Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.' },
        { title: 'Bản quyền', content: 'Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.' },
        { title: 'Số lượng', content: 'Mỗi người được gửi tối đa 3 tác phẩm.' }
    ],
    criteria: [
        { title: 'Sáng tạo & ý tưởng', percent: '40%', description: 'Độc đáo, truyền tải ký ức/di sản.' },
        { title: 'Chất lượng nghệ thuật', percent: '30%', description: 'Bố cục, màu sắc, kỹ thuật.' },
        { title: 'Tương tác công nghệ', percent: '20%', description: 'Sử dụng AI/AR/VR/âm thanh sáng tạo.' },
        { title: 'Tác động văn hóa', percent: '10%', description: 'Khả năng truyền cảm hứng & giáo dục cộng đồng.' }
    ],
    judges: 'Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.',
    prizes: [
        { name: 'Giải Nhất', value: '10.000.000₫', bonus: 'Triển lãm & ấn phẩm' },
        { name: 'Giải Nhì', value: '5.000.000₫', bonus: 'Triển lãm' },
        { name: 'Giải Khuyến khích & Khán giả bình chọn', value: 'Quà tặng', bonus: 'Giấy chứng nhận' }
    ],
    faq: [
        { question: 'Đăng ký có mất phí không?', answer: 'Miễn phí hoàn toàn.' },
        { question: 'Bản quyền tác phẩm thuộc về ai?', answer: 'Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.' },
        { question: 'Có thể gửi nhiều tác phẩm không?', answer: 'Có, tối đa 3 tác phẩm mỗi tác giả.' }
    ],
    content: 'Hội chợ sách cổ và tư liệu lịch sử là điểm hẹn của các nhà sưu tầm và người yêu sách cổ. Tại đây trưng bày hàng ngàn đầu sách cổ, tài liệu lịch sử, bản đồ cổ về Việt Nam từ thế kỷ 18 đến nay. Các chuyên gia sẽ tư vấn về giá trị và cách bảo quản sách cổ. Đây cũng là cơ hội để giao lưu, mua bán và trao đổi sách giữa các nhà sưu tầm.',
    date: '25/01/2025',
    time: '7 ngày',
    location: 'Trung tâm Triển lãm Giảng Võ, Hà Nội',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop',
    isFeatured: false,
    tags: ['sách cổ', 'hội chợ', 'lịch sử']
}
]

// Mock data for news
export const news = [
{
    id: '1',
    title: 'Phát hiện khu di tích mới tại Thăng Long',
    description: 'Các nhà khảo cổ học vừa phát hiện một khu di tích quan trọng thuộc thời Lý - Trần tại hoàng thành Thăng Long.',
    content: 'Khu di tích mới được phát hiện bao gồm nhiều công trình kiến trúc, các hiện vật quý giá và dấu tích sinh hoạt của cư dân thời xưa. Đây là phát hiện quan trọng giúp làm sáng tỏ thêm về lịch sử kinh đô Thăng Long ngàn năm văn hiến. Các chuyên gia đang tiến hành khai quật và nghiên cứu để có thể công bố đầy đủ về giá trị lịch sử và văn hóa của khu di tích này.',
    date: '01/12/2024',
    author: 'Nguyễn Văn A',
    category: 'Khảo cổ học',
    imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop'
},
{
    id: '2',
    title: 'UNESCO công nhận thêm di sản văn hóa Việt Nam',
    description: 'Di sản văn hóa phi vật thể mới của Việt Nam được UNESCO ghi danh vào danh sách đại diện.',
    content: 'Trong phiên họp gần đây tại Paris, UNESCO đã chính thức công nhận thêm một di sản văn hóa phi vật thể của Việt Nam vào danh sách di sản văn hóa phi vật thể đại diện của nhân loại. Đây là minh chứng cho sự đa dạng và giá trị to lớn của văn hóa Việt Nam trên bản đồ văn hóa thế giới.',
    date: '28/11/2024',
    author: 'Trần Thị B',
    category: 'Di sản văn hóa',
    imageUrl: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop'
},
{
    id: '3',
    title: 'Nghệ thuật hát Xẩm được bảo tồn và phát huy',
    description: 'Dự án bảo tồn nghệ thuật hát Xẩm truyền thống đang mang lại những kết quả khả quan.',
    content: 'Sau 3 năm triển khai, dự án bảo tồn nghệ thuật hát Xẩm đã đào tạo được hơn 50 nghệ nhân trẻ, tổ chức nhiều buổi biểu diễn và ghi âm lưu trữ hàng trăm ca khúc Xẩm truyền thống. Nghệ thuật hát Xẩm đang dần được giới trẻ quan tâm và yêu thích hơn.',
    date: '25/11/2024',
    author: 'Lê Văn C',
    category: 'Nghệ thuật truyền thống',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop'
    },
    {
    id: '4',
    title: 'Triển lãm ảnh lịch sử Việt Nam thế kỷ 20',
    description: 'Hơn 500 bức ảnh quý hiếm về Việt Nam thế kỷ 20 được trưng bày tại bảo tàng Lịch sử.',
    content: 'Triển lãm quy tụ những bức ảnh quý hiếm ghi lại những khoảnh khắc lịch sử quan trọng của đất nước, từ thời kỳ đầu thế kỷ 20 đến những năm đầu thống nhất đất nước. Đây là cơ hội tuyệt vời để công chúng được chiêm ngưỡng những tư liệu ảnh có giá trị lịch sử cao.',
    date: '20/11/2024',
    author: 'Phạm Thị D',
    category: 'Triển lãm',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop'
},
{
    id: '5',
    title: 'Khôi phục nghề dệt thổ cẩm truyền thống',
    description: 'Các nghệ nhân đang nỗ lực khôi phục và phát triển nghề dệt thổ cẩm của đồng bào dân tộc thiểu số.',
    content: 'Nghề dệt thổ cẩm truyền thống của các dân tộc thiểu số miền núi đang được khôi phục và phát triển nhờ sự nỗ lực của các nghệ nhân và sự hỗ trợ của chính quyền địa phương. Sản phẩm thổ cẩm hiện đại vừa giữ được nét truyền thống vừa đáp ứng nhu cầu thị trường.',
    date: '15/11/2024',
    author: 'Hoàng Văn E',
    category: 'Nghề truyền thống',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
},
{
    id: '6',
    title: 'Lễ hội đền Hùng thu hút hàng triệu lượt khách',
    description: 'Lễ hội đền Hùng năm nay đã thu hút hơn 3 triệu lượt khách về dâng hương tưởng nhớ công đức tổ tiên.',
    content: 'Với ý nghĩa "Uống nước nhớ nguồn", lễ hội đền Hùng năm nay diễn ra trang trọng và đậm đà bản sắc văn hóa dân tộc. Bên cạnh lễ dâng hương, nhiều hoạt động văn hóa, nghệ thuật và thể thao dân gian được tổ chức, góp phần gìn giữ và phát huy giá trị văn hóa truyền thống.',
    date: '10/11/2024',
    author: 'Vũ Thị F',
    category: 'Lễ hội',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop'
},
{
    id: '7',
    title: 'Chùa Một Cột được tu bổ và tôn tạo',
    description: 'Công trình tu bổ chùa Một Cột vừa hoàn thành, giữ nguyên được kiến trúc độc đáo từ thế kỷ 11.',
    content: 'Sau 6 tháng thi công, công trình tu bổ chùa Một Cột đã hoàn thành với sự tham gia của các chuyên gia kiến trúc và nghệ nhân hàng đầu. Công trình giữ nguyên được nét kiến trúc độc đáo, tinh xảo của ngôi chùa được xây dựng từ thời Lý Thánh Tông. Chùa Một Cột được UNESCO công nhận là di tích kiến trúc có giá trị đặc biệt.',
    date: '05/11/2024',
    author: 'Đỗ Minh Tuấn',
    category: 'Kiến trúc',
    imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop'
},
{
    id: '8',
    title: 'Làng nghề truyền thống được đầu tư phát triển du lịch',
    description: 'Nhiều làng nghề truyền thống đang chuyển mình thành điểm đến du lịch hấp dẫn cho du khách trong và ngoài nước.',
    content: 'Các làng nghề như làng gốm Bát Tràng, làng lụa Vạn Phúc, làng tranh Đông Hồ đang được đầu tư phát triển hạ tầng và dịch vụ du lịch. Du khách không chỉ được chiêm ngưỡng sản phẩm thủ công mà còn được trải nghiệm làm nghề cùng nghệ nhân. Mô hình này vừa bảo tồn nghề truyền thống vừa tạo thu nhập cho người dân địa phương.',
    date: '02/11/2024',
    author: 'Bùi Thu Hương',
    category: 'Du lịch văn hóa',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop'
},
{
    id: '9',
    title: 'Bảo tàng Hồ Chí Minh kỷ niệm 50 năm thành lập',
    description: 'Bảo tàng Hồ Chí Minh tổ chức chuỗi sự kiện kỷ niệm 50 năm thành lập với nhiều hoạt động ý nghĩa.',
    content: 'Nhân dịp kỷ niệm 50 năm thành lập, Bảo tàng Hồ Chí Minh tổ chức triển lãm đặc biệt với hơn 1000 hiện vật quý hiếm về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh. Bên cạnh đó, nhiều hoạt động như tọa đàm, chiếu phim tài liệu, và các chương trình giáo dục cho học sinh được tổ chức xuyên suốt tháng 11.',
    date: '30/10/2024',
    author: 'Ngô Thanh Long',
    category: 'Bảo tàng',
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3b7?w=800&h=600&fit=crop'
}
]

// Mock data for speakers
export const speakers = [
{
    id: '1',
    name: 'GS.TS Nguyễn Văn Huy',
    title: 'Chuyên gia Di sản văn hóa',
    bio: 'Giáo sư Nguyễn Văn Huy là một trong những chuyên gia hàng đầu về di sản văn hóa phi vật thể tại Việt Nam. Ông có hơn 30 năm kinh nghiệm trong nghiên cứu và bảo tồn di sản.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    expertise: ['Di sản văn hóa', 'Nhân học', 'Bảo tồn']
},
{
    id: '2',
    name: 'PGS.TS Trần Thị Mai',
    title: 'Nhà khảo cổ học',
    bio: 'Phó Giáo sư Trần Thị Mai chuyên về khảo cổ học thời tiền sử và lịch sử Việt Nam. Bà đã tham gia nhiều dự án khai quật và nghiên cứu di tích quan trọng.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    expertise: ['Khảo cổ học', 'Lịch sử', 'Di tích']
},
{
    id: '3',
    name: 'TS Lê Quang Minh',
    title: 'Chuyên gia Kiến trúc cổ',
    bio: 'Tiến sĩ Lê Quang Minh là chuyên gia về kiến trúc cổ Việt Nam, đặc biệt là kiến trúc thời Lý - Trần. Ông đã công bố nhiều công trình nghiên cứu có giá trị.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    expertise: ['Kiến trúc cổ', 'Bảo tồn công trình', 'Lịch sử kiến trúc']
},
{
    id: '4',
    name: 'ThS Phạm Thu Hà',
    title: 'Chuyên gia Nghệ thuật dân gian',
    bio: 'Thạc sĩ Phạm Thu Hà chuyên nghiên cứu về nghệ thuật dân gian Việt Nam, đặc biệt là tranh dân gian và điêu khắc truyền thống. Cô đã tổ chức nhiều triển lãm nghệ thuật dân gian.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    expertise: ['Nghệ thuật dân gian', 'Điêu khắc', 'Hội họa']
},
{
    id: '5',
    name: 'TS Hoàng Văn Nam',
    title: 'Chuyên gia Văn hóa dân tộc',
    bio: 'Tiến sĩ Hoàng Văn Nam có nhiều năm nghiên cứu về văn hóa các dân tộc thiểu số Việt Nam. Ông đã thực hiện nhiều chuyến khảo sát thực địa và xuất bản nhiều tác phẩm giá trị.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    expertise: ['Văn hóa dân tộc', 'Nhân học', 'Nghiên cứu thực địa']
},
{
    id: '6',
    name: 'PGS.TS Đặng Thị Lan',
    title: 'Chuyên gia Âm nhạc truyền thống',
    bio: 'Phó Giáo sư Đặng Thị Lan là chuyên gia hàng đầu về âm nhạc truyền thống Việt Nam. Bà đã góp phần lớn trong việc bảo tồn và phát huy các loại hình âm nhạc dân gian.',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    expertise: ['Âm nhạc truyền thống', 'Dân ca', 'Bảo tồn di sản âm nhạc']
}
]

// Helper functions
export const getEventById = (id) => events.find(event => event.id === id)
export const getNewsById = (id) => news.find(article => article.id === id)
export const getSpeakerById = (id) => speakers.find(speaker => speaker.id === id)
