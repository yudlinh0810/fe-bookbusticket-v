import { bookBusTicketAPI } from './CustomizeAxios';

const dpt = '/departure';

const getAllDeparture = () => {
  return bookBusTicketAPI.get(`${dpt}/get-all-departure`).then((result) => result[0].data);
};

export { getAllDeparture };
