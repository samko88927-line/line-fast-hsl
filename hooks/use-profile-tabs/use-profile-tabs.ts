import { create } from "zustand";

export enum TabEnum {
  setting = "setting",
  myProduct = "myProduct",
  myWallet = "myWallet",
  myReebokNft = "myReebokNft",
  myOrder = "myOrder",
  language = "language",
  logout = "logout",
}

interface ProfileTabsStore {
  tab: TabEnum;
  changeTab: (data: TabEnum) => void;
}

const useProfileTabs = create<ProfileTabsStore>((set) => ({
  tab: TabEnum.setting,
  changeTab: (data: TabEnum) => set({ tab: data }),
}));

export default useProfileTabs;
