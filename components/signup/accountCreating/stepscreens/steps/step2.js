import styles from "./step2.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initFirebase from '../../../../../firebase/initFirebase'
export default function Step2({nextpage, setCuruser}) {
    const app = initFirebase()
    if(app){console.log("app init:", app)}
    const auth = getAuth();
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
            nextpage()
        })

        nextpage()

      };

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