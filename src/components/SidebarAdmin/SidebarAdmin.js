import './SidebarAdmin.scss';
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className='side-bar'>
      <ul className='list'>
        <li className='item'>
          <NavLink to='/admin'>
            <i className='fa-solid fa-house'></i>
            <span>Quy định</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink
            to='/admin/manage-customer'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className='fa-regular fa-user'></i>
            <span>Người dùng</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink
            to='/admin/manage-driver'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className='fa-solid fa-user'></i>
            <span>Tài xế</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink to='/admin/manage-car' className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className='fa-solid fa-car'></i>
            <span>Xe</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink to='/admin/manage-trip'>
            <i className='fa-solid fa-car'></i>
            <span>Chuyến xe</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink to='/admin/manage-ticket'>
            <i className='fa-solid fa-car'></i>
            <span>vé xe</span>
          </NavLink>
        </li>
        <li className='item'>
          <NavLink to='/admin/statistics'>
            <i className='fa-solid fa-dollar-sign'></i>
            <span>Thống kê</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
