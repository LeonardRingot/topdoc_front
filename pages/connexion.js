import {  useState, createContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as ServiceAPI from '../services/ServiceAPI.js' 
import {useCookies} from 'react-cookie'
import * as React from 'react'
import styles from "../styles/Home.module.css"
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
export default function Connexion (){
    const Router = useRouter()
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [ConnexionForm, setConnexionform]= useState({
      td_email:'',
      td_password:'',
    })

    const [date, setDate] = useState(dayjs())

    const [InscriptionFormPatients, setInscriptionFormPatients]= useState({
        td_numberVitalCode:'',
        td_lastname:'',
        td_firstname:'',
        td_birthday:'',
        td_email:'',
        td_password:'',
        td_phone:'',
    })

    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    function myFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
    const handleChange = (e) =>
    {
     
      const value = e.target.value;
      setConnexionform({
        ...ConnexionForm, [e.target.name]: value
      });

      setInscriptionFormPatients({
        ...InscriptionFormPatients, [e.target.name]: value
      });

    }
    function ScriptFormHidden (event) 
    {
      const data = {
        td_numbervitalCode:event.target.td_numbervitalCode.value,
        td_lastname:event.target.td_lastname.value,
        td_firstname:event.target.td_firstname.value,
        td_birthday:`${new Date(date)}`,
        td_email:event.target.td_email.value,
        td_password:event.target.td_password.value,
        td_phone:event.target.td_phone.value,

      }
      event.preventDefault()
      ServiceAPI.requetePostPatients(data.td_numbervitalCode,
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
    function ScriptFormConnexion  (event)
    {
      event.preventDefault()
      const data = {
        td_email:event.target.td_email.value,
        td_password:event.target.td_password.value,
      }
      ServiceAPI.requetePostConnexion(data.td_email, data.td_password).then(response => {
       
          if(response.status == 200){          
            Router.push({pathname:`${process.env.NEXT_PUBLIC_URL_ACCUEILPATIENTS}`});
            setCookie("user", [response.data.accessToken, response.data.refreshToken, data.td_email], "/");
            console.log("COOKIE CREATED");
            console.log(response.data.accessToken)
          } else {
            return res.status(400).send('user introuvable')
            
          }
        }).catch(function(error){
          console.log(error);
        });
    }
    return (
      <div className={styles.login}>
        <h1>Formulaire de connexion </h1>
<Box component="form" noValidate  onSubmit={ScriptFormConnexion} method="post"sx={{p: 2, border: '1px solid  black', width:'50%', textAlign:'center' ,display:'inline-block'}} >
          <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="email"
         name="td_email"
         label="Adress mail"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="password"
         name="td_password"
         type="password"
         label="Mot de passe"
          />
          <Button type="submit" value="submit" >Envoyer</Button>
       </Box>
       <p>Pas de compte ? Inscrivez-vous !</p>



     
     {/* --------------------------------------------------- FORMULAIRE INSCRIPTION ------------------------------------------------------------------------------------------------*/}


      <Button onClick={myFunction} >S'inscrire</Button>
      <div style={{display:'none'}} id="myDIV">
  <Box component="form" noValidate  onSubmit={ScriptFormHidden} method="post" sx={{ p: 2, border: '1px solid  black', width:'50%', textAlign:'center' ,display:'inline-block' }} >
          <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="td_numbervitalCode"
         name="td_numbervitalCode"
         label="td_numbervitalCode"
         type="tel"
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
      </div>
       
    )
}
