var dbConn = require('../data/config');
var mysql1 = require('mysql');
var Contrato = function(contrato){
    this.idcontrato = contrato.idcontrato;
    this.nombre = contrato.nombre;
    this.descripcion  = contrato.descripcion;
    this.finicio = contrato.finicio;
    this.ftermino = contrato.ftermino;
    this.estado = contrato.estado;
}

Contrato.getAll = function(contrato, result){
    dbConn.query("SELECT * FROM contrato", contrato, function (err, res){
        if(err) {
            //console.log("error: ", err);
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, res.contrato);
          }
    });
}

Contrato.create  = function (newContrato, result) {

    //http://localhost:8080/api/v1/usuario/save
    dbConn.query("INSERT INTO  contrato SET ?", newContrato, function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, newContrato);
          }
    });
  };
Contrato.find  = function (findContrato, result) {
    dbConn.query("select * from contrato where idcontrato = ?", [findContrato.idcontrato] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res[0]);
          }
    });
  };

  Contrato.update  = function (idContrato,dataContrato, result) {
    //http://localhost:8080/api/v1/usuario/update

    /* let sql =mysql1.format("UPDATE usuario SET pass=?,correo=? where idusuario=?", [dataUsuario.pass,dataUsuario.correo,id]);
    console.log(sql); */
    //console.log(dataContrato);
    let consulta = "UPDATE contrato SET nombre =? ,descripcion=? ,finicio=?,ftermino=? ,estado=? where idcontrato =?";
    dbConn.query(consulta, [dataContrato.nombre,dataContrato.descripcion,dataContrato.finicio,dataContrato.ftermino,dataContrato.estado,idContrato], function (err, res){
        
        if(err) {
            //console.log(err);
            result(err, null);
          }
          else{
            result(null,dataContrato);
          }
    });
    
  };


module.exports= Contrato;