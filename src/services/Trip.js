import { bookBusTicketAPI } from './CustomizeAxios';

const trip = '/trip';

const searchTrip = (departure, destination, day_departure, price_arrangement) => {
  return bookBusTicketAPI
    .get(
      `${trip}/search-trips?departure=${encodeURIComponent(
        departure
      )}&destination=${encodeURIComponent(destination)}&day_departure=${encodeURIComponent(
        day_departure
      )}&price_arrangement=${price_arrangement}`
    )
    .then((result) => result[0].data);
};

const getAllTripSeat = (idTrip) => {
  return bookBusTicketAPI
    .get(`${trip}/get-all-trip-seat/${idTrip}`)
    .then((result) => result[0].data);
};

export { searchTrip, getAllTripSeat };
