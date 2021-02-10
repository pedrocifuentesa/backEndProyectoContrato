var dbConn = require('../data/config');
var mysql1 = require('mysql');
var Persona = function(persona){
    this.nombre = persona.nombre;
    this.rut = persona.rut;
    this.fnacimiento  = persona.fnacimiento;
    this.idusuario = persona.idusuario;
}

Persona.getAll = function(personas, result){
    dbConn.query("SELECT * FROM personas", personas, function (err, res){
        if(err) {
            //console.log("error: ", err);
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, res.personas);
          }
    });
}

Persona.create  = function (newPersona, result) {

    //http://localhost:8080/api/v1/usuario/save
    dbConn.query("INSERT INTO  personas SET ?", newPersona, function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, res.insertId);
          }
    });
  };
Persona.find  = function (findUsuario, result) {
    dbConn.query("select * from personas where rut = ?", [findUsuario.rut] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res[0]);
          }
    });
  };

  Persona.update  = function (rut,dataUsuario, result) {
    //http://localhost:8080/api/v1/usuario/update

    /* let sql =mysql1.format("UPDATE usuario SET pass=?,correo=? where idusuario=?", [dataUsuario.pass,dataUsuario.correo,id]);
    console.log(sql); */
    dbConn.query("UPDATE  personas SET nombre=?,fnacimiento=? WHERE rut=?", [dataUsuario.nombre,dataUsuario.fnacimiento,rut], function (err, res){
        
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


module.exports= Persona;