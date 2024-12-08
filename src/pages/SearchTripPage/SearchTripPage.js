import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header/Header';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { searchTrip } from '../../services/Trip';
import { useLocation } from 'react-router-dom';
import CarTicket from '../../components/CarTicket/CarTicket';
import './SearchTripPage.scss';
import RadioGroup from '../../components/RadioGroup/RadioGroup';

const SearchTrip = () => {
  const location = useLocation();
  const [listTrip, setListTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentArrange = [
    // { number: 1, content: 'Giờ đi sớm nhất' },
    // { number: 2, content: 'Giờ đi muộn nhất' },
    // { number: 3, content: 'Đánh giá cao nhất' },
    { number: 4, content: 'Giá tăng dần' },
    { number: 5, content: 'Giá giảm dần' },
  ];
  const [selectArrange, setSelectArrange] = useState(0);
  const [query, setQuery] = useState({
    departure: location.state?.infoSearch?.departure,
    destination: location.state?.infoSearch?.destination,
    day_departure: location.state?.infoSearch?.day_departure,
    price_arrangement: selectArrange,
  });

  const fetchSearchTrip = async () => {
    setIsLoading(true);
    try {
      const infoSearch = location.state?.infoSearch;
      if (infoSearch) {
        const result = await searchTrip(
          infoSearch.departure,
          infoSearch.destination,
          infoSearch.day_departure
        );
        setListTrip(result);
      }
    } catch (error) {
      console.log('Err fetch search trip', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.infoSearch) {
      fetchSearchTrip();
    }
  }, []);

  const handleSearchTrip = async (data) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      departure: data.departure,
      destination: data.destination,
      day_departure: data.day_departure,
    }));
    try {
      const result = await searchTrip(data.departure, data.destination, data.day_departure);
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    }
  };

  const handleRadioChange = async (number) => {
    setSelectArrange(number);
    const { departure, destination, day_departure } = query;

    if (!departure || !destination || !day_departure) {
      console.log('Thông tin tìm kiếm chưa đầy đủ.');
      return;
    }
    try {
      const result = await searchTrip(departure, destination, day_departure, number);
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    }
  };

  return (
    <div>
      <Header />
      <SearchTripCpn onSubmit={handleSearchTrip} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='search-trip-container'>
          <div className='search-trip-container-r'>
            <div className='t'>
              <RadioGroup
                contentArr={contentArrange}
                selectedValue={selectArrange}
                onChange={handleRadioChange}
              />
            </div>
            <div className='b'>
              <div className='filter'>Lọc</div>
            </div>
          </div>
          <div className='search-trip-container-l'>
            <h3>Kết quả: {Array.isArray(listTrip) ? listTrip.length : 0}</h3>
            {isLoading
              ? 'Loading...'
              : Array.isArray(listTrip) && listTrip.length > 0
              ? listTrip.map((trip, index) => <CarTicket key={index} data={trip} />)
              : 'Hiện tại không có chuyến xe nào phù hợp với yêu cầu của bạn'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
