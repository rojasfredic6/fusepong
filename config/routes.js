/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
'POST /users/signup': 'UsersController.signup',
'POST /users/login': 'UsersController.login',
'POST /proyectos/byCompanies': "ProyectosController.byCompanies",
'POST /historias/historiaData': "HistoriasController.getHistoriaData",
'POST /tiquetes/comentariosTicket': "TiquetesController.getComentarios",
'POST /historial': "TiquetesController.ticketsByUser"
};
