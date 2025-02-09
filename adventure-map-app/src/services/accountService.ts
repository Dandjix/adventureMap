import axios from 'axios';

const API_URL = 'http://localhost:3001';  // Update this with your backend URL

// Function to fetch user profile info
export const getUserProfile = async (token: string) => {
  try {
    // Make the request to the backend
    const response = await axios.get(`${API_URL}/account`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Attach the JWT token
      }
    });

    return response.data;  // Return user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Handle different error responses here (e.g., 401, 404)
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        throw new Error('Unauthorized - Invalid or expired token');
      } else if (error.response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('An unexpected error occurred');
      }
    } else {
      throw new Error('Network or server error');
    }
  }
};
