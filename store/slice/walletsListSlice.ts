import { createSlice } from "@reduxjs/toolkit";

export type WalletsListType = {
  id: string;
  walletAddress: string;
  walletType: "MetaMask" | "WalletConnect";
  connectStatus: boolean;
}[];

const walletsListSlice = createSlice({
  name: "walletsList",
  initialState: {
    walletsList: <WalletsListType>[],
  },
  reducers: {
    connectWallet: (state, action) => {
      let index = state.walletsList.findIndex(
        (item) => item.walletAddress == action.payload
      );
      state.walletsList[index] = {
        ...state.walletsList[index],
        connectStatus: true,
      };
    },
    disconnectWallet: (state, action) => {
      // state.walletsList.push(action.payload);
      let index = state.walletsList.findIndex(
        (item) => item.walletAddress == action.payload
      );
      state.walletsList[index] = {
        ...state.walletsList[index],
        connectStatus: false,
      };
    },
    addWallet: (state, action) => {
      state.walletsList.push(action.payload);
    },
    removeWallet: (state, action) => {
      state.walletsList = state.walletsList.filter(
        (item) => item.walletAddress !== action.payload
      );
    },
  },
});
export const { addWallet, removeWallet, disconnectWallet, connectWallet } =
  walletsListSlice.actions;
export const walletsListReducer = walletsListSlice.reducer;
