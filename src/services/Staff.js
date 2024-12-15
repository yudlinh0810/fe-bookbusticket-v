import { bookBusTicketAPI } from './CustomizeAxios';

const staffLogin = (data) => {
  return bookBusTicketAPI
    .post(`/staff/login`, data)
    .then((responsive) => responsive[0])
    .catch((error) => {
      throw error;
    });
};

const fetchStaff = (token) => {
  return bookBusTicketAPI
    .post(`/staff/get-detail-staff/${token}`)
    .then((responsive) => responsive[0].data)
    .catch((err) => {
      throw err;
    });
};

export { staffLogin, fetchStaff };
