import styles from "./step2.module.css"
export default function Step2({nextpage, handleSubmit}) {
    return(


        <div>
        <div className={styles.personal}>Personal Information</div>
        <form onSubmit={handleSubmit}>
            <div>
            <input type="text" placeholder="ORCID ID" id="ORCIDid" name="ORCID ID" className={styles.rec64}/>
            <input type="text" placeholder="Last Name" id="lastname" name="Last Name" className={styles.rec65}/>
            <input type="text" placeholder="First Name" id="firstname" name="First Name" className={styles.rec66}/>
            <input type="text" placeholder="Email" id="email" name="Email" className={styles.rec67}/>
            <input type="text" placeholder="Password" id="password" name="Password" className={styles.rec70}/>

            <input type="reset" value="Clear" className={styles.rec21}/>
            <input type="submit" value="Submit" className={styles.group87}/>
            </div>
        </form>

    </div>
    )

}