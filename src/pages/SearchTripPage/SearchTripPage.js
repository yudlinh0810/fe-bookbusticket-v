import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { searchTrip } from '../../services/Trip';
import { useLocation } from 'react-router-dom';
import CarTicket from '../../components/CarTicket/CarTicket';
const SearchTrip = () => {
  const location = useLocation();
  const [listTrip, setListTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (location.state?.infoSearch) {
      fetchSearchTrip();
    }
  }, [location.state]);
  const fetchSearchTrip = async () => {
    setIsLoading(true);
    try {
      const infoSearch = location.state.infoSearch;
      const result = await searchTrip(
        infoSearch.departure,
        infoSearch.destination,
        infoSearch.day_departure
      );
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearchTrip = async (data) => {
    try {
      const result = await searchTrip(data.departure, data.destination, data.day_departure);
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    }
  };
  console.log('list', listTrip);
  return (
    <div>
      <Header />
      <SearchTripCpn onSubmit={handleSearchTrip} />
      <div>
        <div>filter</div>
        {isLoading
          ? 'Loading...'
          : Array.isArray(listTrip) && listTrip.length > 0
          ? listTrip.map((trip) => {
              return <CarTicket key={trip.id} data={trip} />;
            })
          : 'Không có chuyến xe bạn cần tìm'}
      </div>
    </div>
  );
};

export default SearchTrip;
