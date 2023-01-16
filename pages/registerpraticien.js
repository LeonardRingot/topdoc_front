import React ,{ useEffect, useState } from 'react'
import Head from 'next/head'
import * as ServiceAPI from "../services/ServiceAPI"
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
import { display } from '@mui/system';
export default function Registerpraticien()
{
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [date, setDate] = useState(dayjs())
    const [InscriptionForm, setInscriptionForm]= useState({
        td_activite:'',
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
    function ScriptForm (event) 
    {
      const data = {
        td_activite:event.target.td_activite.value,
        td_lastname:event.target.td_lastname.value,
        td_firstname:event.target.td_firstname.value,
        td_birthday:`${new Date(date)}`,
        td_email:event.target.td_email.value,
        td_password:event.target.td_password.value,
        td_phone:event.target.td_phone.value,

      }
      event.preventDefault()
      ServiceAPI.requetePostPraticien(data.td_activite,
        data.td_lastname, 
        data.td_firstname,
        data.td_birthday,
        data.td_email,
        data.td_password,
        data.td_phone ).then(response => {
          console.log(data.td_birthday)
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
        <div className={styles.registerpraticiens}>
        <h1>Formulaire d'inscription Praticiens</h1>
     <Box component="form" noValidate  onSubmit={ScriptForm} method="post" sx={{ p: 2, border: '1px solid  black', width:'50%', textAlign:'center' ,display:'inline-block' }} >
          <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="td_activite"
         name="td_activite"
         label="Activite"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="td_lastname"
         name="td_lastname"
         type="text"
         label="Nom"
          />
           <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="td_firstname"
         name="td_firstname"
         type="text"
         label="Prenom"
          />
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <MobileDatePicker
            label="td_birthday"
            inputFormat='YYYY/MM/DD'
            name="td_birthday"
            type="date"
            value={date}
            onChange={newDate => setDate(dayjs(newDate, "YYYY/MM/DD").format())}
            renderInput={(props) => <TextField  {...props}  />}
            />
          </LocalizationProvider>
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="td_email"
         name="td_email"
         type="email"
         label="Adresse mail"
          />
           <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="td_password"
         name="td_password"
         type="password"
         label="Mot de passe "
          />
             <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="td_phone"
         name="td_phone"
         type="tel"
         label="Numéro de telephone "
          />

          <Button type="submit" value="submit" >Envoyer</Button>
       </Box>
        </div>
        
        
</>
    )
}
