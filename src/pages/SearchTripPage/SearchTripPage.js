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
    { number: 1, content: 'Giờ đi sớm nhất' },
    { number: 2, content: 'Giờ đi muộn nhất' },
    { number: 3, content: 'Đánh giá cao nhất' },
    { number: 4, content: 'Giá tăng dần' },
    { number: 5, content: 'Giá giảm dần' },
  ];
  const [selectArrange, setSelectArrange] = useState(0);

  const fetchSearchTrip = useCallback(async () => {
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
  }, [location.state?.infoSearch]);

  useEffect(() => {
    if (location.state?.infoSearch) {
      fetchSearchTrip();
    }
  }, [fetchSearchTrip]);

  const handleSearchTrip = async (data) => {
    try {
      const result = await searchTrip(data.departure, data.destination, data.day_departure);
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    }
  };

  const handleRadioChange = (number) => {
    setSelectArrange(number);
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
              ? listTrip.map((trip) => <CarTicket key={trip.id} data={trip} />)
              : 'Hiện tại không có chuyến xe nào phù hợp với yêu cầu của bạn'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
