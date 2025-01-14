import React from 'react';
import Header from '../../components/Header/Header';
import SearchTripCpn from '../../components/SearchTrip/SearchTripCpn';
import { useNavigate } from 'react-router-dom';
import Slide from '../../components/Slide/Slide';
import slide_img from '../../assets/images/slide-img.jpg';
import slide2_img from '../../assets/images/slide2-img.jpg';
import slide3_img from '../../assets/images/slide3-img.jpg';
import Slider from 'react-slick';
import './home.scss';

const HomePage = () => {
  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Number(document.documentElement.clientWidth) >= 731 ? 4 : 1,
    slidesToScroll: 1,
  };
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
    <div className='home-container'>
      <Header />
      <Slide data={slideArr} />
      <table
        style={{
          position: 'fixed',
          top: '10rem',
          left: '2rem',
          zIndex: '10',
          border: '0.1rem solid #ccc',
        }}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>staff1@gmail.com</td>
            <td>yudlinh</td>
          </tr>
          <tr>
            <td>yudlinh0810@gmail.com</td>
            <td style={{ border: '0.1rem solid #ccc' }}>yudlinh</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Điểm đi</th>
            <th>Điểm đến</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quãng Ngãi</td>
            <td>Đà Nẵng</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Ngày khởi hành</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15/01/2005</td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchTripCpn onSubmit={handleSearchTrip} />
      </div>
      <div className='list-content'>
        <div className='route'>
          <h4>Tuyến đường phổ biến</h4>
          <Slider {...settings}>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=2'
              />
              <div className='description'>
                <span>Đà Nẵng - Nha Trang</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png'
              />
              <div className='description'>
                <span>Đà Nẵng - Đà Lạt</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png'
              />
              <div className='description'>
                <span>Đà Nẵng - Hà Nội</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png'
              />
              <div className='description'>
                <span>Đà Nẵng - Sài gòn</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1'
              />
              <div className='description'>
                <span>Đà Nẵng - Sapa</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1'
              />
              <div className='description'>
                <span>Đà Nẵng - Gia Lai</span>
                <span>Giá: 250.000</span>
              </div>
            </div>
          </Slider>
        </div>
        <div className='new'>
          <h4>Vexe có gì mới</h4>
          <Slider {...settings}>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=4'
              />
              <div className='description'>
                <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/217/img_card.png?v=2'
              />
              <div className='description'>
                <span>Các tính năng mới cùng Siêu ứng dụng Vexere</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/200/img_card.png?v=12'
              />
              <div className='description'>
                <span>“Bảo hiểm chuyến đi” chính thức ra mắt tại Vexere</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/212/img_card.png?v=14'
              />
              <div className='description'>
                <span>Chương trình tích điểm đổi quà tại Vexere</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=13'
              />
              <div className='description'>
                <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
              </div>
            </div>
            <div className='slider-item'>
              <img
                alt=''
                src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=2'
              />
              <div className='description'>
                <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
              </div>
            </div>
          </Slider>
        </div>
        <div className='media'>
          <h4>Vexe đã được nhắc đến trên</h4>
          <div className='media-list'>
            <div className='row'>
              <div className='item col'>
                <img
                  alt=''
                  src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vne.png'
                />
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vtv.png'
                />
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-cesti.png'
                />
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-dantri.png'
                />
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='	https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-tuoitre.png'
                />
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-fbnc.png'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='carry'>
          <h4>Bến xe khách</h4>
          <div className='carry-list'>
            <div className='row'>
              <div className='item col'>
                <img
                  alt=''
                  src='https://cdn1.nhatrangtoday.vn/images/photos/xe-phuong-trang-top.jpg'
                />
                <span>Bến xe Phương Trang</span>
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg'
                />
                <span>Bến xe Miền Đông</span>
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg'
                />
                <span>Bến xe Miền Đông</span>
              </div>
              <div className='item col'>
                <img
                  alt=''
                  src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg'
                />
                <span>Bến xe Miền Đông</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
