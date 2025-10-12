import React, { useState } from 'react'
import SectionHeading from '../components/common/SectionHeading'
import ToggleSwitch from '../components/common/ToggleSwitch'
import {
  settingsTabs,
  defaultFormData,
  accountSecuritySettings,
  notificationSettings,
  appearanceSettings,
  privacySettings,
  privacyOptions,
  fontSizeOptions,
  themeOptions,
  languageOptions,
  timezoneOptions,
  dateFormatOptions
} from '../data/settingsData'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState(defaultFormData)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Settings updated:', formData)
    alert('Cập nhật cài đặt thành công!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SectionHeading
          label="Quản lý tài khoản"
          title="Cài đặt"
          description="Quản lý thông tin cá nhân, bảo mật và tùy chỉnh trải nghiệm của bạn"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left transition-all ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#3b2412] to-[#4a2d18] text-white shadow-md'
                      : 'text-brand-brown-600 hover:bg-[#f6eadf]'
                      }`}
                  >
                    <span className="mr-3 text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit}>
                {/* Account & Security Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Tài khoản & Bảo mật
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="Nhập mật khẩu hiện tại"
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Nhập mật khẩu mới"
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Nhập lại mật khẩu mới"
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>

                      <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                        <p className="text-sm text-brand-brown-700">
                          <strong>Lưu ý:</strong> Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
                        </p>
                      </div>
                    </div>

                    {/* Security Options */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-brand-brown-900 mb-4">
                        Tùy chọn bảo mật
                      </h3>
                      <div className="space-y-4">
                        {accountSecuritySettings.map((setting, index) => (
                          <div
                            key={setting.id}
                            className={`${index < accountSecuritySettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                          >
                            <ToggleSwitch
                              id={setting.id}
                              name={setting.id}
                              checked={formData[setting.id]}
                              onChange={handleInputChange}
                              label={setting.title}
                              description={setting.description}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Cài đặt thông báo
                    </h2>

                    <div className="space-y-4">
                      {notificationSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < notificationSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Giao diện
                    </h2>

                    {/* Appearance Toggles */}
                    <div className="space-y-4">
                      {appearanceSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < appearanceSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Font Size */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Kích thước chữ
                      </label>
                      <select
                        name="fontSize"
                        value={formData.fontSize}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {fontSizeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Chủ đề màu sắc
                      </label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {themeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>💡 Mẹo:</strong> Thay đổi giao diện để có trải nghiệm phù hợp với sở thích của bạn.
                      </p>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Quyền riêng tư
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Ai có thể xem hồ sơ của bạn?
                        </label>
                        <select
                          name="profileVisibility"
                          value={formData.profileVisibility}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        >
                          {privacyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {privacySettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < privacySettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Language & Region Settings */}
                {activeTab === 'language' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Ngôn ngữ & Khu vực
                    </h2>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Ngôn ngữ hiển thị
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {languageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-sm text-brand-brown-600">
                        Chọn ngôn ngữ hiển thị trên toàn bộ website
                      </p>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Múi giờ
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {timezoneOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-sm text-brand-brown-600">
                        Hiển thị thời gian sự kiện theo múi giờ của bạn
                      </p>
                    </div>

                    {/* Date Format */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Định dạng ngày tháng
                      </label>
                      <select
                        name="dateFormat"
                        value={formData.dateFormat}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {dateFormatOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-sm text-brand-brown-600">
                        Cách hiển thị ngày tháng trên toàn bộ website
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>🌍 Lưu ý:</strong> Thay đổi này sẽ được áp dụng ngay lập tức sau khi lưu.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="rounded-full border-2 border-brand-brown-300 px-6 py-3 font-semibold text-brand-brown-700 transition hover:bg-brand-brown-50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-[#3b2412] to-[#4a2d18] px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
