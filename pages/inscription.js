import React ,{ useEffect, useState } from 'react'
import Head from 'next/head'
import * as ServiceAPI from "../services/ServiceAPI"
import styles from '../styles/Home.module.css'
import Link from 'next/link';
export default function CreatePatient(){
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    
    const [InscriptionForm, setInscriptionForm]= useState({
        td_numbervitalCode:'',
        td_lastname:'',
        td_firstname:'',
        td_birthday:'',
        td_email:'',
        td_password:'',
        td_phone:'',
     
    })
    const handleChange = (e) =>
    {
        const value = e.target.value;
      setInscriptionForm({
        ...InscriptionForm, [e.target.name]: value
      });
    }
    const ScriptForm = (e) =>
    {
      e.preventDefault()
      ServiceAPI.requetePost(InscriptionForm.td_numbervitalCode,
         InscriptionForm.td_lastname, 
         InscriptionForm.td_firstname,
          InscriptionForm.td_birthday,
         InscriptionForm.td_email,
          InscriptionForm.td_password,
          InscriptionForm.td_phone ).then(response => {
          if(response.status == 200){
            setIsOk('Compte crée');
          } else {
            setErreur('Adresse mail deja utilisée.');
          }
        }).catch(function(error){
        console.log(error);
      });
    }
    return (
        <>
        <form  onSubmit={ScriptForm} action='' method="post">
        <input  type="tel"onChange={handleChange} maxLength={50} placeholder='ex: 782361188737377377'  class="form-control" name="td_numbervitalCode" />
                

                    <label class="form-label" for="form6Example1">Nom</label>
                  <input type="text" onChange={handleChange} id="form6Example1" name="td_lastname" class="form-control" maxLength={20} />

                  <label class="form-label" for="form6Example1">Prenom</label>
                  <input type="text" onChange={handleChange} id="form6Example1" name="td_firstname" class="form-control" maxLength={20} />

                  <label class="form-label" for="form6Example1">td_birthday</label>
                  <input type="date" onChange={handleChange} id="form6Example1" name="td_birthday" class="form-control" maxLength={20} />

                  <label class="form-label" for="form6Example1">email</label>
                  <input type="email" onChange={handleChange} id="form6Example1" name="td_email" class="form-control" maxLength={20} />

                  <label class="form-label" for="form6Example1">passwprd</label>
                  <input type="password" onChange={handleChange} id="form6Example1" name="td_password" class="form-control" maxLength={20} />

                  <label htmlFor='td_phone'>Numéro de téléphone:</label>
                <input  type="tel"onChange={handleChange} maxLength={10} placeholder='ex: 782361188'  class="form-control" name="td_phone" />
                <input  value="Envoyer" class="btn btn-success" type="submit"/> 
        </form>
        <p>{erreur}</p>
        <p>{IsOk}</p>
        
</>
    )
}