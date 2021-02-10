
const { body, validationResult } = require('express-validator');
const Usuario = require('./../models/usuario.model');

const pSignup = [

    body("usuario")
      .isString()
      .isEmpty()
      .withMessage('Ingrese usuario Valido')
  
      .custom( (value) => {
        console.log(value); //email
        return ModelUsuario.findOne( { email: value } ).then( userDoc=>{
          console.log(userDoc);
          if (userDoc){
            return Promise.reject('Este correo ya existe')
          }
        });
      })
      .normalizeEmail(),
      
    body("nombre").trim()
      .not()
      .isEmpty(),
    body("password").trim()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
      .withMessage("debe tener numeros y caracteres minusculas y mayusculas y un caracter @$.!%*#?&")
      .isLength( {min : 5} )
      .withMessage("minimo 5 caracteres")
  
  ];
  
  const vSingup = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
      const error = new Error('Error validacion');
      error.statusCode = 400;
      error.data = errors.array()
      return next(error);
    }
    
    next();
  }
  
  const validateSingup = [pSignup, vSingup ];
  
  module.exports = {
    validateSingup
  }