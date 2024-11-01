const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Servir imágenes

// Configuración del pool de conexiones de la base de datos
const pool = mysql.createPool({
    host: 'srv1247.hstgr.io',
    user: 'u475816193_Inventario',
    password: 'Materiales123@',
    database: 'u475816193_Inventario',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta de almacenamiento
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre con fecha y extensión
    }
});
const upload = multer({ storage: storage });

// Endpoint para agregar materiales con imagen
app.post('/api/materiales', upload.single('imagen'), (req, res) => {
    const { nombre, metros_disponibles, precio } = req.body;
    const imagenPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nombre || metros_disponibles == null || precio == null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const sql = 'INSERT INTO Materiales (nombre, metros_disponibles, precio, imagen) VALUES (?, ?, ?, ?)';
    pool.query(sql, [nombre, metros_disponibles, precio, imagenPath], (err, results) => {
        if (err) {
            console.error('Error al insertar Material:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({
            id_material: results.insertId,
            nombre,
            metros_disponibles,
            precio,
            imagen_url: `http://localhost:3000${imagenPath}`
        });
    });
});

// Endpoint para obtener materiales con imagen
app.get('/api/materiales', (req, res) => {
    const sql = 'SELECT id_material, nombre, metros_disponibles, precio, imagen AS imagen_url FROM Materiales';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener materiales:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        // Agregar el prefijo a las URLs de imagen
        const materiales = results.map(material => ({
            ...material,
            imagen_url: material.imagen_url ? `http://localhost:3000${material.imagen_url}` : null
        }));
        res.json(materiales);
    });
});

// Endpoint para actualizar material (sin imagen)
app.put('/api/materiales/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, metros_disponibles, precio } = req.body;

    const sql = 'UPDATE Materiales SET nombre = ?, metros_disponibles = ?, precio = ? WHERE id_material = ?';
    pool.query(sql, [nombre, metros_disponibles, precio, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar material:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Material no encontrado" });
        }
        
        res.json({ message: 'Material actualizado' });
    });
});

// Endpoint para eliminar material
app.delete('/api/materiales/:id', (req, res) => {
    const { id } = req.params;

    console.log('Intentando eliminar material con ID:', id); // Agregado para depuración

    const sql = 'DELETE FROM Materiales WHERE id_material = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar material:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err.message }); // Detalles del error
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Material no encontrado" });
        }

        res.json({ message: 'Material eliminado' });
    });
});

// ===================== Nuevos Endpoints para MovimientosInventario ===================== //

// Endpoint para obtener el historial de movimientos
app.get('/api/movimientos', (req, res) => {
    const sql = 'SELECT id_movimiento, id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion FROM MovimientosInventario ORDER BY fecha_movimiento DESC';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener historial de movimientos:', err);
            return res.status(500).json({ error: 'Error en el servidor al obtener historial de movimientos', details: err.message });
        }
        res.json(results);
    });
});

// Endpoint para agregar un nuevo movimiento
app.post('/api/movimientos', (req, res) => {
    const { id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion } = req.body;
    const sql = 'INSERT INTO MovimientosInventario (id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion) VALUES (?, ?, ?, ?, ?)';
    pool.query(sql, [id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar movimiento:', err);
            return res.status(500).json({ error: 'Error en el servidor al agregar movimiento', details: err.message });
        }
        res.status(201).json({ id_movimiento: results.insertId, id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion });
    });
});

// Endpoint para actualizar un movimiento
app.put('/api/movimientos/:id', (req, res) => {
    const { id } = req.params;
    const { id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion } = req.body;
    const sql = 'UPDATE MovimientosInventario SET id_material = ?, tipo_movimiento = ?, cantidad = ?, fecha_movimiento = ?, descripcion = ? WHERE id_movimiento = ?';
    pool.query(sql, [id_material, tipo_movimiento, cantidad, fecha_movimiento, descripcion, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar movimiento:', err);
            return res.status(500).json({ error: 'Error en el servidor al actualizar movimiento', details: err.message });
        }
        res.json({ message: 'Movimiento actualizado', id_movimiento: id });
    });
});

// Endpoint para eliminar un movimiento
app.delete('/api/movimientos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM MovimientosInventario WHERE id_movimiento = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar movimiento:', err);
            return res.status(500).json({ error: 'Error en el servidor al eliminar movimiento', details: err.message });
        }
        res.json({ message: 'Movimiento eliminado', id_movimiento: id });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});
