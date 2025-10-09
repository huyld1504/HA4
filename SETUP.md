# 🚀 Quick Setup Guide

## Cài đặt nhanh

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở browser tại http://localhost:5173
```

## ✅ Kiểm tra

Sau khi chạy `npm run dev`, bạn nên thấy:

1. **Navbar** ở trên cùng với:
   - Logo "MT4🔧"
   - Menu: Trang chủ, Giới thiệu, Khám phá, v.v.
   - Button "Tài khoản & Hỗ trợ" bên phải

2. **Click vào "Tài khoản & Hỗ trợ"** để xem dropdown menu:
   - 👤 Hồ sơ cá nhân
   - 👥 Bạn bè
   - ⚙️ Cài đặt
   - 📖 Hướng dẫn
   - 📞 Liên hệ
   - 🚪 Đăng xuất

3. **Test các trang**:
   - Click "Hồ sơ cá nhân" → Xem trang profile
   - Click "Bạn bè" → Xem danh sách bạn bè

## 📁 Files đã tạo

### Constants
- ✅ `src/constants/menu.js` - Menu items
- ✅ `src/constants/routes.js` - Route paths
- ✅ `src/constants/index.js` - Exports

### Components - Navbar
- ✅ `src/components/common/navigation/NavBar/NavBar.jsx`
- ✅ `src/components/common/navigation/NavBar/Navbar.css`
- ✅ `src/components/common/AccountDropdown/AccountDropdown.jsx`
- ✅ `src/components/common/AccountDropdown/AccountDropdown.css`

### Pages - Profile
- ✅ `src/pages/profile/index.jsx`
- ✅ `src/pages/profile/Profile.css`
- ✅ `src/pages/profile/components/ProfileHeader/` (folder)
- ✅ `src/pages/profile/components/ProfileInfo/` (folder)
- ✅ `src/pages/profile/components/ProfileTabs/` (folder)

### Pages - Friends
- ✅ `src/pages/friends/index.jsx`
- ✅ `src/pages/friends/Friends.css`
- ✅ `src/pages/friends/components/FriendCard/` (folder)
- ✅ `src/pages/friends/components/FriendsList/` (folder)
- ✅ `src/pages/friends/components/FriendSearch/` (folder)

### Hooks
- ✅ `src/hooks/useAuth.js` - Authentication
- ✅ `src/hooks/useDebounce.js` - Debounce search

### Utils
- ✅ `src/utils/validation.js` - Form validation
- ✅ `src/utils/format.js` - Format utilities

### Config
- ✅ `src/configs/api.js` - API endpoints

### Routes
- ✅ Updated `src/routes/index.jsx` with all routes

## 🎨 Cấu trúc Component

Mỗi component được tổ chức theo pattern:

```
ComponentName/
  ├── ComponentName.jsx   # Component logic
  ├── ComponentName.css   # Component styles
  └── index.js           # Export default
```

## 📝 Sửa đổi tiếp theo

### Thay đổi menu items
File: `src/constants/menu.js`
```javascript
export const MENU_ITEMS = [
  // Thêm hoặc sửa menu items tại đây
];
```

### Thay đổi account menu
File: `src/constants/menu.js`
```javascript
export const ACCOUNT_MENU_ITEMS = [
  // Thêm hoặc sửa account menu items tại đây
];
```

### Thêm routes mới
File: `src/routes/index.jsx`
```javascript
{
  path: '/new-page',
  element: <NewPage />
}
```

### Tùy chỉnh màu sắc
Sửa file CSS của navbar:
- `src/components/common/navigation/NavBar/Navbar.css`
- `src/components/common/AccountDropdown/AccountDropdown.css`

## 🔧 Customize

### Logo
Thay đổi logo trong: `src/components/common/navigation/NavBar/NavBar.jsx`
```jsx
<span className="logo-text">YOUR LOGO</span>
```

### User Data
Mock data hiện tại trong components. Để dùng real data:
1. Implement API calls trong `src/configs/api.js`
2. Fetch data trong components
3. Update state với data từ API

### Styling
- Global styles: `src/index.css`
- Component styles: Trong folder mỗi component
- Navbar: `Navbar.css`
- Profile: `Profile.css`, `ProfileHeader.css`, etc.
- Friends: `Friends.css`, `FriendCard.css`, etc.

## 🐛 Troubleshooting

### Lỗi import
Nếu gặp lỗi import, check:
- ✅ File path đúng
- ✅ Export/import syntax đúng
- ✅ File extension (.jsx, .js)

### Navbar không hiện
Check:
- ✅ `MainLayout.jsx` có import NavBar
- ✅ Routes setup đúng
- ✅ CSS được load

### Routes không hoạt động
Check:
- ✅ `react-router-dom` đã cài đặt
- ✅ `src/routes/index.jsx` có routes
- ✅ `App.jsx` sử dụng RouterProvider

## 📚 Tài liệu

- **Full Documentation**: `DOCUMENTATION.md`
- **Project Guide**: `PROJECT_GUIDE.md`
- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Vite**: https://vitejs.dev

## 💡 Tips

1. **Hot Reload**: Vite tự động reload khi bạn save file
2. **CSS Modules**: Có thể dùng CSS modules nếu muốn
3. **PropTypes**: Đã setup sẵn, nên dùng để type checking
4. **Console**: Mở DevTools để xem errors

## 🎯 Next Steps

1. ✅ Chạy `npm run dev` và test
2. 📝 Đọc `PROJECT_GUIDE.md` để hiểu cấu trúc
3. 🎨 Customize theo ý bạn
4. 🔌 Implement real API
5. 🧪 Thêm tests
6. 🚀 Deploy lên server

---

**Happy Coding! 🎉**
