import {  useState, createContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as ServiceAPI from '../services/ServiceAPI.js'
import {useCookies} from 'react-cookie'
import * as React from 'react'
export default function Connexion (){
    const Router = useRouter()
  
    const [ConnexionForm, setConnexionform]= useState({
      td_email:'',
      td_password:'',
    })
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    
    const handleChange = (e) =>
    {
      const value = e.target.value;
      setConnexionform({
        ...ConnexionForm, [e.target.name]: value
      });
    }
     
    const ScriptFormConnexion = (e) =>
    {
      e.preventDefault()
      
      ServiceAPI.requetePostConnexion(ConnexionForm.td_email, ConnexionForm.td_password).then(response => {
        
          if(response.status == 200){          
            Router.push({pathname:`${process.env.NEXT_PUBLIC_URL_ACCUEIL}`});
            setCookie("user", [response.data.accessToken, response.data.refreshToken, ConnexionForm.td_email], "/");
            console.log("COOKIE CREATED");
          } else {
            return res.status(400).send('user introuvable')
            
          }
        }).catch(function(error){
          console.log(error);
        });
    }
    return (
        <form style={{width: '23rem'}} onSubmit={ScriptFormConnexion} method="post">

            

        
          <input onChange={handleChange} type="email" name="td_email" id="form2Example18" class="form-control form-control-lg" />
          <label class="form-label" for="form2Example18">Adresse mail</label>
        

        <div class="form-outline mb-4">
          <input onChange={handleChange} type="password" name="td_password" id="form2Example28" class="form-control form-control-lg" />
          <label class="form-label" for="form2Example28">Mot de passe</label>
        </div>

        <div class="pt-1 mb-4">
          <button class="btn btn-info btn-lg btn-block" value="Submit" type="submit">Se connecter</button>
        </div>

      </form>
    )
}