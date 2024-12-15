import './StaffLogin.scss';
import Header from '../../../components/Header/Header';
import DropWater from '../../../components/Animations/DropWater/DropWater';
import { fetchCustomer } from '../../../services/Customer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/UserStore';
import { fetchStaff, staffLogin } from '../../../services/Staff';

const StaffLogin = () => {
  const { user, setUser } = useUserStore();
  console.log('staff', user);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await staffLogin(data);
      if (res.status === 'OK') {
        localStorage.setItem('access_token', res.access_token);
        const data = await fetchStaff(res.access_token);
        console.log('data', data);
        const details = {
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          day_birth: data.day_birth,
          address: data.address,
          portrait: data.portrait,
          public_img_id: data.public_img_id,
          role_id: data.role_id,
          status_id: data.status_id,
        };
        setUser(details);
        toast.success('Đăng nhập thành công');
        navigate('/');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.log('ERR 46', error);
    }
  };

  return (
    <>
      <DropWater>
        <Header />
        <div className='full'>
          <div id='r-l-container'>
            <div className='form-container sign-in'>
              <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                <input className='lg-input' type='email' name='email' placeholder='Email' />
                <input
                  className='lg-input'
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <a href='/'>Forget Your Password?</a>
                <button className='lg-button' type='submit'>
                  Sign In
                </button>
              </form>
            </div>
            <div className='toggle-container'>
              <div className='toggle'>
                <div className='toggle-panel toggle-left'>
                  <button className='lg-button hidden'>Sign In</button>
                </div>
                <div className='toggle-panel toggle-right'>
                  <h1>Hello, Friend!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropWater>
    </>
  );
};

export default StaffLogin;
