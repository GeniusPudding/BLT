import Head from "next/head";
import Layout, { siteTitle } from "../components/blt_layout";
// import Layout, { siteTitle } from "../components/layout";
// import utilStyles from "../styles/utils.module.css";
// import { getSortedPostsData } from "../lib/posts";
import styles from "../styles/pages/landing.module.css";
import Vector13 from "../components/landing/vector13/vector13";
import BLT_FixedTop from "../components/landing/group80/group80";
import BLT_Decoration from "../components/landing/group93/group93";
import BLT_Login1 from "../components/landing/group60/group60";
import BLT_SignUp from "../components/landing/group59/group59";
import { getIntroData } from "../lib/landing";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "../components/modals/loginModal";

// import Date from "../components/date";

// For Static Generation, export "getStaticProps" (getStaticProps can only be exported from a page)
export async function getStaticProps() {
  const allPostsData = getIntroData();
  return {
    props: {
      allPostsData,
    },
  };
}
// For Server-side Rendering, export "getServerSideProps"
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <section className={utilStyles.headingMd}>
//         <p>[Your Self Introduction]</p>
//         <p>
//           (This is a sample website - you’ll be building a site like this on{" "}
//           <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
//         </p>
//       </section>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               <Link href={`/posts/${id}`}>
//                 <a>{title}</a>
//               </Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   );
// }

// Landing
export default function Home({ allPostsData }) {
  const [showModal, setShowModal] = useState(false);
  return (
    // <Layout>
    //   <Head>
    //   <title>{siteTitle}</title>
    //   </Head>
    <div className={styles.landing}>
      <Vector13 className={styles.vector13}></Vector13>
      <BLT_Decoration></BLT_Decoration>
      <BLT_FixedTop></BLT_FixedTop>
      <div className={styles.make}>
        Make your research lifecycle more secure and transparent!
      </div>
      <div className={styles.we}>
        We utilize blockchain technology to block the threat of sloppy file
        management, keeping your precious effort chained to every stakeholders
        safely.
      </div>
      <BLT_SignUp className={styles.group59}></BLT_SignUp>
      <BLT_Login1
        style="cursor:pointer"
        onClick={() => setShowModal(true)}
        className={styles.group60}
      ></BLT_Login1>
      {/* <button onClick={() => setShowModal(true)} className={styles.group60}>
        <div className={styles.rec}></div>
        <div className={styles.text}>Login</div>
      </button> */}

      <LoginModal show={showModal} onClose={() => setShowModal(false)}></LoginModal>
    </div>

    // </Layout>
  );
}
