/**
 * API Configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',

  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',

  // Friends
  FRIENDS_LIST: '/friends',
  FRIEND_REQUESTS: '/friends/requests',
  SEND_FRIEND_REQUEST: '/friends/request',
  ACCEPT_FRIEND_REQUEST: '/friends/accept',
  REJECT_FRIEND_REQUEST: '/friends/reject',
  UNFRIEND: '/friends/unfriend',

  // Posts
  POSTS: '/posts',
  CREATE_POST: '/posts/create',
  UPDATE_POST: '/posts/update',
  DELETE_POST: '/posts/delete',
  LIKE_POST: '/posts/like',
  COMMENT_POST: '/posts/comment'
};

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getApiUrl
};
