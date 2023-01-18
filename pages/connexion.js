import {  useState, createContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as ServiceAPI from '../services/ServiceAPI.js' 
import {useCookies} from 'react-cookie'
import * as React from 'react'
import styles from "../styles/Home.module.css"
import {LocalizationProvider} from "@mui/x-date-pickers"
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChangeAccordeoon = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      console.log(panel);
    };
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
        <div className={styles.accordeon}>
        <h1>Formulaire de connexion </h1>
        <Box component="form" noValidate  onSubmit={ScriptFormConnexion} method="post"  sx={{p: 2, width:'50%', textAlign:'center' ,display:'inline-block'}} >
        <Accordion  expanded={expanded === 'panel1'} onChange={handleChangeAccordeoon('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{    flexShrink: 0 }}>J'ai deja un compte docFlop</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
      
      </div>
        

       <p>Pas de compte ? Inscrivez-vous !</p>

        
      <Box component="form" noValidate  onSubmit={ScriptFormHidden} method="post" sx={{p: 2, width:'50%', textAlign:'center' ,display:'inline-block'}} >
      <Accordion expanded={expanded === 'panel2'}  onChange={handleChangeAccordeoon('panel2')}  >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{  flexShrink: 0 }}>Nouveau sur DocFlop ?</Typography>
          <Button   >S'inscrire</Button>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
          
            <DateField
            label="td_birthday"
            
            name="td_birthday"
            
            value={date}
            onChange={newDate => setDate(dayjs(newDate, "YYYY/MM/DD").format())}
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
</div>
      
       
    )
}
