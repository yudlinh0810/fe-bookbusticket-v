import axios from 'axios';

const bookBusTicketAPI = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_URL}.ngrok-free.app/api`,
  withCredentials: true,
  headers: { 'ngrok-skip-browser-warning': 'true' },
});
bookBusTicketAPI.interceptors.response.use(
  (response) => {
    return [response.data || []];
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default bookBusTicketAPI;
