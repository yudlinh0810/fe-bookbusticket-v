import './UpdateCar.scss';
import AdminFooter from '../../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCar } from '../../../../services/Car';

const UpdateCar = (props) => {
  const location = useLocation();
  const [car, setCar] = useState({
    type: 'Xe thường',
    status: 'Sẵn sàng',
  });
  const [carCompare, setCarCompare] = useState();
  const [previewImage, setPreviewImage] = useState(location.state.image);
  const [file, setFile] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    setCar(location?.state);
    setCarCompare(location?.state);
  }, []);

  const handleBack = () => {
    navigation('/admin/car-manager');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast.warn('Chỉ cho phép tải ảnh PNG hoặc JPG');
      } else {
        setFile(file);
        const imgURL = URL.createObjectURL(file);
        setPreviewImage(imgURL);
      }
    }
  };

  const onClickUpdateCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(car));
    console.log('car', car);
    console.log('file', file);
    if (car !== carCompare || file) {
      let res = await updateCar(formData);
      if (res.status === 'OK') {
        toast.success('Cập nhật thành công');
        navigation('/admin/car-manager');
      }
    } else {
      toast.error('Bạn chưa thay đổi gì!');
      return;
    }
  };
  return (
    <div className='container-create-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Thêm xe</h3>
            <button className='btn btn-primary col-2 mx-3 my-3' onClick={() => handleBack()}>
              {'<-- Quay lại'}
            </button>
          </div>
          <div className='bottom'>
            <div className='row'>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Tên xe
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car.car_name || ''}
                  onChange={(e) => setCar({ ...car, car_name: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Số chỗ ngồi
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car.seat_count || ''}
                  onChange={(e) => setCar({ ...car, seat_count: e.target.value })}
                />
              </div>

              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Năm sản xuất
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car.year_of_manufacture || ''}
                  onChange={(e) =>
                    setCar({
                      ...car,
                      year_of_manufacture: e.target.value,
                    })
                  }
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Số điện thoại
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car.phone || ''}
                  onChange={(e) =>
                    setCar({
                      ...car,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Biển số xe
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  value={car.license_plate || ''}
                  onChange={(e) => setCar({ ...car, license_plate: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4 status'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Loại xe
                </label>
                <select onChange={(e) => setCar({ ...car, type: e.target.value })} value={car.type}>
                  <option>Xe thường</option>
                  <option>Xe giường nằm</option>
                </select>
              </div>
              <div className='mb-3 col-4 status'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Trạng thái
                </label>
                <select
                  onChange={(e) => setCar({ ...car, status: e.target.value })}
                  value={car.status}
                >
                  <option>Sẵn sàng</option>
                  <option>Đang chạy</option>
                  <option>Bảo trì</option>
                </select>
              </div>
              <div className='mb-3 col-4'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Hình ảnh
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='...'
                  accept='png, jpg'
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
                {previewImage && <img src={previewImage} width={'100px'} height={'100px'} alt='' />}
              </div>
            </div>
            <div>
              <button
                className='btn btn-primary col-2 mx-3 my-3'
                onClick={(e) => onClickUpdateCar(e)}
              >
                + Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default UpdateCar;
