import { useState } from 'react';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import SidebarAdmin from '../../../components/SidebarAdmin/SidebarAdmin';
import './CarManager.scss';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCar, getCars } from '../../../services/Car';

const CarManager = () => {
  const [page, setPage] = useState(0);
  const [listCar, setListCar] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [idCarDelete, setIdCarDelete] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    getAllCar();
  }, [page]);

  const getAllCar = async () => {
    let res = await getCars();
    if (res && res.status === 'OK') {
      setListCar(res);
    }
  };

  const handleCreateCar = () => {
    navigation('/admin/car-manager/create');
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setIdCarDelete(id);
  };

  const handleDeleteCar = async () => {
    if (idCarDelete) {
      console.log('id', idCarDelete);
      const res = await deleteCar(idCarDelete);
      if (res.status === 'OK') {
        toast.success('Bạn đã xóa thành công');
        handleDeleteClose();
        setIdCarDelete('');
        getAllCar();
      } else {
        toast.error('Xóa thất bại');
        handleDeleteClose();
        setIdCarDelete('');
        getAllCar();
      }
    }
  };

  const handleUpdateCar = (car) => {
    navigation('/admin/car-manager/update', { state: car });
  };

  const handleDetailCar = (car) => {
    navigation('/admin/car-manager/details', { state: car });
  };

  const handlePageClick = (e) => {
    if (e) {
      setPage(e.selected);
    }
  };

  return (
    <div className='container-manage-car'>
      <AdminHeader />
      <div className='content'>
        <SidebarAdmin />
        <div className='right'>
          <div className='top'>
            <h3>Quản lý xe</h3>
            <button className='btn btn-primary' onClick={() => handleCreateCar()}>
              + Thêm mới
            </button>
          </div>
          <div className='data'>
            {listCar && listCar?.data?.length > 0 ? (
              <table className='table-manage-users'>
                <thead>
                  <tr>
                    <th>Tên xe</th>
                    <th>Hình ảnh</th>
                    <th>Loại xe</th>
                    <th>Số chỗ ngồi</th>
                    <th>Biển số xe</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listCar?.data?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.car_name}</td>
                        <td>
                          {item.image ? (
                            <img src={item.image} width={'100px'} height={'100px'} alt='ảnh xe' />
                          ) : (
                            ''
                          )}
                        </td>
                        <td>{item.type}</td>
                        <td>{item.seat_count}</td>
                        <td>{item.license_plate}</td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            className='btn btn-primary update'
                            onClick={() => handleDetailCar(item)}
                          >
                            Chi tiết
                          </button>
                          <button
                            className='btn btn-warning update'
                            onClick={() => handleUpdateCar(item)}
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
      {/* Modal delete user */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <span>Bạn có chắc chắn xóa chiếc xe này?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteCar}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CarManager;
