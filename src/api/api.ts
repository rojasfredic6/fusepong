const url = "https://servidor-fuse.herokuapp.com/";
// const url = "http://localhost:1337/"
import axios from "axios";

const getCompañias = (id?:string) => {
  if(!id){
    return axios.get(`${url}companies`);
  } 
  
  return axios.get(`${url}companies/${id}`)
};

const createUser = (data: any) => {
  const { nombre, idCompanie, contraseña, email } = data;
  return axios.post(`${url}users/signup`, {
    nombre,
    contraseña,
    idCompanie,
    email,
  });
};

const loginUser = (data: any) => {
  const { email, contraseña } = data;
  // const email:string = data.email
  // const contraseña:string = data.contraseña
  return axios.post(`${url}users/login`, {
    email,
    contraseña,
  });
};

const proyectsByCompanie = (data: any) => {
  const { token, id } = data;
  return axios.post(
    `${url}proyectos/byCompanies`,
    {
      id,
    },
    {
      headers: {
        'Authorization': token,
      },
    }
  );
};

export { getCompañias, createUser, loginUser, proyectsByCompanie };
