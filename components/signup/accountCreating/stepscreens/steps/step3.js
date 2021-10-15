import styles from "./step3.module.css"
export default function Step3({nextpage}) {


    const handleStart = (e) => {
        e.preventDefault();
        console.log("handleStart.target:",e.target)
        nextpage()
     };
    return(


        <div>
            <button onClick={handleStart} className={styles.rec20}>
                Start
            </button>
        </div>
    )

}