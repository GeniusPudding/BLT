import styles from "./create.module.css";
export default function RightToCreate({ toCreate }) {
  return (
    <div>
      <div className={styles.new}>Create New Account</div>
      <div className={styles.blt}>
        BLT use MetaMask wallet to connect Ethereum, which is a trustworthy
        blockchain that your research data can be stored safely.
      </div>
      <button onClick={()=>{toCreate(false)}} className={styles.rec62}></button>
      <img className={styles.img7}></img>
      <div className={styles.no}>I don’t have a MetaMask account</div>

      <button onClick={()=>{toCreate(true)}} className={styles.rec63}></button>
      <img className={styles.img5}></img>
      <div className={styles.yes}>I’ve already had a MetaMask Account!</div>

      <div className={styles.what}>What is Metamask?</div>
    </div>
  );
}
