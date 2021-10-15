import { useState } from "react";


import Step0 from "./steps/step0"
import Step1 from "./steps/step1"
import Step2 from "./steps/step2"
import Step3 from "./steps/step3"   


export default function RightStepScreens({ step, setStep }) {


    const two = 2 & step
    const one = 1 & step
    const [connected, setConnected] = useState(false)//For metamask
    const [curUser, setCuruser] = useState({}) //For blt


    return (
        <div >
            {
                !two ?
                    (
                        !!one ?
                            //step 1
                            <Step1 nextpage={()=>{setStep(2)}} connected={connected} setConnected={setConnected}></Step1>
                            :
                            //step 0
                            <Step0 nextpage={()=>{setStep(1)}}></Step0>
                    )
                    :
                    (
                        !!one ?
                            //step 3
                            <Step3 nextpage={()=>{setStep(4)}}></Step3>
                            :
                            //step 2
                            <Step2 nextpage={()=>{setStep(3)}} setCuruser={setCuruser}></Step2>

                    )
            }
        </div>
    )
}
