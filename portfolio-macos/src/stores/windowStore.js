import { create } from 'zustand';

export const useWindowStore = create((set, get) => ({
  openWindows: [],
  minimizedWindows: [],
  activeWindowId: null,
  bootState: 'booting', // 'booting', 'logo', 'desktop'
  
  openWindow: (windowId) => set((state) => {
    if (state.openWindows.includes(windowId)) {
      return { activeWindowId: windowId };
    }
    return { 
      openWindows: [...state.openWindows, windowId],
      activeWindowId: windowId,
      minimizedWindows: state.minimizedWindows.filter(id => id !== windowId)
    };
  }),
  
  closeWindow: (windowId) => set((state) => ({
    openWindows: state.openWindows.filter(id => id !== windowId),
    minimizedWindows: state.minimizedWindows.filter(id => id !== windowId),
    activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId
  })),
  
  minimizeWindow: (windowId) => set((state) => ({
    minimizedWindows: [...state.minimizedWindows, windowId],
    activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId
  })),
  
  setActiveWindow: (windowId) => set({ activeWindowId: windowId }),
  
  setBootState: (state) => set({ bootState: state }),
}));

export const useMetricsStore = create((set) => ({
  uniqueVisitors: 0,
  pageViews: 0,
  sessionDuration: 0,
  
  incrementVisitor: () => set((state) => ({ 
    uniqueVisitors: state.uniqueVisitors + 1,
    pageViews: state.pageViews + 1 
  })),
  
  incrementPageView: () => set((state) => ({ pageViews: state.pageViews + 1 })),
  
  updateSessionDuration: (duration) => set({ sessionDuration: duration }),
}));

export const useSpotifyStore = create((set) => ({
  currentSong: null,
  isPlaying: false,
  playlist: [],
  
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentSong: (song) => set({ currentSong: song }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stopPlayback: () => set({ isPlaying: false, currentSong: null }),
}));
