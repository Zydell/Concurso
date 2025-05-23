const express = require('express');
const router = express.Router();
const reciclajeController = require('../controllers/laboratorioController');
const db = require('../models');

router.post('/registrar', reciclajeController.registrarLaboratorio);
//router.get('/historial/ciudadano/:ciudadano_id', reciclajeController.obtenerHistorialCiudadano);
//router.get('/historial/negocio/:negocio_id', reciclajeController.obtenerHistorialNegocio);
// Get all 
/*
router.get('/', async (req, res) => {
    try {
      const admin = await db.tb_laboratorio.findAll();
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
*/
  router.get('/laboratorios', async (req, res) => {
    try {
        const laboratorios = await db.tb_laboratorio.findAll({
            include: {
                model: db.tb_horarioatencion,
                attributes: ['horainicio', 'horafin'] // Especificar los atributos que deseas obtener
            }
        });
        res.status(200).json(laboratorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
/*
const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all 
router.get('/', async (req, res) => {
  try {
    const admin = await db.tb_laboratorio.findAll();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new 
router.post('/', async (req, res) => {
  try {
    const admin = await db.tb_laboratorio.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an  by id
router.get('/:id', async (req, res) => {
  try {
    const admin = await db.tb_laboratorio.findByPk(req.params.id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an  by id
router.put('/:id', async (req, res) => {
  try {
    const admin = await db.tb_laboratorio.findByPk(req.params.id);
    if (admin) {
      await admin.update(req.body);
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an  by id
router.delete('/:id', async (req, res) => {
  try {
    const admin = await db.tb_laboratorio.findByPk(req.params.id);
    if (admin) {
      await admin.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/