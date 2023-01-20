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
      email:'',
      password:'',
    })

    const [date, setDate] = useState(dayjs())
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChangeAccordeoon = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      console.log(panel);
    };
    const [InscriptionFormPatients, setInscriptionFormPatients]= useState({
        numberVitalCode:'',
        lastname:'',
        firstname:'',
        birthday:'',
        email:'',
        password:'',
        phone:'',
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
        numbervitalCode:event.target.numbervitalCode.value,
        lastname:event.target.lastname.value,
        firstname:event.target.firstname.value,
        birthday:`${new Date(date)}`,
        email:event.target.email.value,
        password:event.target.password.value,
        phone:event.target.phone.value,

      }
      event.preventDefault()
      ServiceAPI.requetePostPatients(data.numbervitalCode,
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
    function ScriptFormConnexion  (event)
    {
      event.preventDefault()
      const data = {
        email:event.target.email.value,
        password:event.target.password.value,
      }
      ServiceAPI.requetePostConnexion(data.email, data.password).then(response => {
       
          if(response.status == 200){          
            Router.push({pathname:`${process.env.NEXT_PUBLIC_URL_ACCUEILPATIENTS}`});
            setCookie("user", [response.data.accessToken, response.data.refreshToken, data.email], "/");
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
         name="email"
         label="Adress mail"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="password"
         name="password"
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
         id="numbervitalCode"
         name="numbervitalCode"
         label="numbervitalCode"
         type="tel"
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
          
            <DateField
            label="birthday"
            
            name="birthday"
            
            value={date}
            onChange={newDate => setDate(dayjs(newDate, "YYYY/MM/DD").format())}
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
</div>
      
       
    )
}
