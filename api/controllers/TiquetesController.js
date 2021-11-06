/**
 * TiquetesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


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
  }

};

