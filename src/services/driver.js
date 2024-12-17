import { bookBusTicketAPI } from './CustomizeAxios';

const fetchGetAllDriver = () => {
  return bookBusTicketAPI
    .get(`/driver/get-all-driver`)
    .then((res) => res[0])
    .catch((err) => {
      throw err;
    });
};

const createDriver = (data) => {
  return bookBusTicketAPI
    .post(`/driver/create-driver/`, data)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Driver Error: ', error);
      throw error;
    });
};

const updateDriver = (Update) => {
  return bookBusTicketAPI
    .post(`/driver/update-driver`, Update)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Driver Error: ', error);
      throw error;
    });
};

const deleteDriver = (id) => {
  return bookBusTicketAPI
    .delete(`/driver/delete-driver/${id}`)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Driver Error: ', error);
      throw error;
    });
};

export { fetchGetAllDriver, createDriver, updateDriver, deleteDriver };
