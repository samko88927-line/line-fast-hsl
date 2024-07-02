import { create } from "zustand";

interface BuyingModalStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data: any) => void;
  onClose: () => void;
}

const useBuyingModal = create<BuyingModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: any) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useBuyingModal;
