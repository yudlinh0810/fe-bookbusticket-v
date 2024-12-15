import { Link } from 'react-router-dom';
import './AdminHeader.scss';
import useUserStore from '../../stores/UserStore';

const AdminHeader = () => {
  const { user } = useUserStore();
  return (
    <div className='admin-header-container'>
      <div className='left'>
        <i className='fa-solid fa-car-side'></i>
        <Link to={'/'} style={{ fontSize: '2rem', textDecoration: 'none' }}>
          Vexetienich
        </Link>
      </div>
      <div className='right'>
        <span style={{ fontSize: '1.4rem' }}>Hello {user.name}</span>
        <i className='fa-solid fa-right-from-bracket'></i>
      </div>
    </div>
  );
};

export default AdminHeader;
