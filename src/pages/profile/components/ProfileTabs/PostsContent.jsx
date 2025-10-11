import React from 'react';
import './PostsContent.css';

const PostsContent = () => {
  const posts = [
    {
      id: 1,
      content: 'Vừa hoàn thành dự án mới! Cảm ơn team đã hỗ trợ nhiệt tình 🎉',
      image: 'https://picsum.photos/600/400?random=1',
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: '2 giờ trước'
    },
    {
      id: 2,
      content: 'Chia sẻ một số kinh nghiệm về React và Vite mà mình đã học được trong thời gian qua...',
      image: null,
      likes: 156,
      comments: 28,
      shares: 8,
      timestamp: '5 giờ trước'
    },
    {
      id: 3,
      content: 'Workshop về UI/UX Design hôm nay thật tuyệt vời! 🎨✨',
      image: 'https://picsum.photos/600/400?random=2',
      likes: 189,
      comments: 32,
      shares: 15,
      timestamp: '1 ngày trước'
    },
    {
      id: 4,
      content: 'Coding session với team. Đang làm việc trên feature mới rất thú vị! 💻',
      image: 'https://picsum.photos/600/400?random=3',
      likes: 267,
      comments: 56,
      shares: 20,
      timestamp: '2 ngày trước'
    }
  ];

  return (
    <div className="posts-content">
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <div className="post-header">
            <div className="post-author">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.SGIaA7xMaaCZ7o1PO2mSiwHaHZ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Avatar"
                className="post-avatar"
              />
              <div className="post-author-info">
                <h4 className="post-author-name">Stephen Curry</h4>
                <span className="post-timestamp">{post.timestamp}</span>
              </div>
            </div>
            <button className="post-menu-btn">⋯</button>
          </div>

          <div className="post-content">
            <p>{post.content}</p>
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt="Post" />
              </div>
            )}
          </div>

          <div className="post-stats">
            <span className="stat-item">
              <span className="stat-icon">❤️</span>
              {post.likes}
            </span>
            <span className="stat-item">
              <span className="stat-icon">💬</span>
              {post.comments}
            </span>
            <span className="stat-item">
              <span className="stat-icon">🔄</span>
              {post.shares}
            </span>
          </div>

          <div className="post-actions">
            <button className="action-btn">
              <span>❤️</span> Thích
            </button>
            <button className="action-btn">
              <span>💬</span> Bình luận
            </button>
            <button className="action-btn">
              <span>🔄</span> Chia sẻ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsContent;
