import { useState } from 'react';
import AdminFooter from '../../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../../components/SidebarAdmin/SidebarAdmin';
import './CreateCar.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../../../../services/Car';

const CreateCar = () => {
  const [newCar, setNewCar] = useState({ type: 'Xe thường', status: 'Sẵn sàng' });
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const navigation = useNavigate();

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

  const onClickAddNewCar = async () => {
    let { name, type, numberOfSeats, yearOfManufacture, phone, licensePlate, status } = newCar;
    console.log('new car', newCar);
    if (
      (!name || !type || !numberOfSeats || !licensePlate || !file || !phone,
      !status || !yearOfManufacture)
    ) {
      toast.error('Bạn chưa điền đầy đủ thông tin!');
      return;
    }

    let formData = new FormData();
    // Object.keys(newCar).forEach((key) => formData.append(key, newCar[key]));
    formData.append('file', file);
    formData.append('data', JSON.stringify(newCar));

    console.log('formData: ', formData);

    const res = await createCar(formData);

    console.log('res: ', res);

    if (res.status === 'OK') {
      toast.success('Tạo mới xe thành công');
      setNewCar({});
      setPreviewImage(null);
      navigation('/admin/car-manager');
    } else {
      toast.error('Tạo xe thất bại');
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
                  value={newCar.name || ''}
                  onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
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
                  value={newCar.numberOfSeats || ''}
                  onChange={(e) => setNewCar({ ...newCar, numberOfSeats: e.target.value })}
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
                  value={newCar.yearOfManufacture || ''}
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
                      yearOfManufacture: e.target.value,
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
                  value={newCar.phone || ''}
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
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
                  value={newCar.licensePlate || ''}
                  onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })}
                />
              </div>
              <div className='mb-3 col-4 status'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Loại xe
                </label>
                <select
                  onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                  value={newCar.type}
                >
                  <option>Xe thường</option>
                  <option>Xe giường nằm</option>
                </select>
              </div>
              <div className='mb-3 col-4 status'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Trạng thái
                </label>
                <select
                  onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
                  value={newCar.status}
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
                onClick={() => onClickAddNewCar()}
              >
                + Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
