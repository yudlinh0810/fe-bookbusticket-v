import { useState, useEffect, useLayoutEffect } from 'react';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin';
import { createDriver, deleteDriver, updateDriver } from '../../../services/driver';
import './DriverManager.scss';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchGetAllDriver } from '../../../services/driver';

const CustomerManager = () => {
  const [page, setPage] = useState(0);
  const [driverList, setDriverList] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newDriver, setNewDriver] = useState({});
  const [driverUpdate, setDriverUpdate] = useState({});
  const [idDriverDelete, setIdDriverUpdate] = useState('');
  const [driverCompare, setDriverCompare] = useState({});
  useEffect(() => {
    getAllDriver();
  }, [page]);

  const getAllDriver = async () => {
    let res = await fetchGetAllDriver();
    if (res && res.status === 'OK') {
      setDriverList(res.data);
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
    setIdDriverUpdate(id);
  };

  const handleShowUpdate = (user) => {
    setShowUpdate(true);
    setDriverUpdate(user);
    setDriverCompare(user);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleAddNewDriver = async () => {
    let { email, name, password, phone } = newDriver;
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
    console.log('new', newDriver);
    let res = await createDriver(newDriver);

    if (res.status === 'OK') {
      toast.success('Bạn đã thêm thành công!');
      getAllDriver();
      setNewDriver({});
      handleClose();
    } else {
      toast.error('Thêm thất bại!');
      handleClose();
    }
  };
  useLayoutEffect(() => {
    // Khi driverUpdate thay đổi, reset lại ảnh đại diện
    if (driverUpdate?.portrait) {
      setPreviewImage(driverUpdate.portrait);
    } else {
      setPreviewImage(''); // Reset ảnh khi không có portrait
    }
  }, [driverUpdate?.portrait]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(driverUpdate?.portrait);
  console.log('portrait', driverUpdate?.portrait);

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

  const handleUpdateDriver = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(driverUpdate));
    console.log('update', formData);
    if (driverUpdate !== driverCompare || file) {
      let res = await updateDriver(formData);
      if (res && res.status === 'OK') {
        toast.success('Bạn đã cập nhật thành công!');
        handleCloseUpdate();
        getAllDriver();
        setFile(null);
        setDriverUpdate({});
        setDriverCompare({});
      } else {
        handleClose();
        toast.error('Cập nhật thất bại!');
      }
    } else {
      toast.error('Bạn chưa thay đổi thông tin gì!');
    }
  };

  const handleDeleteUser = async () => {
    if (idDriverDelete) {
      let res = await deleteDriver(idDriverDelete);
      console.log('res', res);
      if (res.status === 'OK') {
        toast.success('Bạn đã xóa thành công!');
        handleDeleteClose();
        setIdDriverUpdate('');
        getAllDriver();
      } else {
        toast.error('Xóa thất bại!');
        handleDeleteClose();
        setIdDriverUpdate('');
      }
    }
  };

  const handleShowDetails = () => {
    //update sau
  };

  return (
    <div className='container-manage-driver'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Quản lý tài xế</h3>
            <button className='btn btn-primary' onClick={() => handleShow()}>
              + Thêm mới
            </button>
          </div>
          <div className='data'>
            {driverList && driverList?.length > 0 ? (
              <table className='table-manage-users'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>license</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {driverList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{new Date(item.driver_license_receipt_date).toLocaleDateString()}</td>
                        <td>
                          <button
                            className='btn btn-success details'
                            onClick={() => handleShowDetails(item)}
                          >
                            Xem chi tiết
                          </button>
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
        <Modal show={show} onHide={handleClose} className='modal-lg'>
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
                  value={newDriver.email}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
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
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
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
                  value={newDriver.password}
                  onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
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
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddNewDriver}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Modal update driver */}
      <Modal show={showUpdate} onHide={handleCloseUpdate} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật tài xế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <form onSubmit={handleUpdateDriver}>
              <div className='user-details' style={{ display: 'flex' }}>
                <div className='r' style={{ marginRight: '5rem' }}>
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
                <div className='l d-flex flex-wrap gap-4'>
                  <div className='l-info' style={{ width: '11.5rem' }}>
                    <label>Email:</label>
                    <input defaultValue={driverUpdate.email} readOnly />
                  </div>
                  <div className='l-info' style={{ width: '11.5rem' }}>
                    <label>Tên:</label>
                    <input
                      placeholder='Tên của bạn'
                      value={driverUpdate.name || ''}
                      onChange={(e) => setDriverUpdate({ ...driverUpdate, name: e.target.value })}
                    />
                  </div>
                  <div className='l-info' style={{ width: '11.5rem' }}>
                    <label>SĐT:</label>
                    <input
                      placeholder='Số điện thoại'
                      value={driverUpdate.phone || ''}
                      onChange={(e) => setDriverUpdate({ ...driverUpdate, phone: e.target.value })}
                    />
                  </div>
                  <div className='l-info' style={{ width: '11.5rem' }}>
                    <label>Địa chỉ:</label>
                    <input
                      placeholder='Địa chỉ'
                      value={driverUpdate.address || ''}
                      onChange={(e) =>
                        setDriverUpdate({ ...driverUpdate, address: e.target.value })
                      }
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
          <Button variant='primary' onClick={handleUpdateDriver}>
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
