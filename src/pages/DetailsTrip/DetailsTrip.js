import './DetailsTrip.scss';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';

const DetailsTrip = () => {
  const location = useLocation();
  const seat_available_img = 'https://futabus.vn/images/icons/seat_active.svg';
  const seat_sold_img = 'https://futabus.vn/images/icons/seat_disabled.svg';
  const seat_selecting_img = 'https://futabus.vn/images/icons/seat_selecting.svg';

  // State để lưu trạng thái các ghế
  const [seatData, setSeatData] = useState(
    location.state.tripSeatData.map((seat) => ({
      ...seat,
      isSelected: false, // Thêm trạng thái isSelected cho mỗi ghế
    }))
  );
  const firstRow = seatData.slice(0, 2); //  Lấy 2 ghế đầu
  const remainingSeats = seatData.slice(2); //  Lấy các ghế còn lại

  // State để lưu các ghế được chọn
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (index) => {
    setSeatData((prevSeats) => {
      const updatedSeats = prevSeats.map((seat, i) => {
        if (i === index && seat.seat_status !== 'SS02') {
          const isSelected = !seat.isSelected;

          // Cập nhật danh sách các ghế được chọn
          if (isSelected) {
            setSelectedSeats((prevSelected) => [seat, ...prevSelected]);
          } else {
            setSelectedSeats((prevSelected) =>
              prevSelected.filter(
                (selectedSeat) => selectedSeat.seat_position !== seat.seat_position
              )
            );
          }

          return {
            ...seat,
            isSelected,
          };
        }
        return seat;
      });

      return updatedSeats;
    });
  };

  const priceTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  return (
    <div className='details-trip-container'>
      <Header />
      <div
        className='details-header'
        style={{ height: '5rem', position: 'relative', display: 'flex', backgroundColor: '#ccc' }}
      >
        <div className='prev' style={{ margin: '1.4rem 0 0 1.4rem' }}>
          Quay lại
        </div>
        <div
          className='dep-des-date'
          style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 50%)' }}
        >
          <h3>Đà Nẵng - TP.Hồ Chí Minh</h3>
          <p style={{ textAlign: 'center' }}>04-12-2024</p>
        </div>
      </div>
      <div
        className='details-body'
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <div
          className='d-b-container'
          style={{
            width: '86rem',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div
            className='d-b-r'
            style={{
              width: '60%',
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '0.6rem',
            }}
          >
            <div
              className='top'
              style={{ width: '30rem', display: 'flex', justifyContent: 'space-around' }}
            >
              <span>Chọn ghế</span>
              <span>Thông tin chi tiết</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                className='first-row'
                style={{ width: '11.06rem', height: '2.25rem', textAlign: 'center' }}
              >
                <div>
                  <span style={{ textAlign: 'center' }}>Ghế</span>
                  <div>
                    <div className=''>
                      <div
                        className='upper-floor'
                        style={{
                          margin: '0 0.6rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {firstRow.map((seat, index) => (
                          <div
                            className='seat'
                            key={index}
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => handleSeatClick(index)}
                          >
                            <img
                              src={
                                seat.isSelected
                                  ? seat_selecting_img
                                  : seat.seat_status === 'SS01'
                                  ? seat_available_img
                                  : seat_sold_img
                              }
                              alt='logo-seat'
                              style={{ width: '1.8rem', height: '1.8rem' }}
                            />
                            <span
                              style={{
                                fontSize: '0.8rem',
                                position: 'absolute',
                                top: '0.2rem',
                                left: '20%',
                              }}
                            >
                              {seat.seat_position}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className='downstairs'
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '1rem',
                          marginBottom: '0.8rem',
                        }}
                      >
                        {remainingSeats.map((seat, index) => (
                          <div
                            className='seat'
                            key={index + 2}
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => handleSeatClick(index + 2)}
                          >
                            <img
                              src={
                                seat.isSelected
                                  ? seat_selecting_img
                                  : seat.seat_status === 'SS01'
                                  ? seat_available_img
                                  : seat_sold_img
                              }
                              alt='logo-seat'
                              style={{ width: '1.8rem', height: '1.8rem' }}
                            />
                            <span
                              style={{
                                fontSize: '0.8rem',
                                position: 'absolute',
                                top: '0.2rem',
                                left: '20%',
                              }}
                            >
                              {seat.seat_position}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='b-right'>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className='seat-status'
                    style={{
                      width: '0.8rem',
                      height: '0.8rem',
                      marginRight: '0.4rem',
                      borderRadius: '0.2rem',
                      backgroundColor: '#C0C6CC',
                    }}
                  ></div>
                  Đã bán
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className='seat-status'
                    style={{
                      width: '0.8rem',
                      height: '0.8rem',
                      marginRight: '0.4rem',
                      borderRadius: '0.2rem',
                      backgroundColor: '#96C5E7',
                    }}
                  ></div>
                  Còn trống
                </span>
              </div>
            </div>
          </div>
          <div
            className='d-b-l'
            style={{
              width: '30%',
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '0.6rem',
            }}
          >
            <h4>Ghế đã chọn</h4>
            <div className='' style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedSeats.map((seat, index) => (
                <span style={{ width: '2rem', marginRight: '1rem' }} key={index}>
                  {seat.seat_position}
                </span>
              ))}
            </div>
            <div>Tổng giá {priceTotal.toLocaleString()}VND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTrip;