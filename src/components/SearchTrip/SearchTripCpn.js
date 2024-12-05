import React, { useLayoutEffect, useState } from 'react';
import { getAllDeparture } from '../../services/Departure';
import { getAllDestination } from '../../services/destination';
import './SearchTripCpn.scss';
import moment from 'moment';

const SearchTrip = ({ onSubmit }) => {
  const [listDeparture, setListDeparture] = useState([]);
  const [filterDeparture, setFilterDeparture] = useState([]);
  const [departureSearchQuery, setDepartureSearchQuery] = useState('');
  const [listDestination, setListDestination] = useState([]);
  const [filterDestination, setFilterDestination] = useState([]);
  const [destinationSearchQuery, setDestinationSearchQuery] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [selectDate, setSelectDate] = useState(currentDate);

  useLayoutEffect(() => {
    const today = new Date();
    const formatDate = today.toISOString().split('T')[0];
    setCurrentDate(formatDate);
    const fetchData = async () => {
      try {
        const departures = await getAllDeparture();
        setListDeparture(departures);
        setFilterDeparture(departures);

        const destinations = await getAllDestination();
        setListDestination(destinations);
        setFilterDestination(destinations);
      } catch (error) {
        console.error('fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDepartureSearch = (e) => {
    const query = e.target.value;
    setDepartureSearchQuery(query);
    if (!query) {
      setFilterDeparture(listDeparture);
    } else {
      const filtered = listDeparture.filter((item) =>
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilterDeparture(filtered);
    }
  };

  const handleDestinationSearch = (e) => {
    const query = e.target.value;
    setDestinationSearchQuery(query);

    if (!query) {
      setFilterDestination(listDestination);
    } else {
      const filtered = listDestination.filter((item) =>
        item.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilterDestination(filtered);
    }
  };

  const handleSelectDep = (location) => {
    setDepartureSearchQuery(location);
    setFilterDeparture(listDeparture);
    setFocusedInput(null);
  };

  const handleSelectDes = (location) => {
    setDestinationSearchQuery(location);
    setFilterDestination(listDestination);
    setFocusedInput(null);
  };

  const handleFocus = (inputType) => {
    setFocusedInput(inputType);
  };

  const handleBlur = (e) => {
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && document.querySelector('#search-container').contains(relatedTarget)) {
      return;
    }
    setFocusedInput(null);
  };

  const handleDateChange = (e) => {
    setSelectDate(e.target.value);
  };

  const handleSearch = () => {
    const infoSearch = {
      departure: departureSearchQuery || 'Quãng Ngãi',
      destination: destinationSearchQuery || 'Đà Nẵng',
      day_departure: selectDate
        ? moment(selectDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
        : moment(currentDate, 'YYYY/MM/DD').format('DD/MM/YYYY'),
    };
    onSubmit(infoSearch);
  };

  return (
    <div id='search-container'>
      <div className='select-d-d'>
        <div className='select select-departure'>
          <div className='input-departure'>
            <input
              className='search-input-cpn'
              type='text'
              value={departureSearchQuery}
              onFocus={() => handleFocus('departure')}
              onBlur={handleBlur}
              onChange={handleDepartureSearch}
              placeholder='Điểm đi'
            />
          </div>
          <ul
            className='location location-departure'
            style={{
              display: focusedInput === 'departure' ? 'block' : 'none',
            }}
          >
            <div>Địa điểm phổ biến</div>
            {filterDeparture.length > 0 ? (
              filterDeparture.map((item, index) => (
                <li key={`departure-${index}`} onMouseDown={() => handleSelectDep(item.location)}>
                  {item.location}
                </li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
        <div>|</div>
        <div className='select select-destination'>
          <div className='input-destination'>
            <input
              className='search-input-cpn'
              type='text'
              value={destinationSearchQuery}
              onFocus={() => handleFocus('destination')}
              onBlur={handleBlur}
              onChange={handleDestinationSearch}
              placeholder='Điểm đến'
            />
          </div>
          <ul
            className='location location-destination'
            style={{
              display: focusedInput === 'destination' ? 'block' : 'none',
            }}
          >
            <div>Địa điểm phổ biến</div>
            {filterDestination.length > 0 ? (
              filterDestination.map((item, index) => (
                <li key={`destination-${index}`} onMouseDown={() => handleSelectDes(item.location)}>
                  {item.location}
                </li>
              ))
            ) : (
              <li>Không có dữ liệu</li>
            )}
          </ul>
        </div>
        <div className='select select-date'>
          <input
            className='search-input-cpn'
            type='date'
            defaultValue={currentDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className='search-btn'>
        <button onClick={handleSearch}>Tìm Kiếm</button>
      </div>
    </div>
  );
};

export default SearchTrip;
