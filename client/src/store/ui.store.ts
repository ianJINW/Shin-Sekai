import { create } from 'zustand';

interface UIState {
  sidebar: boolean,
  toggleSidebar: () => void,
  isDark: boolean,
  darkToggle: () => void
}

const useUIStore = create<UIState>()(
  set => ({
    sidebar: false,
    toggleSidebar: () => set(s => ({ sidebar: !s.sidebar })),
    isDark: false,
    darkToggle: () => set(s => ({ isDark: !s.isDark }))
  })
)

export default useUIStore