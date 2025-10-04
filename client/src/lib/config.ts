export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-python-backend/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    googleLogin: `${API_BASE_URL}/auth/google`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    updateProfile: `${API_BASE_URL}/user/profile`,
    updatePassword: `${API_BASE_URL}/user/password`,
    uploadPhoto: `${API_BASE_URL}/user/photo`,
  },
  saves: {
    list: `${API_BASE_URL}/saves`,
    create: `${API_BASE_URL}/saves`,
    delete: (id: string) => `${API_BASE_URL}/saves/${id}`,
  },
  images: {
    list: `${API_BASE_URL}/images`,
    detail: (id: string) => `${API_BASE_URL}/images/${id}`,
  },
};
