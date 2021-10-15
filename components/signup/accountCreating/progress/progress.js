import { has } from "mobx"
import styles from "./progress.module.css"
export default function Progress({ step, hasMM }) {
    return (
        <>
            {
                !hasMM?
                <div className={styles.group81}>Create your MetaMask account</div>
                :null
            }
            <div className={styles.group82}>Connected to MetaMask</div>
            <div className={styles.group83}>Create your BLT Account</div>
            <div className={styles.group84}>Start to research with BLT</div>
        </>
    )
}