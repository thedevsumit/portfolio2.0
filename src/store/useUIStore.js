import { create } from 'zustand'

export const useUIStore = create((set) => ({
  appReady: false,
  setAppReady: (v) => set({ appReady: v }),

  mobileMenuOpen: false,
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  activeProject: null,
  setActiveProject: (id) => set({ activeProject: id }),

  hoveredSkill: null,
  setHoveredSkill: (s) => set({ hoveredSkill: s }),

  hoveredChessPiece: null,
  setHoveredChessPiece: (p) => set({ hoveredChessPiece: p }),

  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),

  contactSent: false,
  setContactSent: (v) => set({ contactSent: v }),
}))
