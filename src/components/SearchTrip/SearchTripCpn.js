import React, { useLayoutEffect, useRef, useState } from 'react';
import { getAllDeparture } from '../../services/Departure';
import { getAllDestination } from '../../services/destination';
import './SearchTripCpn.scss';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
// import Slide from '../Slide/Slide';
// import slide_img from '../../assets/images/slide-img.jpg';
// import slide2_img from '../../assets/images/slide2-img.jpg';
// import slide3_img from '../../assets/images/slide3-img.jpg';

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
  const dateInputRef = useRef(null);
  const [triangleStateDep, setTriangleStateDep] = useState(false);
  const [triangleStateDes, setTriangleStateDes] = useState(false);
  const location = useLocation();
  // const slideArr = [
  //   {
  //     title: `LET'S EXPLORE THE VIETNAM`,
  //     content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
  //     image: slide_img,
  //   },
  //   {
  //     title: `LET'S EXPLORE THE VIETNAM 2`,
  //     content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
  //     image: slide2_img,
  //   },
  //   {
  //     title: `LET'S EXPLORE THE VIETNAM 3`,
  //     content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
  //     image: slide3_img,
  //   },
  // ];

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
    if (inputType === 'departure') {
      setTriangleStateDep(true);
      setTriangleStateDes(false);
    } else {
      setTriangleStateDes(true);
      setTriangleStateDep(false);
    }
  };

  const handleBlur = (e) => {
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && document.querySelector('#search-container').contains(relatedTarget)) {
      return;
    }
    setFocusedInput(null);
    setTriangleStateDep(false);
    setTriangleStateDes(false);
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

  // const focusDateInput = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (dateInputRef.current) {
  //     dateInputRef.current.focus();
  //     console.log(1);
  //   }
  // };

  return (
    <div className=''>
      {/* <Slide data={slideArr} /> */}

      <div id='search-container'>
        <div className='input__select'>
          <div className='select__left'>
            <div className='select-d-d'>
              <div className='input select-departure'>
                <div className='input-departure' style={{ position: 'relative' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={20}
                    style={{ position: 'absolute', top: '0.4rem', right: '0.2rem' }}
                  >
                    <path fill='#74C0FC' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={10}
                    style={{ position: 'absolute', top: '0.7rem', right: '0.5rem' }}
                  >
                    <path fill='#ffffff' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
                  </svg>
                  <input
                    className='search-input-cpn'
                    type='text'
                    value={departureSearchQuery}
                    onFocus={() => handleFocus('departure')}
                    onBlur={handleBlur}
                    onChange={handleDepartureSearch}
                    placeholder='Điểm đi'
                    style={{ position: 'relative' }}
                  />
                </div>
                <span
                  className={
                    location.pathname === '/'
                      ? triangleStateDep
                        ? 'triangle-t'
                        : ''
                      : triangleStateDep
                      ? 'triangle-b'
                      : ''
                  }
                ></span>
                <ul
                  className='location location-departure'
                  style={{
                    display: focusedInput === 'departure' ? 'block' : 'none',
                    position: 'absolute',
                    top: location.pathname === '/' ? '-21.1rem' : '3.4rem',
                  }}
                >
                  <div>Địa điểm phổ biến</div>
                  {filterDeparture.length > 0 ? (
                    filterDeparture.map((item, index) => (
                      <li
                        key={`departure-${index}`}
                        onMouseDown={() => handleSelectDep(item.location)}
                      >
                        {item.location}
                      </li>
                    ))
                  ) : (
                    <li>Không có dữ liệu</li>
                  )}
                </ul>
              </div>
              <div className='input select-destination'>
                <div className='input-destination' style={{ position: 'relative' }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                    width={20}
                    height={20}
                    style={{ position: 'absolute', top: '0.4rem', right: '0.2rem' }}
                  >
                    <path
                      fill='#ff0000'
                      d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z'
                    />
                  </svg>
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
                <span
                  className={
                    location.pathname === '/'
                      ? triangleStateDes
                        ? 'triangle-t'
                        : ''
                      : triangleStateDes
                      ? 'triangle-b'
                      : ''
                  }
                ></span>
                <ul
                  className='location location-destination'
                  style={{
                    display: focusedInput === 'destination' ? 'block' : 'none',
                    position: 'absolute',
                    top: location.pathname === '/' ? '-21.1rem' : '3.4rem',
                  }}
                >
                  <div>Địa điểm phổ biến</div>
                  {filterDestination.length > 0 ? (
                    filterDestination.map((item, index) => (
                      <li
                        key={`destination-${index}`}
                        onMouseDown={() => handleSelectDes(item.location)}
                      >
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
                  ref={dateInputRef}
                  id='date-input'
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
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
