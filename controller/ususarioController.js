const Usuario = require('./../models/usuario.model');
const bcrypt = require('bcrypt');



function errorHandler(err, next, item) {
    if(err){
      return next(err);
    }
    if(!item){
      const error = new Error('No existe');
      error.statusCode = 500;
      return next(error);
    }
}

function getAll(req, res,next) {

    Usuario.getAll((err, items) => {
        console.log(err);
        console.log(items);
        
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
    
      })
  }
  function find (req, res,next) {

    const user = new Usuario(req.body);
    user.usuario = user.usuario.toUpperCase();
   //console.log(usuario);
    Usuario.find(user,(err, items) => {    
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
      })
  }

  function create(req,res,next) {
    
      const nuevo_usuario = new Usuario(req.body);
      console.log(nuevo_usuario);
      nuevo_usuario.usuario=nuevo_usuario.usuario.toUpperCase();
      nuevo_usuario.tipoUsuario=nuevo_usuario.tipoUsuario.toUpperCase();
       Usuario.find(nuevo_usuario,(err,item)=>{
        if (err || (item)) {
            return res.status(401).json({
                result: false,
                message: 'Usuario ya Existe'
              });
        }
        let data = {
                usuario : req.body.usuario.toUpperCase(),
                pass : bcrypt.hashSync(req.body.pass, 10),
                fcreacion : new Date(),
                correo : req.body.correo.toUpperCase(),
                rut:req.body.rut,
                tipoUsuario:req.body.tipoUsuario.toUpperCase()
            }
            Usuario.create(data,(err, items) => {
              if (err || !items) return errorHandler(err, next, items);
              res.json({
                result: true,
                data: items
              });
          
            })    
        }); 
     
};
function update(req,res,next) {
    const updateUsuario = new Usuario(req.body);
    updateUsuario.usuario = updateUsuario.usuario.toUpperCase();
    nuevo_usuario.tipoUsuario=nuevo_usuario.tipoUsuario.toUpperCase();
    if(req.body.pass===""||req.body.pass===undefined){
        return res.status(401).json({
            result: false,
            message: 'Contraseña no puede ser Vacia'
          });
    }
    if(req.body.correo===""||req.body.correo===undefined){
        return res.status(401).json({
            result: false,
            message: 'Correo no puede ser Vacio'
          });
    }
    
     Usuario.find(updateUsuario,(err,item)=>{
        
      if (err || !item) {
          return res.status(401).json({
              result: false,
              message: 'Usuario no Existe'
            });
      }
      let data={
          pass : item.pass
        ,correo : item.correo.toUpperCase(),
        tipoUsuario : item.tipoUsuario.toUpperCase()
        };

        
      if (!bcrypt.compareSync(updateUsuario.pass, data.pass) ){
            data.pass=bcrypt.hashSync(updateUsuario.pass, 10);
      }
      
      if(updateUsuario.correo.trim() !== data.correo){
        data.correo=updateUsuario.correo.toUpperCase();
      }
      if(updateUsuario.tipoUsuario.trim() !== data.tipoUsuario){
        data.tipoUsuario=updateUsuario.tipoUsuario.toUpperCase();
      }
      let userUpdt= new Usuario(data);
        Usuario.update(item.idusuario ,userUpdt,(err, items) => {
            if (err || !items) return errorHandler(err, next, items);
            delete items.pass;
            res.json({
              result: true,
              data: items
            });
        
          });    
      }); 
   
}


module.exports={
    getAll,
    create,
    find,
    update,
}
