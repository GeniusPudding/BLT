import styles from "./step1.module.css"
import { useEffect, useCallback } from "react";
import useConnectMetamask, {
    connectMetamask,
    disconnectMetamask,
  } from "../../../../hooks/connectMetamask";
export default function Step1({nextpage, connected, setConnected}) {
    const [state, dispatch] = useConnectMetamask();
    // const { provider, web3Provider, address, chainId } = state;
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
    useEffect(async()=>{
        await connect()
        setConnected(true)
    },[])
    useEffect(()=>{
        console.log('step1 state:',state)
    },[state])
    useEffect(()=>{
        if(connected){
            setTimeout(nextpage, 1500);
        }
    },[connected])
    return(
        !connected ?
        <>
            <div className={styles.connecting}>Connecting to MetaMask...</div>
            <div className={styles.img6}></div>
        </>
        :
        <>
            <div className={styles.succ}>Successfully Connected</div>
            <div className={styles.elli57}></div>
            <div className={styles.vec17}></div>
        </>
    )

}