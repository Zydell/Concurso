const { tb_reservalab, tb_horarioreserva, tb_laboratorio, tb_credenciales, tb_disponibilidad } = require('../models');
const enviarCorreo = require('../services/emailService');

const reservaExists = async (fecha, hora_inicio, hora_fin) => {
    const existingReserva = await tb_horarioreserva.findOne({
        where: {
            fecha,
            hora_inicio,
            hora_fin
        }
    });
    return !!existingReserva;
};

exports.reservarLaboratorio = async (req, res) => {
    try {
        const { laboratorio_id, credencial_id, nombre, tiporeserva, fechaing, hora_inicio, hora_fin } = req.body;

        let fecha = new Date(fechaing);

        if (await reservaExists(laboratorio_id, fecha, hora_inicio, hora_fin)) {
            return res.status(400).json({ message: 'El laboratorio ya está reservado para ese horario.' });
        }

        const reserva = await tb_reservalab.create({
            laboratorio_id,
            credencial_id,
            nombre,
            tiporeserva
        });

        await tb_horarioreserva.create({
            reservalab_id: reserva.reservalab_id,
            fecha,
            hora_inicio,
            hora_fin
        });

        const credencial = await tb_credenciales.findByPk(credencial_id);
        const laboratorio = await tb_laboratorio.findByPk(laboratorio_id);
        const asunto = 'Reserva Confirmada';
        const texto = `Su reserva para el laboratorio ${laboratorio.nombre} ha sido confirmada para el ${fecha} desde ${hora_inicio} hasta ${hora_fin}.`;

        const result = await enviarCorreo(credencial.correo_electronico, asunto, texto);
        console.log('Correo enviado:', result);

        res.status(201).json({ message: 'Reserva creada y correo enviado' });
    } catch (error) {
        console.error('Error al reservar el laboratorio:', error);
        res.status(500).json({ error: 'Error al reservar el laboratorio' });
    }
};

exports.cancelarReserva = async (req, res) => {
    try {
        const { reservalab_id } = req.body;

        const reserva = await tb_reservalab.findByPk(reservalab_id);
        const credencial = await tb_credenciales.findByPk(reserva.credencial_id);

        await tb_horarioreserva.destroy({ where: { reservalab_id } });
        await tb_reservalab.destroy({ where: { reservalab_id } });

        const asunto = 'Reserva Cancelada';
        const texto = `Su reserva para el laboratorio ha sido cancelada.`;

        await enviarCorreo(credencial.correo_electronico, asunto, texto);

        res.status(200).json({ message: 'Reserva cancelada y correo enviado' });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};

exports.modificarReserva = async (req, res) => {
    try {
        const { reservalab_id, fechaing, hora_inicio, hora_fin } = req.body;

        let fecha = new Date(fechaing);

        await tb_horarioreserva.update({ fecha, hora_inicio, hora_fin }, { where: { reservalab_id } });

        const reserva = await tb_reservalab.findByPk(reservalab_id);
        const credencial = await tb_credenciales.findByPk(reserva.credencial_id);
        const laboratorio = await tb_laboratorio.findByPk(reserva.laboratorio_id);
        const asunto = 'Reserva Modificada';
        const texto = `Su reserva para el laboratorio ${laboratorio.nombre} ha sido modificada para el ${fecha} desde ${hora_inicio} hasta ${hora_fin}.`;

        await enviarCorreo(credencial.correo_electronico, asunto, texto);

        res.status(200).json({ message: 'Reserva modificada y correo enviado' });
    } catch (error) {
        console.error('Error al modificar la reserva:', error);
        res.status(500).json({ error: 'Error al modificar la reserva' });
    }
};
