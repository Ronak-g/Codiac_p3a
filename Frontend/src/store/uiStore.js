import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  activePanel: 'dashboard',
  setActivePanel: (panel) => set({ activePanel: panel }),
}));