import * as ServiceAPI from "../../services/ServiceAPI"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Calendrier from "../../components/praticiens/Calendrier";
export default function Accueilpraticiens(){
   
    return (
        <>
        
    <Calendrier></Calendrier>
       </>
    )
    
    
}