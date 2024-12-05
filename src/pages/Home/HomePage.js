import React from 'react';
import Header from '../../components/Header/Header';
import SearchTrip from '../../components/SearchTrip/SearchTrip';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div id='home-container'>
        <SearchTrip />
      </div>
    </div>
  );
};

export default HomePage;
