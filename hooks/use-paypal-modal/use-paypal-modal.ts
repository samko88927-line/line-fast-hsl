import { create } from "zustand";

interface PaypalModalStore {
  isOpen: boolean;
  data?: any;
  onOpen: (data: any) => void;
  onClose: () => void;
}

const usePaypalModal = create<PaypalModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: any) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePaypalModal;
