import React from 'react';
import Header from '../../components/Header/Header';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { useNavigate } from 'react-router-dom';
import Slide from '../../components/Slide/Slide';
import slide_img from '../../assets/images/slide-img.jpg';
import slide2_img from '../../assets/images/slide2-img.jpg';
import slide3_img from '../../assets/images/slide3-img.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const slideArr = [
    {
      title: `LET'S EXPLORE THE VIETNAM`,
      content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
      image: slide_img,
    },
    {
      title: `LET'S EXPLORE THE VIETNAM 2`,
      content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
      image: slide2_img,
    },
    {
      title: `LET'S EXPLORE THE VIETNAM 3`,
      content: 'Đặt chuyến đi và khám phá những điểm đến mới dễ dàng từ bất cứ đâu',
      image: slide3_img,
    },
  ];

  const handleSearchTrip = (infoSearch) => {
    const params = new URLSearchParams(infoSearch);
    navigate(`/search-trip?${params}`, { state: JSON.stringify(params) });
  };
  return (
    <div>
      <Header />
      <div id='home-container'>
        <Slide data={slideArr} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchTripCpn onSubmit={handleSearchTrip} />
      </div>
    </div>
  );
};

export default HomePage;
