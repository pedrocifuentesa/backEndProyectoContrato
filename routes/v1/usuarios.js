var express = require('express');
var router = express.Router();

  const {
    //getUsuario,
    getAll,
    create,
    find,
    update,
  } = require('./../../controller/ususarioController');


router.get( '/usuario/',getAll);
router.post( '/usuario/find',find);
router.post( '/usuario/save',create);
router.post( '/usuario/update',update);


module.exports = router;