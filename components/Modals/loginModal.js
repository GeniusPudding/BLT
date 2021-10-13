import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useState, useCallback, useEffect, useReducer } from "react";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import ReactDOM from "react-dom";
import styles from "./loginModal.module.css";
import initFirebase from "../../firebase/initFirebase";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors";

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

let web3Modal;
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
export default function LoginModal({ show, onClose, children }) {//onClose={() => setShowModal(false)}
  const app = initFirebase();
  if(app){console.log("app init:", app)}
  const auth = getAuth();
  auth.signOut()
  const [isBrowser, setIsBrowser] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("onAuthStateChanged user:",user)
      console.log("uid:",uid)
      // ...
    } else {
      console.log('sign out')
      // User is signed out
      // ...
    }
  });

  const loginBLT = (email,password)=>{
    console.log("login")
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("userCredential:",userCredential)
      console.log("user:",user)
      setLoginUser(user) 
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error:',error)
      console.log('errorCode:',errorCode)
      console.log('errorMessage:',errorMessage)
    });
  
  }

  const connect = useCallback(async function () {
    console.log('connecting...')
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });


  }, []);
  const disconnect = useCallback(
    async function () {
      console.log('disconnecting...')
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // accounts : string[]
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (accounts) => {
        //accounts : string[]
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleDisconnect = (error) => {
        //error : { code: number; message: string }
        // eslint-disable-next-line no-console
        console.log("disconnect error:", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // useEffect(()=>{
    
  // },[email])
  // useEffect(()=>{
  //   console.log('change email:',email)
  //   console.log('change password:',password)

  // },[email, password])
  useEffect(()=>{
    if(!loginUser==""){
      console.log('login blt user:',loginUser)
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwNTM4MmFlMTgxYWJlNjFiOTYwYjA1Yzk3ZmE0MDljNDdhNDQ0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmx0LWR4bnMiLCJhdWQiOiJibHQtZHhucyIsImF1dGhfdGltZSI6MTYzNDA5MTYyMSwidXNlcl9pZCI6Ik13TXBlQUkwcTJmeFJqcVNCY2tqbW44Q2N5aDEiLCJzdWIiOiJNd01wZUFJMHEyZnhSanFTQmNram1uOENjeWgxIiwiaWF0IjoxNjM0MDkxNjIxLCJleHAiOjE2MzQwOTUyMjEsImVtYWlsIjoiczM1Z2o2MDAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzMzVnajYwMDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.DdJdxpNFqcwmIXMNrGtBrPeLzrF2CD9W-hbnf8wjWbaC7pdSMiJhte86GOz_A1EIl8SAEZrS-4LtmlB7fsftLQUmaaTi2_M3yYbjiBIsaPK1isJKJGq7BSsrNxnrtttK8xXpjofpZfwMqFVy1GoF_olDSZrqeGqS4HtDdykaZNgcrqjF_is2KVaQk5M-LHch5SRUdDlP_U8khaUPnYKji14VF4uX7S1Ok2A3xhn751pcZW1YiO65fa225VXFBGL2f0SHz_Id6ZL3IaTOrHQFYsggzvd2LkksuJ-8jYvZ-Ihy_0PcYPREXf2pB3E_5wfvXUq6x01njC8pj6zJ7ZaUSQ"
      setIsConnecting(true);
    }

  }, [loginUser])

  useEffect(() => {
    console.log('isConnecting:',isConnecting)
    if (isConnecting) {
      // Then try to connect to metamask
      onClose();
      console.log("Connecting...");
      //  metaconnect()
      connect();
    } else {
      disconnect();
    }
  }, [isConnecting]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setIsConnecting(false);
    onClose();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsConnecting(false);
    console.log("handleLogin.target.elements.email", e.target.elements.email.value);
    console.log("handleLogin.target.elements.password", e.target.elements.password.value);
    // setEmail(e.target.elements.email.value)
    // setPassword(e.target.elements.password.value)
    loginBLT(e.target.elements.email.value,e.target.elements.password.value)
    
  };
  const handleTest = (e) => {
    e.preventDefault();
    console.log("handleTest", e);
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.rec61}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <button className={styles.btn}>Close</button>
          </a>
        </div>
        <div className={styles.welcome}>Welcome Back!</div>
        <div className={styles.start}>
          Start to record your research, log in with your MetaMask account!
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="email"
              className={styles.rec74}
              placeholder="email"
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              className={styles.rec75}
              placeholder="password"
            ></input>
          </div>
          <input type="reset" value="Clear" className={styles.recclean}/>
          <input
            className={styles.reclogin}
            type="submit"
            value="Login"
          ></input>
           
        </form>
       
        {/* <div className={styles.textclean}>Clean</div> */}

      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

// type StateType = {
//   provider?: any
//   web3Provider?: any
//   address?: string
//   chainId?: number
// }

// type ActionType =
//   | {
//       type: 'SET_WEB3_PROVIDER'
//       provider?: StateType['provider']
//       web3Provider?: StateType['web3Provider']
//       address?: StateType['address']
//       chainId?: StateType['chainId']
//     }
//   | {
//       type: 'SET_ADDRESS'
//       address?: StateType['address']
//     }
//   | {
//       type: 'SET_CHAIN_ID'
//       chainId?: StateType['chainId']
//     }
//   | {
//       type: 'RESET_WEB3_PROVIDER'
//     }

// const initialState: StateType = {
//   provider: null,
//   web3Provider: null,
//   address: null,
//   chainId: null,
// }
