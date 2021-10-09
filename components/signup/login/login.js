import { useState } from "react"
import styles from './login.module.css'
import Vector21 from '../vectors/vector21'
import Vector22 from '../vectors/vector22'
import Vector23 from '../vectors/vector23'
import BLT_Login2 from './group60/group60'
import LoginModal from "../../modals/loginModal";
export default function LeftToLogin() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.rec}>
            <div className={styles.welcome}>Welcome Back!</div>
            <div className={styles.start}>Start to record your research, log in with your MetaMask account!</div>
            <BLT_Login2
                style="cursor:pointer"
                onClick={() => setShowModal(true)}
                className={styles.group60}
            ></BLT_Login2>
            <Vector21></Vector21>
            <Vector22></Vector22>
            <Vector23></Vector23>
            <LoginModal show={showModal} onClose={() => setShowModal(false)}></LoginModal>
        </div>
    )
}