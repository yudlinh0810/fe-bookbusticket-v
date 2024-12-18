import { bookBusTicketAPI } from './CustomizeAxios';

const getCars = () => {
  return bookBusTicketAPI
    .get(`car/get-all-car`)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Car Error: ', error);
      throw error;
    });
};

const createCar = (data) => {
  return bookBusTicketAPI
    .post(`car/create-car/`, data)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Car Error: ', error);
      throw error;
    });
};

const updateCar = (Update) => {
  return bookBusTicketAPI
    .post(`car/update-car`, Update)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Car Error: ', error);
      throw error;
    });
};

const deleteCar = (id) => {
  return bookBusTicketAPI
    .delete(`car/delete-car/${id}`)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Car Error: ', error);
      throw error;
    });
};

export { updateCar, getCars, deleteCar, createCar };
