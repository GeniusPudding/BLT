import styles from './accoutCreating.module.css'
import { useState } from 'react'
import Progress from './progress/progress'
export default function LeftAccountCreating({ step, hasMM }) {
    // const [step, setStep] = useState(0)


    return (
        <div className={styles.rec}>
            <div className={styles.create}>Create New Account</div>
            <div className={styles.blt}>BLT use MetaMask wallet to connect Ethereum, which is a trustworthy blockchain that your research data can be stored safely.</div>
            <Progress step={step} hasMM={hasMM}></Progress>
        </div>
    )
}