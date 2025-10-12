// Mock data for Contact page

export const contactInfo = [
  {
    icon: '📧',
    title: 'Email',
    content: 'support@vanhoa-vietnam.vn',
    description: 'Gửi email cho chúng tôi bất cứ lúc nào',
    link: 'mailto:support@vanhoa-vietnam.vn'
  },
  {
    icon: '📞',
    title: 'Điện thoại',
    content: '1900 xxxx',
    description: 'Thứ 2 - Thứ 6, 8:00 - 17:00',
    link: 'tel:1900xxxx'
  },
  {
    icon: '📍',
    title: 'Địa chỉ',
    content: 'Hà Nội, Việt Nam',
    description: 'Đến thăm văn phòng của chúng tôi',
    link: null
  },
  {
    icon: '💬',
    title: 'Live Chat',
    content: 'Chat trực tuyến',
    description: 'Nhận hỗ trợ ngay lập tức',
    link: null
  },
]

export const faqItems = [
  {
    question: 'Làm thế nào để đăng ký tài khoản?',
    answer: 'Bạn có thể đăng ký tài khoản bằng cách nhấn vào nút "Đăng ký" trên thanh menu, điền thông tin cơ bản và xác nhận email.'
  },
  {
    question: 'Tôi có thể sử dụng tranh AI tạo ra cho mục đích thương mại không?',
    answer: 'Với tài khoản VIP, bạn có quyền sử dụng tranh AI cho mục đích thương mại. Tài khoản thường chỉ dùng cho mục đích cá nhân.'
  },
  {
    question: 'Làm sao để đặt mua tranh in?',
    answer: 'Vào phần "Cửa hàng", chọn tranh bạn muốn, chọn kích thước và chất liệu, sau đó thêm vào giỏ hàng và thanh toán.'
  },
  {
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Thời gian giao hàng thường từ 3-7 ngày làm việc tùy theo địa điểm và phương thức vận chuyển bạn chọn.'
  },
  {
    question: 'Có chính sách hoàn trả không?',
    answer: 'Chúng tôi chấp nhận hoàn trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất hoặc không đúng như mô tả.'
  },
]

export const socialLinks = [
  { icon: '👍', name: 'Facebook', link: '#', color: 'from-blue-500 to-blue-600' },
  { icon: '📷', name: 'Instagram', link: '#', color: 'from-pink-500 to-purple-600' },
  { icon: '🐦', name: 'Twitter', link: '#', color: 'from-sky-400 to-blue-500' },
  { icon: '📺', name: 'YouTube', link: '#', color: 'from-red-500 to-red-600' },
  { icon: '💼', name: 'LinkedIn', link: '#', color: 'from-blue-600 to-blue-700' },
]

export const workingHours = [
  {
    day: 'Thứ 2 - Thứ 6',
    hours: '8:00 - 17:00'
  },
  {
    day: 'Thứ 7',
    hours: '9:00 - 15:00'
  },
  {
    day: 'Chủ nhật',
    hours: 'Nghỉ'
  },
]

export const contactSubjects = [
  { value: 'general', label: 'Câu hỏi chung' },
  { value: 'technical', label: 'Hỗ trợ kỹ thuật' },
  { value: 'account', label: 'Vấn đề tài khoản' },
  { value: 'payment', label: 'Thanh toán' },
  { value: 'product', label: 'Sản phẩm' },
  { value: 'partnership', label: 'Hợp tác' },
  { value: 'feedback', label: 'Góp ý' },
]

export const defaultContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: 'general',
  message: '',
}
