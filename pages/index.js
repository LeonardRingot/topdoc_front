import styles from "../styles/Home.module.css"
import Accueil from "../components/Accueil";
import HeaderAccueil from "../components/HeaderAccueil";
import Footer from "../components/Footer";

function HomePage() {
    return (
       <>
        <main className={styles.main}>
          <HeaderAccueil></HeaderAccueil>
        <Accueil></Accueil>
        <Footer></Footer>
        </main>
        
    </>
    )
   
  }
  
  export default HomePage