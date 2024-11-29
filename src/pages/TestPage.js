import React, { useEffect, useState } from 'react';
import { bookBusTicketAPI } from '../services/CustomizeAxios';

const TestPage = () => {
  const [busData, setBusData] = useState([]);

  // Hàm gọi API
  const fetchBusData = async () => {
    try {
      const data = await bookBusTicketAPI.get('/'); // Gọi API
      console.log('API Data:', data); // Kiểm tra dữ liệu trả về
      setBusData(data.flat()); // Lưu dữ liệu vào state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBusData(); // Gọi API khi component mount
  }, []);
  return (
    <div>
      <h1>Danh sách xe Limousine</h1>
      {busData.length === 0 ? (
        <p>Không có dữ liệu.</p>
      ) : (
        busData.map((bus, index) => (
          <div key={index}>
            <h3>
              {bus.name} ({bus.position})
            </h3>
            <p>Vị trí: {bus.position}</p>
            <p>Biển số xe: {bus.license_plate}</p>
            <p>Địa điểm: {bus.location}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default TestPage;
