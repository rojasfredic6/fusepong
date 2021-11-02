const AuthenticationService = require('../services/AuthenticationServices');

module.exports = async (req, res, next) =>{
  if(!req.headers || !req.headers.authorization){
    return res.badRequest({err: 'No hay una cabecera de autorizacion'})
  }

  const token = req.headers.authorization;
  const decodeToken = AuthenticationService.JWTVerify(token);
  const user = await Users.findOne({id: decodeToken.user});
  if(!user){
    return next({err: 'Unauthorized'})
  }
  req.user = user.id;
  next()
}