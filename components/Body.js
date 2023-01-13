import styles from"../styles/Home.module.css"
import React, { useEffect, useState } from 'react'
import * as ServiceAPI from "../services/ServiceAPI"
const getFilteredItems = (query, items) =>{
    if(!query){
        return items;
    }
    return items.filter(items =>items.td_lastname.includes(query))
}
export default function Body(){
 
    return(
        <>
        <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
       
        <div className={styles.docflopimgdiv} >
                <img style={{marginTop:'50px', width:'500px'}} src="./docflop.png"></img>
        </div>
        
        </>
        
    )
}