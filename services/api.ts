import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://skidmo-core-system.onrender.com/api/test/v1/';

interface RefreshTokenResponse {
    access: string;
}

interface UserData {
    id?: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImage?: string;
    // Add any other user fields your API requires
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        // Try to get token from global or AsyncStorage
        let token = (global as any).access_token;
        
        if (!token) {
            token = await AsyncStorage.getItem('access_token');
            if (token) {
                (global as any).access_token = token;
            }
        }
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call refresh token endpoint
                const response = await ownerAPI.refreshToken(refreshToken);
                const { access } = response;

                // Update tokens
                await AsyncStorage.setItem('access_token', access);
                (global as any).access_token = access;

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log out the user
                await AsyncStorage.removeItem('access_token');
                await AsyncStorage.removeItem('refresh_token');
                (global as any).access_token = null;
                
                // You might want to redirect to login here
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const ownerAPI = {
    // Authentication methods
    login: async (username: string, password: string) => {
        const response = await api.post('users/login/', { username, password });
        return response.data;
    },

    refreshToken: async (refreshToken: string) => {
        const response = await api.post('users/refresh/', { refresh: refreshToken });
        return response.data;
    },
    
    isAuthenticated: async () => {
        const token = await AsyncStorage.getItem('access_token');
        return !!token;
    },
    
    logout: async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        (global as any).access_token = null;
    },
    
    // User management methods
    register: async (userData: {
        username: string;
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    }) => {
        const response = await api.post('users/register/', userData);
        return response.data;
    },
    
    getUserInfo: async (userId?: string) => {
        // If userId is provided, get specific user, otherwise get current user
        const endpoint = userId ? `users/${userId}/` : 'users/me/';
        const response = await api.get(endpoint);
        return response.data;
    },
    
    updateUserInfo: async (userData: Partial<UserData>) => {
        // Update the current user's information
        const response = await api.patch('users/me/', userData);
        return response.data;
    },
    
    deleteUser: async () => {
        // Delete the current user's account
        const response = await api.delete('users/me/');
        
        // Clear tokens after account deletion
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        (global as any).access_token = null;
        
        return response.data;
    },
    
    // Profile image upload
    uploadProfileImage: async (imageUri: string) => {
        // Create form data for image upload
        const formData = new FormData();
        
        // Get filename from URI
        const uriParts = imageUri.split('/');
        const fileName = uriParts[uriParts.length - 1];
        
        // Append image to form data
        formData.append('profileImage', {
            uri: imageUri,
            name: fileName,
            type: 'image/jpeg', // Adjust based on your image type
        } as any);
        
        // Create custom config for multipart/form-data
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Authorization header will be added by interceptor
            },
        };
        
        const response = await api.post('users/profile-image/', formData, config);
        return response.data;
    }
};

export const storeTokens = (accessToken: string, refreshToken: string) => {
    // Store tokens securely
    AsyncStorage.setItem('access_token', accessToken);
    AsyncStorage.setItem('refresh_token', refreshToken);
};