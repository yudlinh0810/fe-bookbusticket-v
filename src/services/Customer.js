import bookBusTicketAPI from './CustomizeAxios';

const login = (customer) => {
  return bookBusTicketAPI.post(`/customer/login`, customer);
};

const register = (newCustomer) => {
  return bookBusTicketAPI.post(`/customer/register`, newCustomer);
};

const verifyEmail = (verify) => {
  return bookBusTicketAPI.post(`/customer/verify-email`, verify);
};

export { login, register, verifyEmail };
