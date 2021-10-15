// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { providers } from "ethers";
import { useState, useCallback, useEffect, useReducer } from "react";
// import WalletLink from "walletlink";
// import Web3Modal from "web3modal";
import ReactDOM from "react-dom";
import styles from "./loginModal.module.css";
import initFirebase from "../../firebase/initFirebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import { useWeb3React } from "@web3-react/core";
// import { injected } from "../wallet/connectors";
import useConnectMetamask, {
  web3Modal,
  connectMetamask,
  disconnectMetamask,
} from "../hooks/connectMetamask";

export default function LoginModal({ show, onClose, setIsLogin }) {
  //onClose={() => setShowModal(false)}
  const app = initFirebase();
  if (app) {
    console.log("app init:", app);
  }
  const auth = getAuth();
  auth.signOut();
  const [isBrowser, setIsBrowser] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false); //Now is connecting to metamask
  const [loginUser, setLoginUser] = useState("");
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useConnectMetamask();
  const { provider, web3Provider, address, chainId } = state;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("onAuthStateChanged auth:", auth);
      console.log("onAuthStateChanged user:", user);
      console.log("uid:", uid);
      // ...
    } else {
      console.log("onAuthStateChanged sign out");
      // User is signed out
      // ...
    }
  });

  const loginBLT = (email, password) => {
    console.log("login");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("userCredential:", userCredential);
        console.log("user:", user);
        setLoginUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error:", error);
        console.log("errorCode:", errorCode);
        console.log("errorMessage:", errorMessage);
      });
  };

  const connect = useCallback(async () => {
    const [provider,web3Provider, address, network]  = await connectMetamask();

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });
  }, []);

  //DEBUG: not disconnecting?
  const disconnect = useCallback(
    async  (provider)=> {
      await disconnectMetamask(provider)
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  useEffect(() => {
    console.log("test address:", address);
    console.log("test chainId:", chainId);
    if (address && loginUser) {
      setIsLogin(true);
    }
  }, [address]);

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

  useEffect(() => {
    if (!loginUser == "") {
      console.log("login blt user:", loginUser);
      setIsConnecting(true); //login blt, and then connect to metamask
    }
  }, [loginUser]);

  useEffect(() => {
    console.log("isConnecting:", isConnecting);
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
    setIsConnecting(false); // how to set this when metamask modal closed?
    console.log(
      "handleLogin.target.elements.email",
      e.target.elements.email.value
    );
    console.log(
      "handleLogin.target.elements.password",
      e.target.elements.password.value
    );
    // setEmail(e.target.elements.email.value)
    // setPassword(e.target.elements.password.value)
    loginBLT(e.target.elements.email.value, e.target.elements.password.value);
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
          <input type="reset" value="Clear" className={styles.recclean} />
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
