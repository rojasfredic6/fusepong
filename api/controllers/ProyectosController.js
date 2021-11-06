/**
 * ProyectosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  byCompanies: async function(req, res){
    try{
      const {id} = req.allParams()
      const proyects = await Proyectos.find({
        where:{ idCompanie: id}
      }).populate('historias')
      if(!proyects){
        return res.badRequest('No hay proyectos creados')
      }
      return res.ok(proyects).json()
    }catch(err){
      return res.serverError(err).json()
    }
  }
};

