const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tb_credenciales, tb_estudiante, tb_profesor, tb_personaladmin } = require('../models');
const notificationService = require('../services/notificationService');


// Verificar si el correo ya existe
const emailExists = async (correo_electronico) => {
    const existingUser = await tb_credenciales.findOne({ where: { correo_electronico } });
    return !!existingUser;
};

// Registro de Estudiante
exports.registerEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo_electronico, contrasena } = req.body;

        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear estudiante
        const estudiante = await tb_estudiante.create({
            nombre,
            apellido,
            telefono,
            fecharegistro: new Date(),
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 1, // 1 para estudiante
            usuario_id: estudiante.estudiante_id
        });

        res.status(201).json({ message: 'Estudiante registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registro de Profesor
exports.registerProfesor = async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo_electronico, contrasena } = req.body;
        
        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear negocio
        const profesor = await tb_profesor.create({
            nombre,
            apellido,
            telefono,
            fecharegistro: new Date()
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 2, // 2 para profesor
            usuario_id: profesor.profesor_id
        });

        res.status(201).json({ message: 'Profesor registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registro de Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { nombre, correo_electronico, contrasena } = req.body;

        if (await emailExists(correo_electronico)) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear admin
        const admin = await tb_personaladmin.create({
            nombre//,
            //correo: correo_electronico,
            //password: hashedPassword,
        });

        // Crear registro de credenciales
        await tb_credenciales.create({
            correo_electronico,
            contrasena: hashedPassword,
            tipousuario: 3, // 3 para admin
            usuario_id: admin.personaladmin_id
        });

        res.status(201).json({ message: 'Admin registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { correo_electronico, contrasena } = req.body;

        // Buscar credenciales
        const credencial = await tb_credenciales.findOne({ where: { correo_electronico } });
        if (!credencial) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(contrasena, credencial.contrasena);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar token
        const token = jwt.sign({ id: credencial.credencial_id, tipousuario: credencial.tipousuario }, 'secret', { expiresIn: '1h' });
        const notificaciones = notificationService.getNotifications(user.credencial_id);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

