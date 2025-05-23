const { tb_laboratorio, tb_horarioatencion, tb_credenciales} = require('../models');
const notificationService = require('../services/notificationService');

const laboExists = async (nombre) => {
    const existingUser = await tb_laboratorio.findOne({ where: { nombre } });
    return !!existingUser;
};

// Registrar laboratorio
exports.registrarLaboratorio = async (req, res) => {
    try {
        const { nombre, capacidad, cantequipos, horainicio, horafin } = req.body;
        
        // Que no sea el mismo laboratorio
        if (await laboExists(nombre)) {
            return res.status(400).json({ message: 'El laboratorio ya está registrado.' });
        }

        // Crear el horario
        const horario = await tb_horarioatencion.create({
            horainicio,
            horafin
        });

        // Crear el registro de reciclaje
        const lab = await tb_laboratorio.create({
            horarioaten_id: horario.horarioaten_id,
            nombre,
            capacidad,
            cantequipos
        });

         // Agregar notificación al servicio de notificaciones
         const notificacionMensaje = {
            titulo: 'Registro de laboratorio exitoso',
            mensaje: `Has registrado un laboratorio exitosamente`
        };
        notificationService.addNotification(lab.laboratorio_id, notificacionMensaje);

        res.status(201).json({ message: 'Laboratorio registrado exitosamente', nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar laboratorio
exports.actualizarLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, capacidad, cantequipos, horainicio, horafin } = req.body;

        // Buscar laboratorio existente
        const lab = await tb_laboratorio.findByPk(id);
        if (!lab) {
            return res.status(404).json({ message: 'Laboratorio no encontrado.' });
        }

        // Actualizar horario
        const horario = await tb_horarioatencion.findByPk(lab.horarioaten_id);
        if (horario) {
            horario.horainicio = horainicio;
            horario.horafin = horafin;
            await horario.save();
        }

        // Actualizar datos del laboratorio
        lab.nombre = nombre;
        lab.capacidad = capacidad;
        lab.cantequipos = cantequipos;
        await lab.save();

        // Agregar notificación al servicio de notificaciones
        const notificacionMensaje = {
            titulo: 'Actualización de laboratorio exitosa',
            mensaje: `Has actualizado el laboratorio exitosamente`
        };
        notificationService.addNotification(lab.laboratorio_id, notificacionMensaje);

        res.status(200).json({ message: 'Laboratorio actualizado exitosamente', nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
// Obtener historial de reciclaje para un ciudadano
exports.obtenerHistorialCiudadano = async (req, res) => {
    try {
        const { ciudadano_id } = req.params;

        const historial = await tb_historiales.findAll({
            where: { ciudadano_id },
            attributes: ['fecha', 'greencoins_obtenidos'],
            include: [
                { model: tb_puntos_verdes, attributes: ['direccion']},
                { model: tb_negocio, attributes: ['nombre', 'propietario', 'telefono']},
                { model: tb_ciudadano, attributes: ['nombre', 'telefono']}
            ]
        });

        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener historial de reciclaje para un negocio
exports.obtenerHistorialNegocio = async (req, res) => {
    try {
        const { negocio_id } = req.params;

        const historial = await tb_historiales.findAll({
            where: { negocio_id },
            attributes: ['fecha', 'greencoins_obtenidos'],
            include: [
                { model: tb_puntos_verdes, attributes: ['direccion']},
                { model: tb_negocio, attributes: ['nombre', 'propietario', 'telefono']},
                { model: tb_ciudadano, attributes: ['nombre', 'telefono']}
            ]
        });

        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/