import React from 'react';

const Seat = ({ firstRow, remainingSeats }) => {
  const seat_available_img = 'https://futabus.vn/images/icons/seat_active.svg';
  const seat_sold_img = 'https://futabus.vn/images/icons/seat_disabled.svg';
  return (
    <div>
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
                {Array.isArray(firstRow) && firstRow.length > 0
                  ? firstRow.map((seat, index) => {
                      return (
                        <div key={index} style={{ position: 'relative' }}>
                          <img
                            src={seat.seat_status === 'SS01' ? seat_available_img : seat_sold_img}
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
                      );
                    })
                  : ''}
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
                {Array.isArray(remainingSeats) && remainingSeats.length > 0
                  ? remainingSeats.map((seat, index) => {
                      return (
                        <div key={index} style={{ position: 'relative' }}>
                          <img
                            src={seat.seat_status === 'SS01' ? seat_available_img : seat_sold_img}
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
                      );
                    })
                  : ''}
              </div>
            </div>
            <div
              className=''
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1)' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seat;
