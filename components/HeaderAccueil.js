import Link  from "next/link";
import styles from"../styles/Home.module.css"
export default function Header(){
    return(
        <>
    <div className={styles.headerdash}>
    <h3 href="#"className={styles.logo}> DocFlop</h3>
    <div className={styles.buttongrp}>
    <Link href="/registerpraticien">
          <button className={styles.buttonLogin} >Vous êtes Praticien ?</button>
        </Link>
      <Link href="/connexion">
          <button className={styles.buttonLogin} >Connexion</button>
        </Link>
    </div>
    
    </div>
   
   </>
    )
    
}