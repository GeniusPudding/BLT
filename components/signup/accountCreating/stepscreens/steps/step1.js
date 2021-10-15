import styles from "./step1.module.css"
export default function Step1({nextpage, connected}) {
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