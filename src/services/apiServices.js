import api from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all brands
export const getAllBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all paw parents
export const getAllPawParents = async () => {
  try {
    const response = await api.get('/paw-parents');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all shelters
export const getAllShelters = async () => {
  try {
    const response = await api.get('/shelters');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all volunteers
export const getAllVolunteers = async () => {
  try {
    const response = await api.get('/volunteers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get admin volunteers for tasks
export const getAdminVolunteers = async () => {
  try {
    const response = await api.get('/tasks/admin/volunteers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get pending users (Volunteer/Brand requests)
export const getPendingUsers = async () => {
  try {
    const response = await api.get('/admin/users/pending');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Approve user
export const approveUser = async (userId) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
export const getAllTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Approve adoption request
export const approveAdoptionRequest = async (requestId) => {
  try {
    const response = await api.patch(`/admin/adoption-requests/${requestId}/approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get sponsors
export const getSponsors = async () => {
  try {
    const response = await api.get('/sponsors');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get lost & found (admin)
export const getLostAndFoundAdmin = async () => {
  try {
    const response = await api.get('/lost-found/admin');
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get all reports (Stray Dogs)
export const getAllReports = async () => {
  try {
    const response = await api.get('/reports/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all adoption requests
export const getAdoptionRequests = async () => {
  try {
    const response = await api.get('/admin/adoption-requests');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send notification to a role
export const sendNotificationToRole = async (targetRole, title, message) => {
  try {
    const response = await api.post('/notifications', {
      title,
      message,
      targetRole,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
