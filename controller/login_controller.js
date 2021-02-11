const Usuario = require('./../models/usuario.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


function errorHandler(err, next, item) {
  if (err) {

    return next(err);
  }
  if (!item) {
    const error = new Error('usuario o (password) incorrecto');
    error.statusCode = 500;
    return next(error);
  }
}
//==========
//	Login
//==========
const login = (req, res, next) => {

  //let usuario = req.body.Usuario;
  //let password = req.body.pass;
  
  let user = new Usuario(req.body)
  user.usuario=user.usuario.toUpperCase();
  let data = {
      usuario : req.body.usuario.toUpperCase(),
      pass : req.body.pass
  }
  Usuario.find(user,(err,item)=>{

    if(err || !item )
    return errorHandler(err, next, item)

    //console.log([data.pass, item.pass]);


    if (!bcrypt.compareSync(data.pass, item.pass) ){
        return res.status(401).json({
          result: true,
          message: 'usuario o (password) incorrecto'
        });
      }
      console.log(item);
      let payload ={
        idusuario: item.idusuario,
        usuario: item.usuario,
        rut: item.rut,
        tipoUsuario: item.tipoUsuario
      }
  
      let token = jwt.sign(
        payload,
        process.env.SEED,
        { expiresIn: process.env.CADUCIDAD_TOKEN  }
      );
  
      let user = item;
      delete user.pass;
  
      res.json({
        result: true,
        data: {
          idusuario: item.idusuario,
          usuario: item.usuario,
          rut: item.rut,
          tipoUsuario: item.tipoUsuario,
          token: token
        }
      });
  })
}


//==========
//	Signup  -> crear usuario
//==========
/* 
const signin = (req, res, next) => {

  let salt = parseInt(process.env.SALTH)

  let data = {
    nombre : req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),   // **************
    role : req.body.role
  }

  let modelUsuario = new ModelUsuario(data);

  modelUsuario.save((err, item) => {

    if (err || !item) return errorHandler(err, next, item);

    let payload = {
      usuarioId: item._id,
      role: item.role
    }

    let token = jwt.sign(
      payload,
      process.env.SEED,
      { expiresIn: process.env.CADUCIDAD_TOKEN }
    );
    res.json({
      result: true,
      data: {
        usuarioId: item._id,
        role: item.role,
        token: token
      }
    })

  });
} */

const logout = (req, res) => {
  if(req.session){
      //console.log(req.session);
    req.session.destroy( item => {
      res.json({
        result: true
      })
    })
  }
}

module.exports = {
  //signin,
  login,
  logout
};
