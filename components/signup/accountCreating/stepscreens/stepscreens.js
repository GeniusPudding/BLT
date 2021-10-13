import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initFirebase from '../../../../firebase/initFirebase'
import Step0 from "./steps/step0"
import Step1 from "./steps/step1"
import Step2 from "./steps/step2"
import Step3 from "./steps/step3"   


export default function RightStepScreens({ step, setStep }) {
    const app = initFirebase()
    if(app){console.log("app init:", app)}
    const auth = getAuth();

    const two = 2 & step
    const one = 1 & step
    const [connected, setConnected] = useState(true)//For metamask
    const [curUser, setCuruser] = useState({}) //For blt


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit.target.elements:",e.target.elements)
        // let ORCIDid = e.target.elements['ORCIDid'].value
        // let lastname = e.target.elements['lastname'].value
        // let firstname = e.target.elements['firstname'].value
        let email = e.target.elements['email'].value
        let password = e.target.elements['password'].value
        

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user    
          console.log('userCredential.user:',user)
          setCuruser(user)
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error:',errorCode,errorMessage)
        }).then(()=>{
            console.log("After register blt account!")
            setStep(3)
        })

        


      };


    return (
        <div >
            {
                !two ?
                    (
                        !!one ?
                            //step 1
                            <Step1 connected={connected}></Step1>
                            :
                            //step 0
                            <Step0></Step0>
                    )
                    :
                    (
                        !!one ?
                            //step 3
                            <Step3></Step3>
                            :
                            //step 2
                            <Step2 handleSubmit={handleSubmit}></Step2>

                    )
            }
        </div>
    )
}
