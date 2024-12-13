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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-register' element={<Login />} />
        <Route path='/verify-email' element={<VerifyOTP />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/search-trip' element={<SearchTrip />} />
        <Route path='/details-trip' element={<DetailsTrip />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={1000}
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
