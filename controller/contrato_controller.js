const Contrato = require('./../models/contrato.model');

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

    Contrato.getAll((err, items) => {      
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
    
      })
  }
  function find (req, res,next) {

    const contrato = new Contrato(req.body);
    //persona.usuario = user.usuario.toUpperCase();
   //console.log(usuario);
    Contrato.find(contrato,(err, items) => {    
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
      })
  }

  function create(req,res,next) {
      const nuevo_contrato = new Contrato(req.body);
      nuevo_contrato.nombre=nuevo_contrato.nombre.toUpperCase();
       Contrato.find(nuevo_contrato,(err,item)=>{
        if (err || (item)) {
            return res.status(401).json({
                result: false,
                message: 'Contrato Existe'
              });
        }
        let data = {
                nombre: req.body.nombre.toUpperCase(),
                descripcion: req.body.descripcion,
                finicio: new Date(req.body.finicio),
                ftermino: new Date(req.body.ftermino),
                estado: req.body.estado
            }
            Contrato.create(data,(err, items) => {
              if (err || !items) return errorHandler(err, next, items);
              res.json({
                result: true,
                data: items
              });
          
            })    
        }); 
     
};
function update(req,res,next) {
    const updateContrato = new Contrato(req.body);
    //console.log(updateContrato)
    updateContrato.nombre = updateContrato.nombre.toUpperCase();

    if(req.body.nombre===""||req.body.nombre===undefined){
        return res.status(401).json({
            result: false,
            message: 'Nombre no puede ser Vacio'
          });
    }
    if(req.body.finicio===""||req.body.finicio===undefined){
        return res.status(401).json({
            result: false,
            message: 'Fecha de inicio no puede ser Vacio'
          });
    }

    if(req.body.estado===""||req.body.estado===undefined){
        return res.status(401).json({
            result: false,
            message: 'Estado no puede ser Vacio'
          });
    }
    
     Contrato.find(updateContrato,(err,item)=>{
       
        
      if (err || !item) {
          return res.status(401).json({
              result: false,
              message: 'Contrato no Existe'
            });
      }
      let data={
        nombre: item.nombre,
        descripcion: item.descripcion,
        finicio: item.finicio,
        ftermino: item.ftermino,
        estado: item.estado
        };

        if(item.ftermino==null || item.ftermino== undefined || item.ftermino==''){
          item.ftermino='';
        }
        if(updateContrato.nombre !== item.nombre){
          data.nombre=updateContrato.nombre;
        }
        if(updateContrato.descripcion !== item.descripcion){
          data.descripcion=updateContrato.descripcion;
        }
        if(updateContrato.finicio !== item.finicio){
          data.finicio=updateContrato.finicio;
        }
        if(updateContrato.ftermino !== item.ftermino){
          data.ftermino=updateContrato.ftermino;
        }
        if(updateContrato.estado !== item.estado){
          data.estado=updateContrato.estado;
        }
      let contratoUpdt= new Contrato(data);
        Contrato.update(item.idcontrato ,contratoUpdt,(err, items) => {
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
}