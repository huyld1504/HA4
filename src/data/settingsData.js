// Mock data for Settings page

export const settingsTabs = [
  { id: 'account', label: 'Tài khoản & Bảo mật', icon: '�' },
  { id: 'notifications', label: 'Thông báo', icon: '�' },
  { id: 'appearance', label: 'Giao diện', icon: '🎨' },
  { id: 'privacy', label: 'Quyền riêng tư', icon: '🛡️' },
  { id: 'language', label: 'Ngôn ngữ & Khu vực', icon: '🌐' },
]

export const defaultFormData = {
  // Account Settings
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorAuth: false,
  loginAlerts: true,

  // Notification Settings
  emailNotifications: true,
  pushNotifications: true,
  newsUpdates: false,
  eventReminders: true,
  forumReplies: true,
  marketingEmails: false,

  // Appearance Settings
  darkMode: false,
  compactMode: false,
  autoPlayVideos: true,
  animatedEffects: true,
  fontSize: 'medium',
  theme: 'default',

  // Privacy Settings
  profileVisibility: 'public',
  showEmail: false,
  showPhone: false,
  showActivity: true,
  allowMessaging: true,

  // Language Settings
  language: 'vi',
  timezone: 'Asia/Ho_Chi_Minh',
  dateFormat: 'DD/MM/YYYY',
}

export const privacyOptions = [
  { value: 'public', label: 'Công khai' },
  { value: 'friends', label: 'Chỉ bạn bè' },
  { value: 'private', label: 'Riêng tư' },
]

export const accountSecuritySettings = [
  {
    id: 'twoFactorAuth',
    title: 'Xác thực hai yếu tố',
    description: 'Tăng cường bảo mật với xác thực 2 lớp'
  },
  {
    id: 'loginAlerts',
    title: 'Cảnh báo đăng nhập',
    description: 'Nhận thông báo khi có đăng nhập mới'
  },
]

export const notificationSettings = [
  {
    id: 'emailNotifications',
    title: 'Thông báo Email',
    description: 'Nhận thông báo qua email'
  },
  {
    id: 'pushNotifications',
    title: 'Thông báo Push',
    description: 'Nhận thông báo trên trình duyệt'
  },
  {
    id: 'newsUpdates',
    title: 'Tin tức mới',
    description: 'Nhận thông báo khi có tin tức mới'
  },
  {
    id: 'eventReminders',
    title: 'Nhắc nhở sự kiện',
    description: 'Nhận nhắc nhở về các sự kiện đã đăng ký'
  },
  {
    id: 'forumReplies',
    title: 'Phản hồi Forum',
    description: 'Thông báo khi có người trả lời bài viết của bạn'
  },
  {
    id: 'marketingEmails',
    title: 'Email tiếp thị',
    description: 'Nhận thông tin khuyến mãi và ưu đãi'
  },
]

export const appearanceSettings = [
  {
    id: 'darkMode',
    title: 'Chế độ tối',
    description: 'Sử dụng giao diện màu tối'
  },
  {
    id: 'compactMode',
    title: 'Chế độ thu gọn',
    description: 'Hiển thị nội dung dạng thu gọn'
  },
  {
    id: 'autoPlayVideos',
    title: 'Tự động phát video',
    description: 'Video tự động phát khi cuộn tới'
  },
  {
    id: 'animatedEffects',
    title: 'Hiệu ứng động',
    description: 'Bật các hiệu ứng chuyển động'
  },
]

export const privacySettings = [
  {
    id: 'showEmail',
    title: 'Hiển thị Email',
    description: 'Cho phép người khác xem email của bạn'
  },
  {
    id: 'showPhone',
    title: 'Hiển thị Số điện thoại',
    description: 'Cho phép người khác xem số điện thoại của bạn'
  },
  {
    id: 'showActivity',
    title: 'Hiển thị hoạt động',
    description: 'Người khác có thể xem hoạt động của bạn'
  },
  {
    id: 'allowMessaging',
    title: 'Cho phép nhắn tin',
    description: 'Người khác có thể gửi tin nhắn cho bạn'
  },
]

export const fontSizeOptions = [
  { value: 'small', label: 'Nhỏ' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'large', label: 'Lớn' },
]

export const themeOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'warm', label: 'Ấm áp' },
  { value: 'cool', label: 'Mát mẻ' },
  { value: 'classic', label: 'Cổ điển' },
]

export const languageOptions = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ja', label: '日本語' },
]

export const timezoneOptions = [
  { value: 'Asia/Ho_Chi_Minh', label: '(GMT+7) Hà Nội, Bangkok' },
  { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
  { value: 'Europe/London', label: '(GMT+0) London' },
  { value: 'America/New_York', label: '(GMT-5) New York' },
]

export const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]
