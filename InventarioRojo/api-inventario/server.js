const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors());


// Configuracion de la base de datos

const connection = mysql.createConnection({
    host: 'srv1247.hstgr.io',
    user:'u475816193_Inventario',
    password:'Materiales123@',
    database:'u475816193_Inventario',

})

//este es para conectar la base da deatos y manejar  los errores

connection.connect((err) =>{
    if (err) {
        console.error('Error conectado a la base de datos:', err)
        return;
    }
    console.log('Conexion exitosa a la base de datos')
})



app.get('/Administrativo',(req,res) =>{
const sql = 'SELECT * from Administrativo'

connection.query (sql, (err,results) =>{
    if(err){
        console.error('error al buscar Administrador', err)
        return res.status(500).json({error: err.message})
    }
    res.json(results)
})
})

app.post('/Materiales',(req, res) => {
    const { nombre, unidad, metros_disponibles, precio} = req.body;

    const sql = 'INSERT INTO Materiales (nombre, unidad, metros_disponibles, precio) VALUES (?,?,?,?)'

    connection.query(sql, [nombre, unidad, metros_disponibles, precio], (err, results) =>{
        if (err){
            console.error('error al insertar Materiales', err)
            return res.status(500).json({ error: err.message})
        }
        res.status(201).json({id:results.insertId, nombre, unidad,metros_disponibles, precio})
    })
})

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto:${port}`)
})