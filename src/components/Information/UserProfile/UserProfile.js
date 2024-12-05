import React, { useEffect, useState } from 'react';
import useUserStore from '../../../stores/UserStore';
import { toast } from 'react-toastify';
import { fetchCustomer, updateCustomer } from '../../../services/Customer';
import Header from '../../Header/Header';

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
    formData.append('file', file);
    formData.append('data', JSON.stringify(data));
    const result = await updateCustomer(formData);
    console.log('status', JSON.parse(result).status);
    if (JSON.parse(result).status === 'OK') {
      toast.success('Cập nhật thông tin thành công');
      const token = { access_token: localStorage.getItem('access_token') };
      const userNew = await fetchCustomer(token);
      const details = userNew;
      setUser(details);
      console.log('user', user);
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
      <div className='user-profile'>
        {' '}
        <h1>User Profile</h1>{' '}
        <form onSubmit={handleUpdate}>
          {user ? (
            <div>
              {' '}
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />{' '}
              <input defaultValue={user.email} readOnly />{' '}
              <div>
                <input type='file' accept='.png, .jpg' onChange={(e) => handleFileChange(e)} />
                <img src={previewImage} alt='portrait' width={70} height={100}></img>
              </div>
              <button type='submit'>Update Profile</button>{' '}
            </div>
          ) : (
            <div>
              {' '}
              <p>No user logged in.</p>{' '}
            </div>
          )}{' '}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
