import * as ServiceAPI from "../../services/ServiceAPI"
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
export default function Accueilpraticiens(){
    const router = useRouter()
    let [data, setData] = useState(null)
    let [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        ServiceAPI.requeteGetPlanning()
        .then(response => {
          if(response.status == 200){
            if(response.data.length > 0)
            {
                setData(response.data)
                console.log(response.data[0].creneaux)
                setLoading(false)
            }
          }
        }
        )
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Nothing</p>
    return (
        <>
        <div  > 
    <table class="table table-hover table-dark">
        <thead  >
            <tr >
                <th >Jour</th>
                <th >StartHour</th>
                <th >EndHour</th>
                
            </tr>
        </thead>
        <tbody> 
        {data.map((element) => {
      return (
            <tr key={element.id}>
                <td>
                    <h6>{element.jour}</h6>
                </td>
                <td>  
                    <h6>{element.creneaux.StartHour}</h6>
                </td>
                <td>
                    <h6>{element.creneaux.EndHour}</h6>
                </td>
                
              {console.log(data.element)}
            </tr>)  
    })}
        </tbody>
    </table>
    
    </div>
      
       </>
    )
    
}