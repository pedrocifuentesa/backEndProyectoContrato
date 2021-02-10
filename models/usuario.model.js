var dbConn = require('../data/config');
var mysql1 = require('mysql');
var Usuario = function(usuario){
    this.usuario = usuario.usuario;
    this.rut = usuario.rut;
    this.pass = usuario.pass;
    this.idusuario  = usuario.idusuario ;
    this.fcreacion = usuario.fcreacion;
    this.correo = usuario.correo;
    this.tipoUsuario = usuario.tipoUsuario;
}

Usuario.getAll = function(usuarios, result){
    dbConn.query("SELECT usuario,fcreacion,correo,idusuario,rut,tipoUsuario FROM USUARIO", usuarios, function (err, res){
        if(err) {
            //console.log("error: ", err);
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, res.insertId);
          }
    });
}

Usuario.create  = function (newUsuario, result) {

    //http://localhost:8080/api/v1/usuario/save
    dbConn.query("INSERT INTO  usuario SET ?", newUsuario, function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, res.insertId);
          }
    });
  };
  Usuario.find  = function (findUsuario, result) {
    dbConn.query("select * from usuario where usuario = ?", [findUsuario.usuario] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res[0]);
          }
    });
  };
  Usuario.findxRut  = function (findUsuario, result) {
    dbConn.query("select idusuario,rut,usuarui,fcreacion,correo,tipoUsuario from usuario where rut = ?", [findUsuario.rut] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res[0]);
          }
    });
  };

  Usuario.update  = function (id,dataUsuario, result) {
    //http://localhost:8080/api/v1/usuario/update


    dbConn.query("UPDATE  usuario SET pass=?,correo=?,tipoUsuario=? WHERE idusuario=?", [dataUsuario.pass,dataUsuario.correo,dataUsuario.tipoUsuario,id], function (err, res){
        
        if(err) {
            console.log(err);
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null,dataUsuario);
          }
    });
    
  };


module.exports= Usuario;