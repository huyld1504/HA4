import React, { useState } from 'react'
import SectionHeading from '../components/common/SectionHeading'
import { settingsTabs, defaultFormData, notificationSettings, privacySettings, privacyOptions } from '../data/settingsData'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
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
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Thông tin cá nhân
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Giới thiệu bản thân
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      />
                    </div>
                  </div>
                )}

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
                          className={`flex items-center justify-between py-3 ${index < notificationSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <div>
                            <h3 className="font-medium text-brand-brown-900">{setting.title}</h3>
                            <p className="text-sm text-brand-brown-600">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={setting.id}
                              checked={formData[setting.id]}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-brown-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-brown-600"></div>
                          </label>
                        </div>
                      ))}
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
                          className={`flex items-center justify-between py-3 ${index < privacySettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <div>
                            <h3 className="font-medium text-brand-brown-900">{setting.title}</h3>
                            <p className="text-sm text-brand-brown-600">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name={setting.id}
                              checked={formData[setting.id]}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-brown-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-brown-600"></div>
                          </label>
                        </div>
                      ))}
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
