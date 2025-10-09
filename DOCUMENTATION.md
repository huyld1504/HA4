# HA4 Project - React + Vite

Dự án React sử dụng Vite với cấu trúc code chuyên nghiệp.

## 🚀 Tính năng

- ✅ Navbar với dropdown menu "Tài khoản & Hỗ trợ"
- ✅ Trang Hồ sơ cá nhân (Profile)
- ✅ Trang Bạn bè (Friends)
- ✅ Component UI tái sử dụng
- ✅ Hooks tùy chỉnh
- ✅ Routing với React Router
- ✅ Responsive design

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── common/           # Components chung
│   │   ├── navigation/   # Navbar
│   │   └── AccountDropdown/
│   ├── UI/              # UI Components tái sử dụng
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── SearchInput/
│   │   └── Tab/
│   └── layouts/         # Layout components
├── pages/
│   ├── profile/         # Trang hồ sơ cá nhân
│   │   ├── components/
│   │   │   ├── ProfileHeader/
│   │   │   ├── ProfileInfo/
│   │   │   └── ProfileTabs/
│   │   ├── index.jsx
│   │   └── Profile.css
│   └── friends/         # Trang bạn bè
│       ├── components/
│       │   ├── FriendCard/
│       │   ├── FriendsList/
│       │   └── FriendSearch/
│       ├── index.jsx
│       └── Friends.css
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   └── useDebounce.js
├── routes/             # Route configuration
├── constants/          # Constants
│   ├── menu.js
│   └── routes.js
├── configs/            # App configs
│   └── api.js
├── utils/              # Utilities
│   ├── validation.js
│   └── format.js
└── store/             # State management
```

## 🛠️ Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📝 Routes

- `/` - Trang chủ
- `/profile` - Hồ sơ cá nhân
- `/friends` - Danh sách bạn bè
- `/settings` - Cài đặt
- `/guide` - Hướng dẫn
- `/contact` - Liên hệ

## 🎨 UI Components

### Avatar
```jsx
import { Avatar } from './components/UI';

<Avatar src="url" alt="name" size="lg" />
```

### Button
```jsx
import { Button } from './components/UI';

<Button variant="primary">Click me</Button>
```

### Card
```jsx
import { Card } from './components/UI';

<Card>Content here</Card>
```

### SearchInput
```jsx
import { SearchInput } from './components/UI';

<SearchInput placeholder="Search..." onChange={handleSearch} />
```

## 🔧 Custom Hooks

### useAuth
```jsx
import { useAuth } from './hooks';

const { user, login, logout } = useAuth();
```

### useDebounce
```jsx
import { useDebounce } from './hooks';

const debouncedValue = useDebounce(searchTerm, 500);
```

## 📦 Dependencies

- React 18
- React Router DOM
- Vite
- PropTypes

## 👥 Menu "Tài khoản & Hỗ trợ"

- 👤 Hồ sơ cá nhân
- 👥 Bạn bè
- ⚙️ Cài đặt
- 📖 Hướng dẫn
- 📞 Liên hệ
- 🚪 Đăng xuất

## 🌟 Features Coming Soon

- [ ] Real-time notifications
- [ ] Chat messaging
- [ ] Photo gallery
- [ ] Post creation
- [ ] Comments & Likes
- [ ] Dark mode

## 📄 License

MIT
