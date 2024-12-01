import bookBusTicketAPI from './CustomizeAxios';

const login = (customer) => {
  return bookBusTicketAPI.post(`/customer/login`, customer);
};

const register = (newCustomer) => {
  return bookBusTicketAPI.post(`/customer/register`, newCustomer);
};

export { login, register };
