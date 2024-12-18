import { useLocation, useNavigate } from 'react-router-dom';
import './DetailCar.scss';
import AdminFooter from '../../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';
import moment from 'moment';

const DetailCar = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [car, setCar] = useState({});

  useEffect(() => {
    setCar(location?.state);
  }, []);

  const handleBack = () => {
    navigation('/admin/car-manager');
  };

  return (
    <div className='container-detail-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Chi tiết xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          {car ? (
            <div className='bottom'>
              <div className='data'>
                <div className='image'>
                  <img src={car?.image} alt='' />
                </div>
                <div className='list'>
                  <div className='item'>
                    <label>Tên xe:</label>
                    <p>{car?.car_name}</p>
                  </div>
                  <div className='item'>
                    <label>Loại xe:</label>
                    <p>{car?.type}</p>
                  </div>
                  <div className='item'>
                    <label>Số chỗ ngồi:</label>
                    <p>{car?.seat_count}</p>
                  </div>
                  <div className='item'>
                    <label>Trạng thái:</label>
                    <p>{car.status}</p>
                  </div>
                  <div className='item'>
                    <label>Biển số xe:</label>
                    <p>{car?.license_plate}</p>
                  </div>
                  <div className='item'>
                    <label>Năm sản xuất:</label>
                    <p>{car?.year_of_manufacture}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='loading'>...loading</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCar;
