export default function PostCard({ post, onLike, onDislike, onEdit, onDelete, onViewProfile, onViewDetail }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="p-6 border-b border-amber-100">
        <div className="flex items-start justify-between gap-4">
          {/* Author Info */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onViewProfile(post.author)}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {post.author.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 hover:text-amber-600 transition-colors">
                {post.author.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>{post.author.role}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </p>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-300"
              title="Chỉnh sửa"
            >
              <i className="fa-solid fa-edit" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
              title="Xóa"
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            <i className="fa-solid fa-tag" />
            {post.category}
          </span>
        </div>
      </div>

      {/* Content - Clickable to view detail */}
      <div 
        className="p-6 cursor-pointer hover:bg-amber-50/30 transition-colors duration-300"
        onClick={() => onViewDetail(post)}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-amber-100 hover:text-amber-700 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more indicator */}
        <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mt-3">
          <span>Xem chi tiết</span>
          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Footer - Interactions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-amber-100 flex items-center justify-between gap-4 flex-wrap">
        {/* Like/Dislike */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike(post.id)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-105 group/like"
          >
            <i className="fa-solid fa-thumbs-up group-hover/like:animate-bounce" />
            <span className="font-semibold">{post.likes}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDislike(post.id)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105 group/dislike"
          >
            <i className="fa-solid fa-thumbs-down group-hover/dislike:animate-bounce" />
            <span className="font-semibold">{post.dislikes}</span>
          </button>
        </div>

        {/* Comment Count - Click to view detail */}
        <button
          onClick={() => onViewDetail(post)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105 group/comment"
        >
          <i className="fa-solid fa-comment group-hover/comment:animate-bounce" />
          <span className="font-semibold">{post.comments.length} Bình luận</span>
        </button>

        {/* Share */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 group/share"
        >
          <i className="fa-solid fa-share group-hover/share:animate-bounce" />
          <span className="font-semibold">Chia sẻ</span>
        </button>
      </div>
    </article>
  )
}
