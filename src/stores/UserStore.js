import { create } from 'zustand';
import Cookies from 'js-cookie';

const useUserStore = create((set) => ({
  user: JSON.parse(Cookies.get('user') || null),
  setUser: (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); //hết hạn sau 7 ngày
    set({ user });
  },
  clearUser: () => {
    Cookies.remove('user');
    set({ user: null });
  },
}));

export default useUserStore;
