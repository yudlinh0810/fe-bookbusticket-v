import React, { useEffect, useState } from 'react';
import { getAllDeparture } from '../../services/Departure';
import { getAllDestination } from '../../services/destination';

const SearchTrip = () => {
  const [listDeparture, setListDeparture] = useState([]);
  const [filterDeparture, setFilterDeparture] = useState([]);
  const [searchDepartureQuery, setDepartureSearchQuery] = useState('');
  const [listDestination, setListDestination] = useState([]);
  const [filterDestination, setFilterDestination] = useState([]);
  const [searchDestinationQuery, setDestinationSearchQuery] = useState('');

  const getDeparture = async () => {
    try {
      const result = await getAllDeparture();
      setListDeparture(result);
      setFilterDeparture(result);
    } catch (error) {
      console.error('Failed to fetch departures:', error);
    }
  };

  const getDestination = async () => {
    try {
      const result = await getAllDestination();
      setListDestination(result);
      setFilterDestination(result);
    } catch (error) {
      console.error('Failed to fetch departures:', error);
    }
  };

  useEffect(() => {
    getDeparture();
    getDestination();
  }, []);

  const handleDepartureSearch = (e) => {
    const query = e.target.value;
    setDepartureSearchQuery(query);

    if (query === '') {
      setFilterDeparture(listDeparture);
    } else {
      const filter = listDeparture.filter((item) =>
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilterDeparture(filter);
    }
  };

  const handleDestinationSearch = (e) => {
    const query = e.target.value;
    setDestinationSearchQuery(query);
    if (query === '') {
      setFilterDestination(listDestination);
    } else {
      const filter = listDestination.filter((item) =>
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilterDestination(filter);
    }
  };
  console.log('list', listDestination);
  return (
    <div id='search-container'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' height={30} width={30}>
        <path d='M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z' />
      </svg>
      <div className='select-d-d'>
        <div className='select-departure'>
          <div className='input-departure'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={25} width={25}>
              <path fill='#105ce0' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' height={18} width={18}>
              <path fill='#ffffff' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
            </svg>
            <input
              type='text'
              value={searchDepartureQuery}
              onChange={handleDepartureSearch}
              placeholder='Điểm đi'
            />
          </div>
          <ul>
            <div>Địa điểm phổ biến</div>
            {filterDeparture.length > 0 ? (
              filterDeparture.map((item, index) => (
                <li key={`departure-${index}`}>{item.location}</li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
        <div>|</div>
        <div className='select-destination'>
          <div className='input-destination'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' width={25} height={25}>
              <path
                fill='#f45252'
                d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z'
              />
            </svg>
            <input
              type='text'
              value={searchDestinationQuery}
              onChange={handleDestinationSearch}
              placeholder='Điểm đến'
            />
          </div>
          <ul>
            <div>Địa điểm phổ biến</div>
            {filterDestination.length > 0 ? (
              filterDestination.map((item, index) => (
                <li key={`departure-${index}`}>{item.location}</li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
