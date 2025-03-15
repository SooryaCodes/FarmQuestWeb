import axios from 'axios';

// Create an instance of axios with a custom config
const instance = axios.create({
    baseURL: 'https://farmquest-server-production.up.railway.app/api',
});

// Export the axios instance
export default instance;
