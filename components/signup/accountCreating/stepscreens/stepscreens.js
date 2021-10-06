import { useState } from "react";
import styles from "./stepscreens.module.css"
export default function RightStepScreens({ step }) {
    const two = 2 & step
    const one = 1 & step
    const [connected, setConnected] = useState(true)

    return (
        <div >
            {
                !two ?
                    (
                        !!one ?
                            //step 1
                            (
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
                            :
                            //step 0
                            <div>0</div>
                    )
                    :
                    (
                        !!one ?
                            //step 3
                            <div>3</div>
                            :
                            //step 2
                            <div>
                                <div className={styles.personal}>Personal Information</div>

                            </div>
                    )
            }
        </div>
    )
}
