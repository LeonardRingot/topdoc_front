import axios from "axios";

export function requetePostConnexion(td_email, td_password) {
  
  var data = JSON.stringify({
    "td_email": td_email,
    "td_password": td_password
    
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

export function requetePostPraticien(td_activite, td_lastname, td_firstname,td_birthday, td_email, td_password, td_phone) {
 
  var data = JSON.stringify({
      "td_activite": td_activite,
      "td_lastname": td_lastname,
      "td_firstname":td_firstname,
      "td_birthday":td_birthday,
      "td_email": td_email,
      "td_password":td_password,
      "td_phone": td_phone,
      "td_isActif": true
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