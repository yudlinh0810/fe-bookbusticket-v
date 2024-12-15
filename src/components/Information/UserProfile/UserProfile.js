import React, { useEffect, useState } from 'react';
import useUserStore from '../../../stores/UserStore';
import { toast } from 'react-toastify';
import { fetchCustomer, updateCustomer } from '../../../services/Customer';
import Header from '../../Header/Header';
import './UserProfile.scss';

const UserProfile = () => {
  const { user, setUser } = useUserStore();
  const [data, setData] = useState(user);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(data?.portrait);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file || null);
    formData.append('data', JSON.stringify(data));
    const result = await updateCustomer(formData);
    if (result.status === 'OK') {
      toast.success('Cập nhật thông tin thành công');
      const token = { access_token: localStorage.getItem('access_token') };
      const userNew = await fetchCustomer(token);
      console.log('user', userNew);
      const details = userNew;
      setUser(details);
    }
  };

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div className='user-profile' style={{ display: 'flex', justifyContent: 'center' }}>
        {' '}
        {/* <h1>User Profile</h1>{' '} */}
        <form onSubmit={handleUpdate}>
          {user ? (
            <div className='user-details' style={{ display: 'flex' }}>
              <div className='r' style={{ marginRight: '1rem' }}>
                <div
                  className='portrait'
                  style={{
                    height: '7.25rem',
                    width: '6.75rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: '0.4rem',
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt='portrait'
                      style={{ width: '6rem', height: '6.25rem' }}
                    />
                  ) : (
                    <p className='image-not' style={{ textAlign: 'center' }}>
                      Bạn chưa có ảnh đại diện kìa
                    </p>
                  )}
                </div>
                <div className='choose-file' style={{ display: 'flex' }}>
                  <input
                    type='file'
                    accept='.png, .jpg'
                    onChange={(e) => handleFileChange(e)}
                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className='l'>
                <div className='l-info'>
                  <label>Email:</label>
                  <input defaultValue={user.email} readOnly />
                </div>
                <div className='l-info'>
                  <label>Tên:</label>
                  <input
                    placeholder='Tên của bạn'
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
                <div className='l-info'>
                  <label>SĐT:</label>
                  <input
                    placeholder='Số điện thoại'
                    value={data.phone || ''}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                  />
                </div>
                <div className='l-info'>
                  <label>Địa chỉ:</label>
                  <input
                    placeholder='Địa chỉ'
                    value={data.address || ''}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {' '}
              <p>No user logged in.</p>{' '}
            </div>
          )}{' '}
          <div className='btn-container'>
            <button className='btn-update' type='submit'>
              Update Profile
            </button>{' '}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
