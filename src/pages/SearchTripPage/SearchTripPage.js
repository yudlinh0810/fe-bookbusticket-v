import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CarTicket from '../../components/CarTicket/CarTicket';
import Header from '../../components/Header/Header';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { searchTrip } from '../../services/Trip';
import './SearchTripPage.scss';

const SearchTrip = () => {
  const [searchParams] = useSearchParams();
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
    departure: searchParams.get('departure'),
    destination: searchParams.get('destination'),
    day_departure: searchParams.get('day_departure'),
    price_arrangement: selectArrange,
  });
  const navigate = useNavigate();

  const fetchSearchTrip = async () => {
    setIsLoading(true);
    try {
      const result = await searchTrip(
        searchParams.get('departure'),
        searchParams.get('destination'),
        searchParams.get('day_departure')
      );
      setListTrip(result);
    } catch (error) {
      console.log('Err fetch search trip', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      searchParams.get('departure') &&
      searchParams.get('destination') &&
      searchParams.get('day_departure')
    ) {
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
      const params = new URLSearchParams(data);
      navigate(`/search-trip?${params}`);
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
    <div style={{ width: '100wh' }}>
      <Header />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SearchTripCpn onSubmit={handleSearchTrip} />
      </div>
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
