// Mock data for Settings page

export const settingsTabs = [
  { id: 'profile', label: 'Thông tin cá nhân', icon: '👤' },
  { id: 'account', label: 'Tài khoản & Bảo mật', icon: '🔒' },
  { id: 'notifications', label: 'Thông báo', icon: '🔔' },
  { id: 'privacy', label: 'Quyền riêng tư', icon: '🛡️' },
]

export const defaultFormData = {
  // Profile Settings
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0123456789',
  bio: 'Yêu thích nghệ thuật và văn hóa Việt Nam',

  // Account Settings
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',

  // Notification Settings
  emailNotifications: true,
  pushNotifications: true,
  newsUpdates: false,
  eventReminders: true,

  // Privacy Settings
  profileVisibility: 'public',
  showEmail: false,
  showPhone: false,
}

export const privacyOptions = [
  { value: 'public', label: 'Công khai' },
  { value: 'friends', label: 'Chỉ bạn bè' },
  { value: 'private', label: 'Riêng tư' },
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
]
