import { getIntroData } from "../lib/signup";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LeftToLogin from "../components/signup/login/login"
import RightToCreate from "../components/signup/create/create"
import LeftAccountCreating from '../components/signup/accountCreating/accoutCreating'
import RightStepScreens from '../components/signup/accountCreating/stepscreens/stepscreens'

import styles from "../styles/pages/signup.module.css";

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
  const [step, setStep] = useState(2);// hasMM: 1->2->3, no hasMM: 0->1->2->3

  const toCreate = (hasMM) => {
    setCreate(true)
    console.log('hasMM:', hasMM)
    if (!hasMM) {
      setHasMM(false)
    }
  }

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
