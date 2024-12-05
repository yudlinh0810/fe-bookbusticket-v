import React from 'react';
import Header from '../../components/Header/Header';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchTrip = (infoSearch) => {
    navigate(`/search-trip`, { state: { infoSearch } });
  };
  return (
    <div>
      <Header />
      <div id='home-container'>
        <SearchTripCpn onSubmit={handleSearchTrip} />
      </div>
    </div>
  );
};

export default HomePage;
