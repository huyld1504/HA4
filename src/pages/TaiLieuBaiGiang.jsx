import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { periodsData, categories, sortOptions } from '../data/educationData';

const TaiLieuBaiGiang = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [expandedPeriods, setExpandedPeriods] = useState(new Set(['Thời kỳ Tiền sử'])); // Mở mặc định thời kỳ đầu tiên
  const navigate = useNavigate();

  const togglePeriodExpansion = (periodName) => {
    setExpandedPeriods(prev => {
      const newSet = new Set(prev);
      if (newSet.has(periodName)) {
        newSet.delete(periodName);
      } else {
        newSet.add(periodName);
      }
      return newSet;
    });
  };

  const getAllDocuments = () => {
    return periodsData.reduce((acc, period) => {
      return [...acc, ...period.documents.map(doc => ({ ...doc, period: period.name }))];
    }, []);
  };

  const filteredDocuments = getAllDocuments().filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'lectures' && doc.type === 'Bài giảng') ||
      (selectedCategory === 'documents' && doc.type === 'Tài liệu') ||
      (selectedCategory === doc.category?.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || doc.level === selectedLevel;
    const matchesPeriod = selectedPeriod === 'all' || doc.period === selectedPeriod;

    return matchesSearch && matchesCategory && matchesLevel && matchesPeriod;
  });

  const handleDocumentClick = (doc) => {
    if (doc.type === 'Bài giảng') {
      navigate(`/tai-lieu-bai-giang/bai-giang/${doc.id}`);
    } else {
      navigate(`/tai-lieu-bai-giang/tai-lieu/${doc.id}`);
    }
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-serif font-bold text-stone-800">Danh mục</h2>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all ${selectedCategory === category.id
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Historical Periods */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-serif font-bold text-stone-800">Thời kỳ lịch sử</h2>
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedPeriod('all');
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all ${selectedPeriod === 'all'
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🏛️</span>
                      <span className="font-medium">Tất cả thời kỳ</span>
                    </div>
                  </button>
                  {periodsData.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => {
                        setSelectedPeriod(period.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all ${selectedPeriod === period.name
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">⏳</span>
                          <div>
                            <span className="font-medium block">{period.name}</span>
                            <span className="text-xs opacity-75">{period.period}</span>
                          </div>
                        </div>
                        <span className="text-xs bg-stone-200 text-stone-700 rounded-full px-2 py-1">
                          {period.documents.length}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-serif font-bold text-stone-800">Thống kê</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Tổng tài liệu:</span>
                    <span className="font-bold text-amber-600">{getAllDocuments().length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Bài giảng:</span>
                    <span className="font-bold text-blue-600">
                      {getAllDocuments().filter(doc => doc.type === 'Bài giảng').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Tài liệu:</span>
                    <span className="font-bold text-green-600">
                      {getAllDocuments().filter(doc => doc.type === 'Tài liệu').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Kết quả hiển thị:</span>
                    <span className="font-bold text-stone-800">{filteredDocuments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <div className="text-center mb-6">
                <h1 className="mb-4 text-4xl font-serif font-bold text-stone-800 sm:text-5xl">
                  Tài liệu & Bài giảng
                </h1>
                <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                  Khám phá kho tàng tri thức phong phú về lịch sử và văn hóa Việt Nam qua các tài liệu,
                  bài giảng được tuyển chọn kỹ lưỡng từ các chuyên gia hàng đầu.
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu, bài giảng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-amber-300 bg-white py-3 pl-12 pr-4 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  {/* Level Filter */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="rounded-lg border border-amber-300 bg-white px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="all">Tất cả cấp độ</option>
                    <option value="Cơ bản">Cơ bản</option>
                    <option value="Trung cấp">Trung cấp</option>
                    <option value="Cao cấp">Cao cấp</option>
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-amber-300 bg-white px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-stone-600">Hiển thị:</span>
                  <div className="flex rounded-lg border border-amber-300 p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-stone-600 hover:bg-amber-50'}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-stone-600 hover:bg-amber-50'}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-sm text-stone-600">
                  Tìm thấy <span className="font-semibold text-amber-800">{filteredDocuments.length}</span> kết quả
                  {searchTerm && (
                    <span> cho "<span className="font-medium">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>
            </div>

            {/* Content Sections by Period - Dropdown Style */}
            <div className="space-y-4">
              {periodsData.map((period) => {
                const periodDocuments = paginatedDocuments.filter(doc => doc.period === period.name);

                if (periodDocuments.length === 0 && selectedPeriod !== 'all' && selectedPeriod !== period.name) {
                  return null;
                }

                const isExpanded = expandedPeriods.has(period.name);
                const documentsToShow = selectedPeriod === period.name || selectedPeriod === 'all' ? periodDocuments : [];

                return (
                  <div key={period.id} className="rounded-2xl border border-amber-200 bg-white shadow-lg overflow-hidden">
                    {/* Period Header - Clickable Dropdown */}
                    <button
                      onClick={() => togglePeriodExpansion(period.name)}
                      className="w-full p-6 text-left transition-all hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`rounded-full bg-gradient-to-r ${period.color} p-3 flex-shrink-0`}>
                            <span className="text-white font-bold text-lg">
                              {period.name.split(' ')[0].slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-serif font-bold text-stone-800 mb-1">{period.name}</h2>
                            <p className="text-stone-600 text-sm font-medium mb-1">{period.period}</p>
                            <p className="text-stone-500 text-sm line-clamp-2">{period.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <div className="text-right">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${documentsToShow.length > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                              {documentsToShow.length} kết quả
                            </span>
                            {documentsToShow.length > 0 && (
                              <p className="text-xs text-stone-500 mt-1">
                                {documentsToShow.filter(doc => doc.type === 'Bài giảng').length} bài giảng • {' '}
                                {documentsToShow.filter(doc => doc.type === 'Tài liệu').length} tài liệu
                              </p>
                            )}
                          </div>
                          <svg
                            className={`h-5 w-5 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expandable Content */}
                    {isExpanded && documentsToShow.length > 0 && (
                      <div className="border-t border-amber-200 p-6">
                        {/* Documents Grid/List */}
                        <div className={viewMode === 'grid'
                          ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
                          : "space-y-4"
                        }>
                          {documentsToShow.map((doc) => (
                            <div
                              key={doc.id}
                              onClick={() => handleDocumentClick(doc)}
                              className={`group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition-all hover:shadow-xl hover:scale-105 ${viewMode === 'list' ? 'flex p-4' : 'flex flex-col h-full'
                                }`}
                            >
                              {viewMode === 'grid' ? (
                                // Grid View
                                <>
                                  <div className="relative">
                                    <img
                                      src={doc.thumbnail}
                                      alt={doc.title}
                                      className="h-48 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    <div className="absolute top-3 right-3">
                                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white ${doc.type === 'Bài giảng' ? 'bg-blue-500/80' : 'bg-green-500/80'
                                        }`}>
                                        {doc.type}
                                      </span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                      <div className="flex items-center justify-between text-white text-sm">
                                        <span>⭐ {doc.rating}</span>
                                        <span>👁 {doc.views}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-2 flex items-center justify-between">
                                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                        {doc.level}
                                      </span>
                                      <span className="text-xs text-stone-500">
                                        {doc.type === 'Bài giảng' ? `⏱ ${doc.duration}` : `📄 ${doc.pages} trang`}
                                      </span>
                                    </div>

                                    <h3 className="mb-2 font-serif text-lg font-bold text-stone-800 group-hover:text-amber-700 line-clamp-2 min-h-[3.5rem]">
                                      {doc.title}
                                    </h3>

                                    <p className="mb-3 text-sm text-stone-600 line-clamp-3 min-h-[4.5rem] flex-1">
                                      {doc.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                                      <span className="truncate max-w-[60%]">Bởi {doc.author}</span>
                                      <span>📥 {doc.downloadCount}</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-auto">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Handle view action
                                        }}
                                        className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600 transition-colors"
                                      >
                                        Xem ngay
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Handle download action
                                        }}
                                        className="flex-1 rounded-lg bg-green-500 px-3 py-2 text-xs font-medium text-white hover:bg-green-600 transition-colors"
                                      >
                                        Tải về
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                // List View
                                <>
                                  <div className="flex-shrink-0">
                                    <img
                                      src={doc.thumbnail}
                                      alt={doc.title}
                                      className="h-24 w-32 rounded-lg object-cover"
                                    />
                                  </div>
                                  <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="mb-2 flex items-center space-x-2">
                                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${doc.type === 'Bài giảng' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {doc.type}
                                          </span>
                                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                            {doc.level}
                                          </span>
                                        </div>

                                        <h3 className="font-serif text-lg font-bold text-stone-800 group-hover:text-amber-700 line-clamp-1 mb-1">
                                          {doc.title}
                                        </h3>

                                        <p className="text-sm text-stone-600 line-clamp-2 mb-2">
                                          {doc.description}
                                        </p>

                                        <div className="flex items-center space-x-4 text-xs text-stone-500">
                                          <span>Bởi {doc.author}</span>
                                          <span>⭐ {doc.rating}</span>
                                          <span>👁 {doc.views}</span>
                                          <span>📥 {doc.downloadCount}</span>
                                          <span>{doc.type === 'Bài giảng' ? `⏱ ${doc.duration}` : `📄 ${doc.pages} trang`}</span>
                                        </div>
                                      </div>

                                      <div className="ml-4 flex gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle view action
                                          }}
                                          className="rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white hover:bg-blue-600 transition-colors"
                                        >
                                          Xem ngay
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle download action
                                          }}
                                          className="rounded-lg bg-green-500 px-3 py-2 text-xs font-medium text-white hover:bg-green-600 transition-colors"
                                        >
                                          Tải về
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {isExpanded && documentsToShow.length === 0 && (
                      <div className="border-t border-amber-200 p-12">
                        <div className="text-center">
                          <svg className="mx-auto h-16 w-16 text-stone-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-lg font-medium text-stone-600 mb-2">Chưa có tài liệu</h3>
                          <p className="text-stone-500">Thời kỳ này chưa có tài liệu hoặc bài giảng phù hợp với bộ lọc hiện tại.</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${currentPage === i + 1
                          ? 'bg-amber-500 text-white'
                          : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaiLieuBaiGiang;