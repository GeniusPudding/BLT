import styles from "./group60.module.css";

export default function BLT_Login2({ onClick }) {
  return (
    <button onClick={onClick}>
      <div className={styles.rec}></div>
      <div className={styles.text}>Login</div>
    </button>
  );
}
