import { bookBusTicketAPI } from './CustomizeAxios';

const ctm = '/customer';

const login = (customer) => {
  return bookBusTicketAPI.post(`${ctm}/login`, customer, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const register = (newCustomer) => {
  return bookBusTicketAPI.post(`${ctm}/register`, newCustomer, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const verifyEmail = (verify) => {
  return bookBusTicketAPI.post(`${ctm}/verify-email`, verify, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const fetchCustomer = (token) => {
  return bookBusTicketAPI
    .post(`${ctm}/get-detail-user`, token)
    .then((response) => response[0].data)
    .catch((error) => {
      console.error('Fetch Customer Error: ', error);
      throw error;
    });
};

const getAllCustomer = () => {
  return bookBusTicketAPI
    .get(`${ctm}/get-all-customer`)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Customer Error: ', error);
      throw error;
    });
};

const updateCustomer = (Update) => {
  return bookBusTicketAPI
    .post(`${ctm}/update-customer`, Update)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Customer Error: ', error);
      throw error;
    });
};

const deleteCustomer = (id) => {
  return bookBusTicketAPI
    .delete(`${ctm}/delete-customer/${id}`)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Customer Error: ', error);
      throw error;
    });
};

const createCustomer = (data) => {
  return bookBusTicketAPI
    .post(`${ctm}/create-customer/`, data)
    .then((response) => response[0])
    .catch((error) => {
      console.error('Fetch Customer Error: ', error);
      throw error;
    });
};

export {
  login,
  register,
  verifyEmail,
  fetchCustomer,
  updateCustomer,
  getAllCustomer,
  deleteCustomer,
  createCustomer,
};
