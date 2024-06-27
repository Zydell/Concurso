const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasController');

router.post('/reservar', reservaController.reservarLaboratorio);
router.post('/cancelar', reservaController.cancelarReserva);
router.post('/modificar', reservaController.modificarReserva);

module.exports = router;
