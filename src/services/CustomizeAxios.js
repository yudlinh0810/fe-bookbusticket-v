import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const bookBusTicketAPI = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_URL}.ngrok-free.app/api/`,
});
bookBusTicketAPI.interceptors.response.use(
  (response) => {
    return [response.headers || null, response.status || null, response.data || []];
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { bookBusTicketAPI };
