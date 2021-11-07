/**
 * TiquetesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Tiquetes = require("../models/Tiquetes");


module.exports = {
  getComentarios: async(req, res) =>{
    try{
      const {id} = req.allParams()
      const comentarios = await Tiquetes.find({ where: {id}}).populate('comentarios')
      if(!comentarios){
        return res.badRequest('No Found').json()
      }
      return res.ok(comentarios).json()
    }catch(err){
      return res.serverError(err).json()
    }
  },

  ticketsByUser: async(req,res) => {
    try{
      const {id} = req.allParams()
      const tickets = await Tiquetes.find({ where: { user: id }, sort: 'createdAt DESC'}).populate('historia')
      if(!tickets){
        return res.badRequest('Not found').json()
      }
      return res.ok(tickets).json()
    }catch(err){
      return res.serverError(err).json()
    }
  }

};

