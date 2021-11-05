const bcrypt = require('bcrypt');
const saltRound = 10
const AuthenticationService = require('./../services/AuthenticationServices.js');
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async function(req, res){
    try {
      const {nombre, idCompanie, contraseña, email} = req.allParams()
      if(contraseña.length < 8 ){
        return res.badRequest('La contraseña debe ser de minimo 8 caracteres')
      }
      const hashedPassword = await bcrypt.hash(contraseña, saltRound);
      const user = await Users.create({idCompanie, nombre, contraseña: hashedPassword, email}).fetch()
      return res.ok("Usuario Creado")
    }catch(err){
      return res.badRequest(err.message).json()
    }
  },
  login: async function(req, res){
    try{
      const {email, contraseña} = await req.allParams();
      const user = await Users.findOne({email});
      if(!user){
        return res.notFound('Email o Contraseñas Erroneas, No se encuentra el usuario').json()
      }
      const comparedPassword = await bcrypt.compare(contraseña, user.contraseña);
      const token = AuthenticationService.JWTIssuer({user: user.id}, '1 day')
      return (comparedPassword) ? res.ok({token}) : res.badRequest('Usario No Autorizado').json()
    }catch(err){
      return res.serverError(err).json()
    }
  }

};

