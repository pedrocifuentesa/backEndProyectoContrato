const EmpleadoContrato = require('./../models/empleadoContrato.model');

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

  EmpleadoContrato.getAll((err, items) => {      
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
    
      })
  }
  function find (req, res,next) {

    const empContrato = new EmpleadoContrato(req.body);
   EmpleadoContrato.find(contrato,(err, items) => {    
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
      })
  }
  function findxRut (req, res,next) {

    const empContrato = new EmpleadoContrato(req.body);
   EmpleadoContrato.findxidUsuario(contrato,(err, items) => {    
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
      })
  }

  function create(req,res,next) {
      const nuevo_empContrato = new EmpleadoContrato(req.body);
      nuevo_empContrato.cargo=nuevo_empContrato.cargo.toUpperCase();
      nuevo_empContrato.estado=nuevo_empContrato.estado.toUpperCase();
      EmpleadoContrato.findxidUsuario(nuevo_contrato,(err,item)=>{
        if (err || (item)) {
            return res.status(401).json({
                result: false,
                message: 'Funcionario ya Existe'
              });
        }
        let data = {
          id_contrato:req.body.id_contrato,
          id_usuario:req.body.id_usuario,
          cargo:req.body.cargo.toUpperCase(),
          estado:req.body.estado.toUpperCase()
      
            }
            EmpleadoContrato.create(data,(err, items) => {
              if (err || !items) return errorHandler(err, next, items);
              res.json({
                result: true,
                data: items
              });
          
            })    
        }); 
     
};
function update(req,res,next) {
    const update_empContrato = new EmpleadoContrato(req.body);
    update_empContrato.cargo=update_empContrato.cargo.toUpperCase();
    update_empContrato.estado=update_empContrato.estado.toUpperCase();
    
    if(update_empContrato.id_usuario===""||update_empContrato.id_usuario===undefined){
      return res.status(401).json({
          result: false,
          message: 'Empleado no puede ser Vacio'
        });
  }
    if(update_empContrato.cargo===""||update_empContrato.cargo===undefined){
        return res.status(401).json({
            result: false,
            message: 'Cargo no puede ser Vacio'
          });
    }
    if(update_empContrato.estado===""||update_empContrato.estado===undefined){
        return res.status(401).json({
            result: false,
            message: 'Estado no puede ser Vacio'
          });
    }
    
    EmpleadoContrato.findxidUsuario(update_empContrato,(err,item)=>{
      if (err || !item) {
          return res.status(401).json({
              result: false,
              message: 'Empleado no Existe'
            });
      }
      let data={
        id_usuario:item.id_usuario,
        cargo:item.cargo.toUpperCase(),
        estado:item.estado.toUpperCase()
        };

        if(update_empContrato.cargo !== item.cargo){
          data.cargo=update_empContrato.cargo;
        }
        if(update_empContrato.estado !== item.estado){
          data.estado=update_empContrato.estado;
        }
       
      let empContratoUpdt= new EmpleadoContrato(data);
      EmpleadoContrato.update(item.idcontrato ,empContratoUpdt,(err, items) => {
            if (err || !items) return errorHandler(err, next, items);
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
    findxRut
}