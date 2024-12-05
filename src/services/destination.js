import bookBusTicketAPI from './CustomizeAxios';

const dpt = '/destination';

const getAllDestination = () => {
  return bookBusTicketAPI.get(`${dpt}/get-all-destination`).then((result) => result[0].data);
};

export { getAllDestination };
