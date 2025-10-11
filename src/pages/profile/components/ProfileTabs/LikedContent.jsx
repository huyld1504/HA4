import React from 'react';
import './LikedContent.css';

const LikedContent = () => {
  const likedPosts = [
    {
      id: 1,
      author: {
        name: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=12',
        username: '@nguyen_a'
      },
      content: 'Chia sẻ những tips hữu ích về React Hooks! 🎯',
      image: 'https://picsum.photos/500/300?random=10',
      likes: 567,
      comments: 89,
      timestamp: '3 giờ trước'
    },
    {
      id: 2,
      author: {
        name: 'Trần Thị B',
        avatar: 'https://i.pravatar.cc/150?img=5',
        username: '@tran_b'
      },
      content: 'Workshop về UI/UX Design rất bổ ích. Cảm ơn các bạn đã tham gia! 🎨✨',
      image: null,
      likes: 423,
      comments: 56,
      timestamp: '5 giờ trước'
    },
    {
      id: 3,
      author: {
        name: 'Lê Văn C',
        avatar: 'https://i.pravatar.cc/150?img=8',
        username: '@le_c'
      },
      content: 'Đã release version mới của thư viện! Check it out 🚀',
      image: 'https://picsum.photos/500/300?random=11',
      likes: 789,
      comments: 134,
      timestamp: '1 ngày trước'
    },
    {
      id: 4,
      author: {
        name: 'Phạm Thị D',
        avatar: 'https://i.pravatar.cc/150?img=9',
        username: '@pham_d'
      },
      content: 'Những sai lầm thường gặp khi làm việc với State trong React 💡',
      image: 'https://picsum.photos/500/300?random=12',
      likes: 645,
      comments: 92,
      timestamp: '2 ngày trước'
    },
    {
      id: 5,
      author: {
        name: 'Hoàng Văn E',
        avatar: 'https://i.pravatar.cc/150?img=13',
        username: '@hoang_e'
      },
      content: 'Tutorial về Vite và cách tối ưu performance! Đừng bỏ lỡ 🔥',
      image: null,
      likes: 512,
      comments: 67,
      timestamp: '3 ngày trước'
    }
  ];

  return (
    <div className="liked-content">
      <div className="liked-header">
        <h3>❤️ Các bài viết đã thích</h3>
        <span className="liked-count">{likedPosts.length} bài viết</span>
      </div>

      <div className="liked-posts">
        {likedPosts.map(post => (
          <div key={post.id} className="liked-post-item">
            <div className="liked-post-header">
              <div className="liked-post-author">
                <img src={post.author.avatar} alt={post.author.name} className="liked-author-avatar" />
                <div className="liked-author-info">
                  <h4 className="liked-author-name">{post.author.name}</h4>
                  <span className="liked-author-username">{post.author.username}</span>
                </div>
              </div>
              <div className="liked-timestamp">
                <span>{post.timestamp}</span>
                <span className="liked-icon">❤️</span>
              </div>
            </div>

            <div className="liked-post-content">
              <p>{post.content}</p>
              {post.image && (
                <div className="liked-post-image">
                  <img src={post.image} alt="Post" />
                </div>
              )}
            </div>

            <div className="liked-post-stats">
              <span className="liked-stat">
                <span className="stat-icon">❤️</span>
                {post.likes}
              </span>
              <span className="liked-stat">
                <span className="stat-icon">💬</span>
                {post.comments}
              </span>
            </div>

            <div className="liked-post-actions">
              <button className="liked-action-btn liked">
                <span>❤️</span> Đã thích
              </button>
              <button className="liked-action-btn">
                <span>💬</span> Bình luận
              </button>
              <button className="liked-action-btn">
                <span>🔄</span> Chia sẻ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedContent;
