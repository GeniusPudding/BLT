import styles from "./group59.module.css";
import Link from "next/link";
export default function BLT_SignUp() {
  return (
    <Link href="/signup">
      <a>
        <div className={styles.rec}></div>
        <div className={styles.text}>Sign up</div>
      </a>
    </Link>
  );
}
