import bookBusTicketAPI from './CustomizeAxios';

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

export { login, register, verifyEmail, fetchCustomer };
