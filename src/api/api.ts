const url = "https://servidor-fuse.herokuapp.com/";
// const url = "http://localhost:1337/"
import axios from "axios";

const getCompañias = (id?: string) => {
  if (!id) {
    return axios.get(`${url}companies`);
  }

  return axios.get(`${url}companies/${id}`);
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
        Authorization: token,
      },
    }
  );
};

const getHistoryData = (data: any) => {
  const { token, id } = data;
  return axios.post(
    `${url}historias/historiaData`,
    {
      id,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const getTicketWithComents = (data: any) => {
  const { token, id } = data;
  return axios.post(
    `${url}tiquetes/comentariosTicket`,
    {
      id,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const createHistory = (data: any) => {
  const { token, idUsuario, nombreHistoria, descripcionHistoria, proyecto } =
    data;
  return axios.post(
    `${url}historias`,
    {
      idUsuario,
      nombreHistoria,
      descripcionHistoria,
      proyecto,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const deleteHistory = (data: any) => {
  const { token, id } = data;
  return axios.delete(`${url}historias/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const createTicket = (data: any) => {
  const { token, descripcionTicket, historia, user, estadoTicket } = data;
  return axios.post(
    `${url}tiquetes`,
    {
      descripcionTicket,
      historia,
      user,
      estadoTicket,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const deleteTicket = (data: any) => {
  const { token, id } = data;
  return axios.delete(`${url}tiquetes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const editarTicket = (data: any) => {
  const { token, id, descripcionTicket, estadoTicket } = data;
  return axios.put(
    `${url}tiquetes/${id}`,
    {
      descripcionTicket,
      estadoTicket,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const crearComentario = (data: any) => {
  const { ticket, token, comentario } = data;
  return axios.post(
    `${url}comentarios`,
    {
      ticket,
      comentario,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const deleteComentario = (data: any) => {
  const { token, id } = data;
  return axios.delete(`${url}comentarios/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const historialByUser = (data: any) => {
  const { token, id } = data;
  return axios.post(
    `${url}historial`,
    {
      id,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export {
  getCompañias,
  createUser,
  loginUser,
  proyectsByCompanie,
  getHistoryData,
  getTicketWithComents,
  createHistory,
  deleteHistory,
  createTicket,
  deleteTicket,
  editarTicket,
  crearComentario,
  deleteComentario,
  historialByUser,
};
