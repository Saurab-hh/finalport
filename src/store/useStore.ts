import { create } from 'zustand';

export interface AppType {
  id: string;
  title: string;
  icon: any; // Can be a lucide component
}

export interface WindowState {
  instanceId: string;
  appId: string;
  title: string;
  icon: any;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface Windows11Store {
  windows: WindowState[];
  activeWindowId: string | null;
  startMenuOpen: boolean;
  widgetsOpen: boolean;
  searchMenuOpen: boolean;
  quickSettingsOpen: boolean;
  maxZIndex: number;
  wallpaperIndex: number;
  
  toggleStartMenu: () => void;
  toggleWidgets: () => void;
  toggleSearchMenu: () => void;
  toggleQuickSettings: () => void;
  closeAllMenus: () => void;
  closeStartMenu: () => void;
  nextWallpaper: () => void;
  
  openApp: (app: AppType) => void;
  closeApp: (instanceId: string) => void;
  toggleMinimizeApp: (instanceId: string) => void;
  toggleMaximizeApp: (instanceId: string) => void;
  focusApp: (instanceId: string) => void;
}

export const useStore = create<Windows11Store>((set, get) => ({
  windows: [],
  activeWindowId: null,
  startMenuOpen: false,
  widgetsOpen: false,
  searchMenuOpen: false,
  quickSettingsOpen: false,
  maxZIndex: 10,
  wallpaperIndex: 0,

  toggleStartMenu: () => set((state) => ({ 
    startMenuOpen: !state.startMenuOpen,
    widgetsOpen: false,
    searchMenuOpen: false,
    quickSettingsOpen: false
  })),
  toggleWidgets: () => set((state) => ({ 
    widgetsOpen: !state.widgetsOpen,
    startMenuOpen: false,
    searchMenuOpen: false,
    quickSettingsOpen: false
  })),
  toggleSearchMenu: () => set((state) => ({
    searchMenuOpen: !state.searchMenuOpen,
    startMenuOpen: false,
    widgetsOpen: false,
    quickSettingsOpen: false
  })),
  toggleQuickSettings: () => set((state) => ({
    quickSettingsOpen: !state.quickSettingsOpen,
    startMenuOpen: false,
    searchMenuOpen: false,
    widgetsOpen: false
  })),
  closeAllMenus: () => set({ startMenuOpen: false, widgetsOpen: false, searchMenuOpen: false, quickSettingsOpen: false }),
  closeStartMenu: () => set({ startMenuOpen: false, widgetsOpen: false, searchMenuOpen: false, quickSettingsOpen: false }),
  nextWallpaper: () => set((state) => ({ wallpaperIndex: (state.wallpaperIndex + 1) % 10 })),

  openApp: (app: AppType) => {
    const { windows, maxZIndex } = get();
    // Check if app is already open
    const existingWindow = windows.find((w) => w.appId === app.id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map(w => w.instanceId === existingWindow.instanceId ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w),
          activeWindowId: existingWindow.instanceId,
          maxZIndex: maxZIndex + 1,
          startMenuOpen: false,
          searchMenuOpen: false,
          quickSettingsOpen: false,
        });
      } else {
        set({
          windows: windows.map(w => w.instanceId === existingWindow.instanceId ? { ...w, zIndex: maxZIndex + 1 } : w),
          activeWindowId: existingWindow.instanceId,
          maxZIndex: maxZIndex + 1,
          startMenuOpen: false,
          quickSettingsOpen: false,
        });
      }
      return;
    }

    // Open new instance
    const newZIndex = maxZIndex + 1;
    const newWindow: WindowState = {
      instanceId: `win-${Date.now()}`,
      appId: app.id,
      title: app.title,
      icon: app.icon,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: newWindow.instanceId,
      maxZIndex: newZIndex,
      startMenuOpen: false,
      searchMenuOpen: false,
      widgetsOpen: false,
      quickSettingsOpen: false
    });
  },

  closeApp: (instanceId: string) => set((state) => ({
    windows: state.windows.filter((w) => w.instanceId !== instanceId),
    activeWindowId: state.activeWindowId === instanceId ? null : state.activeWindowId
  })),

  toggleMinimizeApp: (instanceId: string) => set((state) => {
    const isMinimizing = !state.windows.find(w => w.instanceId === instanceId)?.isMinimized;
    return {
      windows: state.windows.map(w => w.instanceId === instanceId ? { ...w, isMinimized: isMinimizing } : w),
      activeWindowId: isMinimizing ? null : instanceId
    };
  }),

  toggleMaximizeApp: (instanceId: string) => set((state) => ({
    windows: state.windows.map(w => w.instanceId === instanceId ? { ...w, isMaximized: !w.isMaximized } : w)
  })),

  focusApp: (instanceId: string) => {
    const currentActive = get().activeWindowId;
    if (currentActive === instanceId) return;
    
    const newZIndex = get().maxZIndex + 1;
    set((state) => ({
      windows: state.windows.map(w => w.instanceId === instanceId ? { ...w, zIndex: newZIndex } : w),
      activeWindowId: instanceId,
      maxZIndex: newZIndex,
      startMenuOpen: false,
      searchMenuOpen: false,
      widgetsOpen: false,
      quickSettingsOpen: false
    }));
  }
}));
