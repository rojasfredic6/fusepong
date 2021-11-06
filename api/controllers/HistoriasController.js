/**
 * HistoriasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Historias = require("../models/Historias");

module.exports = {

getHistoriaData: async function(req, res){
  try{
    const {id} = req.allParams()
    const data = await Historias.findOne({id}).populate('tickets')
    if(!data){
      return res.badRequest('No se encontraron resultados').json()
    }
    return res.ok(data).json()
  }catch(err){
    return res.serverError(err).json()
  }
}

};

