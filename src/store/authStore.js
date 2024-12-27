import { create } from 'zustand';

const useAuthStore = create((set) => ({
       isLoggedIn : localStorage.getItem("access"),
       changeLoggedInStatus : () => set((state) => ({isLoggedIn : !state.isLoggedIn}))
}));

export default useAuthStore;
