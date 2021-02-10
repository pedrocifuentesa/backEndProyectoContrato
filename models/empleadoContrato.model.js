var dbConn = require('../data/config');
var mysql1 = require('mysql');
var EmpleadoContrato = function(empContrato){
    this.id_contrato = empContrato.id_contrato;
    this.id_usuario = empContrato.id_usuario;
    this.cargo  = empContrato.cargo;
    this.estado = empContrato.estado;
}

EmpleadoContrato.getAll = function(contrato, result){
    dbConn.query("SELECT * FROM empleado_contrato pcon inner join contrato con on pcon.id_Contrato = con.idcontrato", contrato, function (err, res){
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

EmpleadoContrato.create  = function (newPerContrato, result) {

    //http://localhost:8080/api/v1/usuario/save
    dbConn.query("INSERT INTO  empleado_contrato SET ?", newPerContrato, function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res.insertId);
            result(null, newContrato);
          }
    });
  };
EmpleadoContrato.find  = function (findContrato, result) {
    dbConn.query("select * from empleado_contrato where id_contrato = ?", [findContrato.idcontrato] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res);
          }
    });
  };

  EmpleadoContrato.findxidUsuario  = function (findContrato, result) {
    dbConn.query("select * from empleado_contrato where id_usuario = ?", [findContrato.idcontrato] , function (err, res){
        if(err) {
            result(err, null);
          }
          else{
            //console.log(res[0]);
            result(null, res[0]);
          }
    });
  };
  EmpleadoContrato.update  = function (idContrato,dataPerContrato, result) {
    //http://localhost:8080/api/v1/usuario/update

    let consulta = "UPDATE empleado_contrato SET cargo =? ,estado=?  where id_usuario =? and id_contrato =?";
    dbConn.query(consulta, [dataPerContrato.cargo,dataPerContrato.estado,dataPerContrato.id_usuario,idContrato], function (err, res){
        
        if(err) {
            //console.log(err);
            result(err, null);
          }
          else{
            result(null,dataPerContrato);
          }
    });
    
  };


module.exports= EmpleadoContrato;