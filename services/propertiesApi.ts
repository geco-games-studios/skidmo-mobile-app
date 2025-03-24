import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'https://skidmo-core-system.onrender.com/api/test/v1/';

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

// Response interceptor to handle token refresh
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
                    console.log('No refresh token available, redirecting to login');
                    return Promise.reject(new Error('Authentication required'));
                }

                // Rest of your refresh token logic...
            } catch (refreshError) {
                // Handle refresh token error
            }
        }

        return Promise.reject(error);
    }
);

export const propertiesAPI = {
    // List all properties
    listProperties: async () => {
        try {
            const response = await api.get('listings/');
            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Create a new property listing
    createProperty: async (propertyData: {
        title: string;
        description: string;
        price: number;
        location: string;
        // Add any other fields your API requires
    }) => {
        try {
            const response = await api.post('listings/create/', propertyData);
            return response.data;
        } catch (error) {
            console.error('Error creating property:', error);
            throw error;
        }
    },

    // Retrieve a specific property by ID
    getProperty: async (propertyId: number) => {
        try {
            const response = await api.get(`listings/${propertyId}/retrieve/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching property:', error);
            throw error;
        }
    },

    // Update a specific property by ID
    updateProperty: async (propertyId: number, propertyData: {
        title?: string;
        description?: string;
        price?: number;
        location?: string;
        // Add any other fields your API allows to update
    }) => {
        try {
            const response = await api.patch(`listings/${propertyId}/update/`, propertyData);
            return response.data;
        } catch (error) {
            console.error('Error updating property:', error);
            throw error;
        }
    },

    // Delete a specific property by ID
    deleteProperty: async (propertyId: number) => {
        try {
            const response = await api.delete(`listings/${propertyId}/delete/`);
            return response.data;
        } catch (error) {
            console.error('Error deleting property:', error);
            throw error;
        }
    },


    // Fetch property types
    getPropertyTypes: async () => {
        try {
            const response = await api.get('listings/property_types/'); // Use the custom action URL
            return response.data; // Returns the property types as a dictionary
        } catch (error) {
            console.error('Error fetching property types:', error);
            throw error;
        }
    },
};