// import { useAlerts } from "@/components/common";
import { RootState } from "@/store";
import {
  addWallet,
  connectWallet,
  disconnectWallet,
} from "@/store/slice/walletsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
const useMetaMask = () => {
  const { walletsList } = useSelector((state: RootState) => state.walletsList);
  // const { addAlert } = useAlerts();
  const dispatch = useDispatch();
  const handleOpenAddWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      const accountsAddressArray = String(
        accounts[0].caveats[0].value
      ).toLowerCase();
      accountsAddressArray.split(",").map((address, index) => {
        const walletIndex = walletsList.findIndex(
          (item) => item.walletAddress === address
        );
        console.log(index, "address", address);
        const wallet = {
          id: v4(),
          walletAddress: address.toLowerCase(),
          walletType: "MetaMask",
          connectStatus: index === 0 ? true : false,
        };
        if (walletIndex === -1) {
          dispatch(addWallet(wallet));
        } else {
          dispatch(
            index === 0 ? connectWallet(address) : disconnectWallet(address)
          );
        }
      });
    } catch (err: any) {
      console.log(err);
      // addAlert({
      //   message: `${err?.message || err}`,
      //   type: "warning",
      // });
    }
  };
  return { handleOpenAddWallet };
};

export default useMetaMask;
