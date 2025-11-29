import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    loginStudent: (creds) => api.post('/student/login', creds),
    registerStudent: (data) => api.post('/student/register', data),
    loginAdmin: (creds) => api.post('/admin/login', creds),
};

export const studentService = {
    getAllScholarships: () => api.get('/student/scholarship/all'),
    apply: (data) => api.post('/student/apply', data),
    getMyApplications: (studentId) => api.get(`/student/application/${studentId}`),
    updateProfile: (id, data) => api.put(`/student/update/${id}`, data)
};

export const adminService = {
    addScholarship: (data) => api.post('/admin/scholarship', data),
    getAllScholarships: () => api.get('/admin/scholarship/all'),  // GOOD
deleteScholarship: (id) => api.delete(`/admin/scholarship/delete/${id}`), // GOOD

    getAllApplications: () => api.get('/admin/applications'),
    approveApplication: (id) => api.put(`/admin/application/acc/${id}`),
    rejectApplication: (id) => api.put(`/admin/application/rejected/${id}`),
};

export default api;