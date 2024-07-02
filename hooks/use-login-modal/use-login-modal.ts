import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data: any) => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: any) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
