import bookBusTicketAPI from './CustomizeAxios';

const trip = '/trip';

const searchTrip = (departure, destination, day_departure) => {
  return bookBusTicketAPI
    .get(
      `${trip}/search-trips?departure=${encodeURIComponent(
        departure
      )}&destination=${encodeURIComponent(destination)}&day_departure=${encodeURIComponent(
        day_departure
      )}`
    )
    .then((result) => result[0].data);
};

export { searchTrip };
