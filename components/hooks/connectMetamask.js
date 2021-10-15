import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useState, useEffect, useReducer } from "react";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

export let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}
const initialState = {
  //= StateType =
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};
//function reducer(state: StateType, action: ActionType): StateType {
function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}
export default function useConnectMetamask() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}

export async function connectMetamask() {
  console.log("connecting...");
  // This is the initial `provider` that is returned when
  // using web3Modal to connect. Can be MetaMask or WalletConnect.
  const provider = await web3Modal.connect();

  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();
  const address = await signer.getAddress();
  const accounts = await web3Provider.listAccounts();
  const block = await web3Provider.getBlock(11163610);
  console.log("block:", block);
  console.log("accounts:", accounts);
  const balance = await web3Provider.getBalance(address);
  const network = await web3Provider.getNetwork();

  console.log("signer:", signer);
  console.log("address:", address);
  console.log("balance:", balance);
  console.log("network:", network);
  return network

}
export async function disconnectMetamask(provider) {
    console.log("disconnecting...");
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }
    
}
