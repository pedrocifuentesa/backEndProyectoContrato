var express = require('express');
var router = express.Router();

  const {
    //getUsuario,
    getAll,
    create,
    find,
    update,
  } = require('./../../controller/contrato_controller');


router.get( '/contrato/',getAll);
router.post( '/contrato/find',find);
router.post( '/contrato/save',create);
router.post( '/contrato/update',update);


module.exports = router;