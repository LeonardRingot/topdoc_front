import Link  from "next/link";
import styles from"../styles/Home.module.css"
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function Header(){
    return(
        <>
        <div className={styles.headerdash}>
            <div></div>
        <ButtonGroup variant="contained" aria-label="outlined primary button group"/>
        
    <h3 href="#"className={styles.logo}> DocFlop</h3>
    <div className={styles.buttongrp}>
    <Link href="/registerpraticien">
      <Button>Vous êtes praticiens</Button>
      </Link>
      <Link href="/connexion">
          <Button  >Connexion</Button>
        </Link>
    </div>
    </div>
        
   
   </>
    )
    
}