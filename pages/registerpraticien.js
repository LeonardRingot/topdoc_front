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
        activite:'',
        lastname:'',
        firstname:'',
        birthday:'',
        email:'',
        password:'',
        phone:'',
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
        activite:event.target.activite.value,
        lastname:event.target.lastname.value,
        firstname:event.target.firstname.value,
        birthday:`${new Date(date)}`,
        email:event.target.email.value,
        password:event.target.password.value,
        phone:event.target.phone.value,

      }
      event.preventDefault()
      ServiceAPI.requetePostPraticien(data.activite,
        data.lastname, 
        data.firstname,
        data.birthday,
        data.email,
        data.password,
        data.phone ).then(response => {
          console.log(data.birthday)
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
         id="activite"
         name="activite"
         label="Activite"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="lastname"
         name="lastname"
         type="text"
         label="Nom"
          />
           <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="firstname"
         name="firstname"
         type="text"
         label="Prenom"
          />
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <MobileDatePicker
            label="birthday"
            inputFormat='YYYY/MM/DD'
            name="birthday"
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
         id="email"
         name="email"
         type="email"
         label="Adresse mail"
          />
           <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="password"
         name="password"
         type="password"
         label="Mot de passe "
          />
             <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="phone"
         name="phone"
         type="tel"
         label="Numéro de telephone "
          />

          <Button type="submit" value="submit" >Envoyer</Button>
       </Box>
        </div>
        
        
</>
    )
}
