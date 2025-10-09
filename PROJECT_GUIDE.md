# MT4 - React Application

Ứng dụng web React hiện đại với Vite, bao gồm tính năng quản lý hồ sơ cá nhân và bạn bè.

## 🎯 Tính năng chính

### Navigation Bar
- **Logo**: MT4🔧 với gradient màu vàng cam
- **Menu chính**: Trang chủ, Giới thiệu, Khám phá, Tin tức & Sự kiện, Giáo dục & Cộng đồng, Cửa hàng
- **Dropdown "Tài khoản & Hỗ trợ"**:
  - 👤 Hồ sơ cá nhân
  - 👥 Bạn bè
  - ⚙️ Cài đặt
  - 📖 Hướng dẫn
  - 📞 Liên hệ
  - 🚪 Đăng xuất

### Trang Hồ sơ cá nhân (/profile)
- **ProfileHeader**: Ảnh bìa, avatar, thông tin người dùng
- **ProfileInfo**: Giới thiệu, thống kê (bài viết, followers, following)
- **ProfileTabs**: Tab bài viết, ảnh & video, đã thích

### Trang Bạn bè (/friends)
- **FriendSearch**: Tìm kiếm và lọc bạn bè
- **FriendsList**: Hiển thị danh sách bạn bè dạng grid
- **FriendCard**: Card hiển thị thông tin từng người bạn với avatar, tên, status online

## 🚀 Bắt đầu

```bash
# Cài đặt dependencies
npm install

# Chạy development server (http://localhost:5173)
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 📂 Cấu trúc dự án

```
src/
├── components/
│   ├── common/
│   │   ├── navigation/NavBar/     # Navigation bar
│   │   └── AccountDropdown/       # Account dropdown menu
│   ├── UI/                        # Reusable UI components
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── SearchInput/
│   │   ├── Badge/
│   │   └── Tab/
│   └── layouts/
│       ├── AppLayout.jsx
│       └── MainLayout.jsx
├── pages/
│   ├── profile/                   # Profile page
│   │   ├── components/
│   │   │   ├── ProfileHeader/
│   │   │   ├── ProfileInfo/
│   │   │   └── ProfileTabs/
│   │   ├── index.jsx
│   │   └── Profile.css
│   └── friends/                   # Friends page
│       ├── components/
│       │   ├── FriendCard/
│       │   ├── FriendsList/
│       │   └── FriendSearch/
│       ├── index.jsx
│       └── Friends.css
├── hooks/
│   ├── useAuth.js                # Authentication hook
│   ├── useDebounce.js            # Debounce hook
│   └── index.js
├── routes/
│   └── index.jsx                 # Route definitions
├── constants/
│   ├── menu.js                   # Menu items
│   ├── routes.js                 # Route constants
│   └── index.js
├── configs/
│   ├── api.js                    # API configuration
│   └── index.js
├── utils/
│   ├── validation.js             # Validation utilities
│   ├── format.js                 # Format utilities
│   └── index.js
└── store/
    └── store.js                  # State management
```

## 🎨 Sử dụng Components

### Avatar Component
```jsx
import { Avatar } from '@/components/UI';

<Avatar 
  src="https://example.com/avatar.jpg" 
  alt="User Name"
  size="lg"  // sm, md, lg, xl
/>
```

### Button Component
```jsx
import { Button } from '@/components/UI';

<Button variant="primary" size="md">
  Click Me
</Button>
```

### Card Component
```jsx
import { Card } from '@/components/UI';

<Card className="custom-class">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### SearchInput Component
```jsx
import { SearchInput } from '@/components/UI';

<SearchInput 
  placeholder="Tìm kiếm..." 
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
```

## 🔌 Custom Hooks

### useAuth Hook
```jsx
import { useAuth } from '@/hooks';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication functions
};
```

### useDebounce Hook
```jsx
import { useDebounce } from '@/hooks';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    // API call with debounced value
  }, [debouncedSearch]);
};
```

## 🛣️ Routes

| Path | Description |
|------|-------------|
| `/` | Trang chủ |
| `/about` | Giới thiệu |
| `/discover` | Khám phá |
| `/news` | Tin tức & Sự kiện |
| `/education` | Giáo dục & Cộng đồng |
| `/store` | Cửa hàng |
| `/profile` | Hồ sơ cá nhân |
| `/profile/:userId` | Hồ sơ người dùng khác |
| `/friends` | Danh sách bạn bè |
| `/settings` | Cài đặt |
| `/guide` | Hướng dẫn |
| `/contact` | Liên hệ |

## 🎨 Design System

### Colors
- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Deep Purple)
- **Success**: `#48bb78` (Green)
- **Warning**: `#ed8936` (Orange)
- **Danger**: `#f56565` (Red)
- **Dark**: `#2d3748`
- **Light**: `#f7fafc`

### Spacing
- xs: `0.25rem` (4px)
- sm: `0.5rem` (8px)
- md: `1rem` (16px)
- lg: `1.5rem` (24px)
- xl: `2rem` (32px)

### Typography
- Font family: System fonts
- Base size: `16px`
- Headings: Bold weight

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1024px) { }

/* Large Desktop */
@media (max-width: 1440px) { }
```

## 🔧 Configuration Files

### Vite Config (`vite.config.js`)
- React plugin
- Development server settings

### ESLint Config (`eslint.config.js`)
- Code quality rules
- React best practices

## 📦 Dependencies

### Main
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Linter

## 🌐 API Configuration

File `src/configs/api.js` chứa các endpoint API:

```javascript
import { API_ENDPOINTS, getApiUrl } from '@/configs';

// Get friends list
fetch(getApiUrl(API_ENDPOINTS.FRIENDS_LIST))
```

## 🛠️ Utils

### Validation
```javascript
import { validateEmail, validatePassword } from '@/utils';

const isValid = validateEmail('user@example.com');
```

### Format
```javascript
import { formatDate, formatCurrency, formatRelativeTime } from '@/utils';

formatDate(new Date()); // "09/10/2025"
formatCurrency(100000); // "100.000 ₫"
formatRelativeTime(new Date()); // "Vừa xong"
```

## 📝 Coding Standards

1. **Component Structure**: Mỗi component có folder riêng với file `.jsx`, `.css`, và `index.js`
2. **Naming**: PascalCase cho components, camelCase cho functions/variables
3. **Exports**: Named exports cho utilities, default export cho components
4. **CSS**: Component-scoped CSS với BEM naming
5. **Props**: Always use PropTypes for type checking

## 🚧 TODO

- [ ] Implement real API integration
- [ ] Add user authentication
- [ ] Add form validation
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Add dark mode
- [ ] Add internationalization
- [ ] Add PWA support

## 📄 License

MIT License

---

Made with ❤️ using React + Vite
