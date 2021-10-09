import { useState } from "react";
import styles1 from "./stepscreens1.module.css"
import styles2 from "./stepscreens2.module.css"
export default function RightStepScreens({ step }) {
    const two = 2 & step
    const one = 1 & step
    const [connected, setConnected] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit",e)

      };
      const handleReset = (e) => {
        e.preventDefault();
        console.log("handleReset",e)

      };
//自定義註冊帳號參考  https://www.oxxostudio.tw/articles/201905/firebase-simple-signup.html

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
                                        <div className={styles1.connecting}>Connecting to MetaMask...</div>
                                        <div className={styles1.img6}></div>
                                    </>
                                    :
                                    <>
                                        <div className={styles1.succ}>Successfully Connected</div>
                                        <div className={styles1.elli57}></div>
                                        <div className={styles1.vec17}></div>
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
                                <div className={styles2.personal}>Personal Information</div>
                                <form onSubmit={handleSubmit} onReset={handleReset}>
                                    <div>
                                    <input type="text" placeholder="ORCID ID" id="ORCIDid" name="ORCID ID" className={styles2.rec64}/>
                                    <input type="text" placeholder="Last Name" id="lastname" name="Last Name" className={styles2.rec65}/>
                                    <input type="text" placeholder="First Name" id="firstname" name="First Name" className={styles2.rec66}/>
                                    <input type="text" placeholder="Email" id="email" name="Email" className={styles2.rec67}/>
                                    <input type="text" placeholder="Password" id="password" name="Password" className={styles2.rec70}/>

                                    <input type="reset" value="Clear" className={styles2.rec21}/>
                                    <input type="submit" value="Submit" className={styles2.group87}/>
                                    </div>
                                </form>

                            </div>
                    )
            }
        </div>
    )
}
