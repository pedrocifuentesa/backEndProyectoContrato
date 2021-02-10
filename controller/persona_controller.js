const Persona = require('./../models/persona.model');

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

    Persona.getAll((err, items) => {      
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
    
      })
  }
  function find (req, res,next) {

    const persona = new Persona(req.body);
    //persona.usuario = user.usuario.toUpperCase();
   //console.log(usuario);
    Persona.find(persona,(err, items) => {    
        if (err || !items) return errorHandler(err, next, items);
        res.json({
          result: true,
          data: items
        });
      })
  }

  function create(req,res,next) {
      const nuevo_Persona = new Persona(req.body);
      nuevo_Persona.nombre=nuevo_Persona.nombre.toUpperCase();
       Persona.find(nuevo_Persona,(err,item)=>{
        if (err || (item)) {
            return res.status(401).json({
                result: false,
                message: 'Persona ya Existe'
              });
        }
        let data = {
                nombre : req.body.nombre .toUpperCase(),
                rut : req.body.rut ,
                fnacimiento : new Date(req.body.fnacimiento)
            }
            console.log(data)
            Persona.create(data,(err, items) => {
              if (err || !items) return errorHandler(err, next, items);
              res.json({
                result: true,
                data: items
              });
          
            })    
        }); 
     
};
function update(req,res,next) {
    const updatePersona = new Persona(req.body);
    updatePersona.nombre = updatePersona.nombre.toUpperCase();
    if(req.body.nombre===""||req.body.nombre===undefined){
        return res.status(401).json({
            result: false,
            message: 'Nombre no puede ser Vacia'
          });
    }
    if(req.body.fnacimiento===""||req.body.fnacimiento===undefined){
        return res.status(401).json({
            result: false,
            message: 'Fecha de nacimiento no puede ser Vacio'
          });
    }
    
     Persona.find(updatePersona,(err,item)=>{
        
      if (err || !item) {
          return res.status(401).json({
              result: false,
              message: 'Persona no Existe'
            });
      }
      let data={
          nombre : item.nombre
        ,fnacimiento : item.fnacimiento
        };

        if(updatePersona.nombre !== item.nombre){

            data.nombre=updatePersona.nombre.toUpperCase();
          }  
        if(updatePersona.fnacimiento !== data.fnacimiento){
            data.fnacimiento=updatePersona.fnacimiento;
        }
      
      let PersonaUpdt= new Persona(data);
        Persona.update(item.rut ,PersonaUpdt,(err, items) => {
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
