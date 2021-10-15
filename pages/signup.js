import { getIntroData } from "../lib/signup";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LeftToLogin from "../components/signup/login/login"
import RightToCreate from "../components/signup/create/create"
import LeftAccountCreating from '../components/signup/accountCreating/accoutCreating'
import RightStepScreens from '../components/signup/accountCreating/stepscreens/stepscreens'

import styles from "../styles/pages/signup.module.css";
import Router from 'next/router'

// For Static Generation, export "getStaticProps" (getStaticProps can only be exported from a page)
export async function getStaticProps() {
  const allPostsData = getIntroData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function SignUp({ allPostsData }) {
  const [create, setCreate] = useState(false);
  const [hasMM, setHasMM] = useState(true);
  const [step, setStep] = useState(1);// hasMM: 1->2->3, no hasMM: 0->1->2->3

  const toCreate = (hasMM) => {
    if(!hasMM){
      setStep(0)
    }
    console.log('has MetaMask:', hasMM)
    setHasMM(hasMM)
    setCreate(true)

  }

  useEffect(()=>{
    if(step>=4){
      //TODO: use previous created account to login blt 

      Router.push('/dashboard') 
      // setStep(1)
    }

  },[step])

  return (
    <div className={styles.signup}>
      {
        !create ?
          <>
            <LeftToLogin></LeftToLogin>
            <RightToCreate toCreate={toCreate}></RightToCreate>
          </>
          :
          <>
            <LeftAccountCreating step={step} hasMM={hasMM}></LeftAccountCreating>
            <RightStepScreens step={step} setStep={setStep}></RightStepScreens>
          </>
      }
    </div>
  )
}
