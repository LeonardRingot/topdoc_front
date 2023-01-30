import axios from "axios";


export function requetePostConnexion(email, password) {
  
  var data = JSON.stringify({
    "email":email,
    "password": password
    
  });
  var configConnexion = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_URL}auth/login`,
    headers: {
      'Content-Type': 'application/json'
      
    },

    data: data
  };
  return axios(configConnexion);
}

export function requetePostPraticien(activite, lastname, firstname,birthday, email, password, phone) {
 
  var data = JSON.stringify({
      "activite": activite,
      "lastname": lastname,
      "firstname":firstname,
      "birthday":birthday,
      "email": email,
      "password":password,
      "phone": phone,
      "isActif": true
  });
  var config = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_URL}praticiens`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  return axios(config);
}

export function requetePostPatients(numbervitalCode, lastname, firstname,birthday, email, password, phone) {
 
  var data = JSON.stringify({
      "numbervitalCode": numbervitalCode,
      "lastname": lastname,
      "firstname":firstname,
      "birthday":birthday,
      "email": email,
      "password":password,
      "phone": phone,
      "isActif": true
  });
  var config = {
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_URL}patients`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  return axios(config);
}


export function requeteGetAllPraticiens(firstname, lastname, address, zipCode, city) {
  var configGetAllUsersPraticiens = {
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_URL}praticiens`,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configGetAllUsersPraticiens);
}
export function requeteGetPlanning() {
  var configGetPlanning = {
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_URL}planning/1`,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configGetPlanning);
}