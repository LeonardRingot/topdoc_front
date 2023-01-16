import styles from"../styles/Accueil.module.css"
import React, { useEffect, useState } from 'react'
import Image from "next/image"




export default function Accueil(){
 
    return(
        <>
        <div className={styles.img}>
            <Image src="/docflop.png" width={500} height={500} quality={100}>
                
            </Image>
            <div className={styles.text}>
                <h1>Bienvenue sur le site DocFlop</h1>
                <p>Connectez vous à votre compte</p>
            </div>
        </div>
       
       
        
        </>
        
    )
}