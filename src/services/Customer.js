import bookBusTicketAPI from './CustomizeAxios';

const login = (customer) => {
  return bookBusTicketAPI.post(`/customer/login`, customer, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const register = (newCustomer) => {
  return bookBusTicketAPI.post(`/customer/register`, newCustomer, {
    headers: { 'Content-Type': 'application/json' },
  });
};

const verifyEmail = (verify) => {
  return bookBusTicketAPI.post(`/customer/verify-email`, verify, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export { login, register, verifyEmail };
