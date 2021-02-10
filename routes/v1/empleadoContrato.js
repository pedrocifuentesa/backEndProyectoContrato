var express = require('express');
var router = express.Router();

  const {
    getAll,
    create,
    find,
    update,
    findxRut,
  } = require('./../../controller/empleadoContrato_controller');


router.get( '/empcon/',getAll);
router.post( '/empcon/find',find);
router.post( '/empcon/save',create);
router.post( '/empcon/update',update);
router.post( '/empcon/findxRut',findxRut);


module.exports = router;