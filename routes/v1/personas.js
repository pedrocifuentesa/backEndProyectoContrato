var express = require('express');
var router = express.Router();

  const {
    //getUsuario,
    getAll,
    create,
    find,
    update,
  } = require('./../../controller/persona_controller');


router.get( '/personas/',getAll);
router.post( '/personas/find',find);
router.post( '/personas/save',create);
router.post( '/personas/update',update);


module.exports = router;