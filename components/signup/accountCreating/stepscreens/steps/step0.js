import styles from "./step0.module.css"
import Link from 'next/link';    

export default function Step0({nextpage}) {

    const handleNext = (e) => {
        e.preventDefault();
        console.log("handleNext.target:",e.target)
        nextpage()
     };
     const handleInstall = (e) => {
        e.preventDefault();
        console.log("handleInstall.target:",e.target)
        window.open ('https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn', "_blank")

     };

    return(


        <div>
            <div className={styles.install}>Install a MetaMesk plugin on your Chrome</div>
            <div className={styles.set}>Set up your MetaMesk account on MetaMask Plugin</div>

            <button onClick={handleInstall} className={styles.group85}>install plugin</button>
            <button onClick={handleNext} className={styles.group86}>Next</button>
        </div>
    )

}