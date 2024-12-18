import moment from 'moment';
import './CarTicket.scss';
import { useNavigate } from 'react-router-dom';
import { getAllTripSeat } from '../../services/Trip';

const CarTicket = ({ data, url }) => {
  const navigate = useNavigate();

  const handleSelectTrip = async () => {
    const getAllSeat = await getAllTripSeat(data.id);
    //
    const query = {
      departure: data.departure_location,
      id: data.id,
      destination: data.destination_location,
      day_departure: moment(data.day_departure.slice(0, 10), 'YYYY/MM/DD').format('DD-MM-YYYY'),
    };
    const params = new URLSearchParams(query);
    navigate(`/details-trip?${params}`, {
      state: { url: url, tripData: data, tripSeatData: getAllSeat },
    });
  };
  return (
    <div className='ticket-container'>
      <div className='bus-info-t'>
        <div className='bus-image'>
          <img
            src='https://static.vexere.com/production/images/1660789771506.jpeg?w=250&h=250'
            alt='bus-image'
          />
        </div>
        <div className='bus-info'>
          <div className='n-p-info'>
            <p className='trip-name-info'>{data.trip_name}</p>
            <h3>{data.price}đ</h3>
          </div>
          <div className='cn-sc-info'>
            <p>{data.car_name}</p>
            <p>Còn {data.available_seat} chỗ trống</p>
          </div>
          <div className='detail-info'>
            <span></span>
            <p className='detail'>Thông tin chuyến đi</p>
          </div>
          <div className='btn'>
            <span></span>
            <button onClick={handleSelectTrip}>Chọn chuyến</button>
          </div>
        </div>
      </div>
      <div className='bus-info-bt'>
        <p>
          <small>*</small>Vé thuộc chuyến {data.hours_departure.slice(0, 5)}{' '}
          {moment(data.day_departure.slice(0, 10), 'YYYY/MM/DD').format('DD-MM-YYYY')}{' '}
          {data.departure_location} - {data.destination_location}
        </p>
      </div>
    </div>
  );
};

export default CarTicket;
