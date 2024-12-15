import { vnPayAPI } from './CustomizeAxios';

const createPayment = (data) => {
  return vnPayAPI.post(`/order/create_payment_url`, data);
};

export { createPayment };
