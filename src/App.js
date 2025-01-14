import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home/HomePage';
import Login from './components/Information/LoginAndRegister/LoginAndRegitser';
import { ToastContainer } from 'react-toastify';
import VerifyOTP from './components/Information/VerifyOTP/VerifyOTP';
import UserProfile from './components/Information/UserProfile/UserProfile';
import SearchTrip from './pages/SearchTripPage/SearchTripPage';
import DetailsTrip from './pages/DetailsTrip/DetailsTrip';
import Admin from './pages/Admin/Admin';
import CustomerManager from './pages/Admin/CustomerManager/CustomerManager';
import DriverManager from './pages/Admin/DriverManager/DriverManager';
import StaffLogin from './pages/Admin/StaffLogin/StaffLogin';
import CarManager from './pages/Admin/CarManager/CarManager';
import DetailCar from './pages/Admin/CarManager/DetailCar/DetailCar';
import CreateCar from './pages/Admin/CarManager/CreateCar/CreateCar';
import UpdateCar from './pages/Admin/CarManager/UpdateCar/UpdateCar';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';

function App() {
  const updateClientWidth = () => {
    const clientWidth = document.documentElement.clientWidth;
    console.log('width', clientWidth);
    document.documentElement.style.setProperty('--client-width', `${clientWidth}px`);
  };
  // const debouncedUpdateClientWidth = debounce(updateClientWidth, 200);
  useEffect(() => {
    updateClientWidth();
    window.addEventListener('resize', updateClientWidth);
    return () => window.removeEventListener('resize', updateClientWidth);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-register' element={<Login />} />
        <Route path='/verify-email' element={<VerifyOTP />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/search-trip' element={<SearchTrip />} />
        <Route path='/details-trip' element={<DetailsTrip />} />
        {/* Admin */}
        <Route path='/staff-login' element={<StaffLogin />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/customer-manager' element={<CustomerManager />} />
        <Route path='/admin/driver-manager' element={<DriverManager />} />
        {/*  */}
        <Route path='/admin/car-manager' element={<CarManager />} />
        <Route path='/admin/car-manager/details' element={<DetailCar />} />
        <Route path='/admin/car-manager/create' element={<CreateCar />} />
        <Route path='/admin/car-manager/update' element={<UpdateCar />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Router>
  );
}
export default App;
