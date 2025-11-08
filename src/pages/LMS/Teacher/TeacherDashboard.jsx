import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { lmsData } from '../../../data/lmsData';

const TeacherDashboard = () => {
  const [searchParams] = useSearchParams();
  const teacherId = parseInt(searchParams.get('teacherId')) || 1;

  const teacher = lmsData.users.find(u => u.id === teacherId && u.role === 'teacher');
  const teacherCourses = lmsData.courses.filter(c => c.teacherId === teacherId);
  const totalStudents = teacherCourses.reduce((sum, course) => sum + course.students.length, 0);
  const totalAssignments = lmsData.assignments.filter(a =>
    teacherCourses.some(c => c.id === a.courseId)
  ).length;

  // Calculate recent activity
  const recentSubmissions = lmsData.submissions
    .filter(s => {
      const assignment = lmsData.assignments.find(a => a.id === s.assignmentId);
      return assignment && teacherCourses.some(c => c.id === assignment.courseId);
    })
    .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
    .slice(0, 5);

  const pendingGrading = recentSubmissions.filter(s => s.status === 'submitted').length;

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy giáo viên</h1>
          <p className="text-gray-600 mt-2">Vui lòng kiểm tra lại thông tin đăng nhập</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/giaoduc"
                className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <span>←</span>
                <span>Quay lại Giáo dục</span>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {teacher.name.split(' ').pop().charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Chào mừng, {teacher.name}
                </h1>
                <p className="text-gray-600">Giáo viên {teacher.subject}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                ➕ Tạo bài tập mới
              </button>
              <Link
                to="/lms/teacher/profile"
                className="text-gray-500 hover:text-gray-700"
              >
                ⚙️ Cài đặt
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng học sinh</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Khóa học</p>
                <p className="text-2xl font-bold text-gray-900">{teacherCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bài tập</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chờ chấm điểm</p>
                <p className="text-2xl font-bold text-gray-900">{pendingGrading}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Khóa học của tôi</h2>
                  <Link
                    to="/lms/teacher/courses/new"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    + Tạo khóa học mới
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {teacherCourses.map(course => {
                  const assignments = lmsData.assignments.filter(a => a.courseId === course.id);
                  const activeAssignments = assignments.filter(a => a.status === 'active').length;

                  return (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>👥 {course.students.length} học sinh</span>
                            <span>📝 {assignments.length} bài tập</span>
                            <span>🟢 {activeAssignments} đang hoạt động</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/lms/teacher/courses/${course.id}?teacherId=${teacherId}`}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                          >
                            Xem chi tiết
                          </Link>
                          <Link
                            to={`/lms/teacher/assignments/new?courseId=${course.id}&teacherId=${teacherId}`}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                          >
                            + Bài tập
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thao tác nhanh</h3>
              <div className="space-y-3">
                <Link
                  to={`/lms/teacher/assignments/new?type=ai-image&teacherId=${teacherId}`}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors"
                >
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-medium text-gray-900">Bài tập AI Image</p>
                    <p className="text-xs text-gray-600">Tạo ảnh bằng AI</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/assignments/new?type=text&teacherId=${teacherId}`}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors"
                >
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-medium text-gray-900">Bài tập Viết</p>
                    <p className="text-xs text-gray-600">Luận văn, essay</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/assignments/new?type=ai-video&teacherId=${teacherId}`}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors"
                >
                  <span className="text-2xl">🎥</span>
                  <div>
                    <p className="font-medium text-gray-900">Bài tập AI Video</p>
                    <p className="text-xs text-gray-600">Tạo video bằng AI</p>
                  </div>
                </Link>

                <Link
                  to={`/lms/teacher/courses/new?teacherId=${teacherId}`}
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-colors"
                >
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="font-medium text-gray-900">Tạo Khóa học</p>
                    <p className="text-xs text-gray-600">Khóa học mới</p>
                  </div>
                </Link>

                <Link
                  to="/lms/teacher/quiz/new"
                  className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg hover:from-orange-100 hover:to-yellow-100 transition-colors"
                >
                  <span className="text-2xl">❓</span>
                  <div>
                    <p className="font-medium text-gray-900">Tạo Quiz</p>
                    <p className="text-xs text-gray-600">Kiểm tra nhanh</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bài tập của tôi</h3>
              <div className="space-y-3">
                {lmsData.assignments
                  .filter(assignment => {
                    const course = lmsData.courses.find(c => c.id === assignment.courseId);
                    return course && course.teacherId === teacherId;
                  })
                  .slice(0, 5)
                  .map(assignment => {
                    const course = lmsData.courses.find(c => c.id === assignment.courseId);
                    const submissions = lmsData.submissions.filter(s => s.assignmentId === assignment.id);
                    const pendingSubmissions = submissions.filter(s => s.status === 'submitted' && s.grade === null).length;

                    return (
                      <div key={assignment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {assignment.type === 'ai-image' ? '🎨' :
                              assignment.type === 'ai-video' ? '🎬' : '📝'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {assignment.title}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {course?.title} • Hạn: {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Nộp bài</p>
                            <p className="text-sm font-medium">{submissions.length}</p>
                          </div>
                          {pendingSubmissions > 0 && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          )}
                          <Link
                            to={`/lms/teacher/assignments/${assignment.id}?teacherId=${teacherId}`}
                            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors font-medium"
                          >
                            Quản lý
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bài nộp gần đây</h3>
              <div className="space-y-3">
                {recentSubmissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Chưa có bài nộp nào</p>
                ) : (
                  recentSubmissions.map(submission => {
                    const student = lmsData.users.find(u => u.id === submission.studentId);
                    const assignment = lmsData.assignments.find(a => a.id === submission.assignmentId);

                    return (
                      <div key={submission.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {student?.name.split(' ').pop().charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {student?.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {assignment?.title}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === 'submitted' && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          )}
                          {submission.status === 'graded' && (
                            <span className="text-xs text-green-600 font-medium">
                              {submission.grade}/100
                            </span>
                          )}
                          <Link
                            to={`/lms/teacher/assignments/${assignment?.id}?teacherId=${teacherId}`}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {pendingGrading > 0 && (
                <Link
                  to="/lms/teacher/grading"
                  className="block w-full mt-4 py-2 text-center bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                >
                  Chấm {pendingGrading} bài đang chờ
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;