import { useState, useEffect, useRef } from 'react';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
} from '../../../services/Customer';
import './CustomerManager.scss';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CustomerManager = () => {
  const [page, setPage] = useState(0);
  const [listUser, setListUser] = useState(0);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [userUpdate, setUserUpdate] = useState({});
  const [idUserDelete, setIdUserUpdate] = useState('');
  const [userCompare, setUserCompare] = useState({});
  useEffect(() => {
    getAllUser();
  }, [page]);

  const getAllUser = async () => {
    let res = await getAllCustomer(page);
    if (res && res.status === 'OK') {
      setListUser(res);
    }
  };

  const handlePageClick = (e) => {
    if (e) {
      setPage(e.selected);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setIdUserUpdate(id);
  };

  const handleShowUpdate = (user) => {
    setShowUpdate(true);
    setUserUpdate(user);
    setUserCompare(user);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleAddNewUser = async () => {
    let { email, name, password, phone } = newUser;
    if (!email || !name || !password || !phone) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!phone.match('[0-9]{10}')) {
      toast.error('Số điện thoại của bạn k đúng địng dạng!');
      return;
    }

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!isCheckEmail) {
      toast.error('Email không hợp lệ!');
      return;
    }
    console.log('new', newUser);
    let res = await createCustomer(newUser);

    if (res.status === 'OK') {
      toast.success('Bạn đã thêm thành công!');
      getAllUser();
      setNewUser({});
      handleClose();
    } else {
      toast.error('Thêm thất bại!');
      handleClose();
    }
  };
  useEffect(() => {
    // Khi userUpdate thay đổi, reset lại ảnh đại diện
    if (userUpdate?.portrait) {
      setPreviewImage(userUpdate.portrait);
    } else {
      setPreviewImage(''); // Reset ảnh khi không có portrait
    }
  }, [userUpdate?.portrait]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(userUpdate?.portrait);
  console.log('portrait', userUpdate?.portrait);

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

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(userUpdate));
    console.log('update', formData);
    if (userUpdate !== userCompare || file) {
      let res = await updateCustomer(formData);
      if (res && res.status === 'OK') {
        toast.success('Bạn đã cập nhật thành công!');
        handleCloseUpdate();
        getAllUser();
        setFile(null);
        setUserUpdate({});
        setUserCompare({});
      } else {
        handleClose();
        toast.error('Cập nhật thất bại!');
      }
    } else {
      toast.error('Bạn chưa thay đổi thông tin gì!');
    }
  };

  const handleDeleteUser = async () => {
    if (idUserDelete) {
      let res = await deleteCustomer(idUserDelete);
      console.log('res', res);
      if (res.status === 'OK') {
        toast.success('Bạn đã xóa thành công!');
        handleDeleteClose();
        setIdUserUpdate('');
        getAllUser();
      } else {
        toast.error('Xóa thất bại!');
        handleDeleteClose();
        setIdUserUpdate('');
      }
    }
  };

  return (
    <div className='container-manage-user'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Quản lý người dùng</h3>
            <button className='btn btn-primary' onClick={() => handleShow()}>
              + Thêm mới
            </button>
          </div>
          <div className='data'>
            {listUser && listUser?.data?.length > 0 ? (
              <table className='table-manage-users'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button
                            className='btn btn-warning update'
                            onClick={() => handleShowUpdate(item)}
                          >
                            Sửa
                          </button>
                          <button
                            className='btn btn-danger delete'
                            onClick={() => handleDeleteShow(item.id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className='loading'>...loading</div>
            )}
          </div>
        </div>
      </div>
      <AdminFooter />
      {/* Modal create user */}
      <div className='modal'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới người dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='name@example.com'
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Tên
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Họ và tên'
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Mật khẩu
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Mật khẩu'
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div className='mb-3 col-6'>
                <label htmlFor='exampleFormControlInput1' className='form-label'>
                  Điện thoại
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Số điện thoại'
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddNewUser}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Modal update user */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <form onSubmit={handleUpdateUser}>
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
                  <div className='choose-file' style={{ display: 'flex', width: '17.2rem' }}>
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
                    <input defaultValue={userUpdate.email} readOnly />
                  </div>
                  <div className='l-info'>
                    <label>Tên:</label>
                    <input
                      placeholder='Tên của bạn'
                      value={userUpdate.name || ''}
                      onChange={(e) => setUserUpdate({ ...userUpdate, name: e.target.value })}
                    />
                  </div>
                  <div className='l-info'>
                    <label>SĐT:</label>
                    <input
                      placeholder='Số điện thoại'
                      value={userUpdate.phone || ''}
                      onChange={(e) => setUserUpdate({ ...userUpdate, phone: e.target.value })}
                    />
                  </div>
                  <div className='l-info'>
                    <label>Địa chỉ:</label>
                    <input
                      placeholder='Địa chỉ'
                      value={userUpdate.address || ''}
                      onChange={(e) => setUserUpdate({ ...userUpdate, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUpdateUser}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal delete user */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <span>Bạn có chắc chắn xóa người dùng này?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerManager;
