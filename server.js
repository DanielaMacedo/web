

  const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require("multer");
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +  '/public'));

app.set('view engine', 'ejs');
// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'monse',
  password: '12345678',
  database: 'anuarios',
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos: ', error);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});
//Configuracion multer
const upload = multer({
  dest: 'public/img',
  fileFilter: function(req, file, cb){
  if(!file.originalname.match(/\.(jpg|jpeg)$/)){
      return cb(new Error('Solo se permiten archivos JPG'));
  }
  cb(null, true);
  }// fin filefilter
}) // fin multer
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
app.post("/agregar", upload.single('file'),(req,res)=>{
  var code = req.body.num;
  var name = req.body.nombre;
  var apepar = req.body.apepa;
  var apemar = req.body.apema;
  var car = req.body.carrera;
  var se = req.body.sem;
  var correo= req.body.email;
  var contra = req.body.pass;
  var des = req.body.descripcion;
  var inter = req.body.intAca;
  var habi = req.body.hab;
  var forta= req.body.fort;
  var corto = req.body.obcorpla;
  var largo = req.body.oblarpla;
  var picture = req.file.filename;
  const dominioCorrecto = /@vallarta\.tecmm\.edu\.mx$/i.test(correo);
  if (!dominioCorrecto) {
    // El correo no tiene el dominio correcto, mostrar un mensaje de error
    res.send("El correo debe tener el dominio @vallarta.tecmm.edu.mx");
    res.render('alumnos.ejs')
  } else { 
  console.log(req.file);
  console.log('CONECTADO');
  var sql = 'INSERT INTO alumnos (Num_control, nombre, apellido_paterno, apellido_materno, carrera, semestre, correo, contrasena, fotografia, descripcion, intereses_academicos, habilidades, fortalezas, objetivos_corto_plazo, objetivos_largo_plazo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  connection.query(sql, [code, name, apepar, apemar, car, se, correo, contra, picture, des, inter, habi, forta, corto, largo], function(err, result){
      if(err) throw err;
      console.log("Numero de registros insertados: " + result.affectedRows);
      console.log(code, name, apepar, apemar, car, se, correo, contra, picture, des, inter, habi, forta, corto, largo);
      req.session.alumnoId = code;
      res.redirect('/homealu');
  });
}
});

app.post("/agregardoc", upload.single('file'),(req,res)=>{
  var code = req.body.num;
  var name = req.body.nombre;
  var apepar = req.body.apepa;
  var apemar = req.body.apema;
  var car = req.body.carrera;
  var se = req.body.sem;
  var correo= req.body.email;
  var contra = req.body.pass;
  var des = req.body.descripcion;
  var inter = req.body.intAca;
  var habi = req.body.hab;
  var forta= req.body.fort;
  var corto = req.body.obcorpla;
  var largo = req.body.oblarpla;
  var picture = req.file.filename;
  const dominioCorrecto = /@vallarta\.tecmm\.edu\.mx$/i.test(correo);
  if (!dominioCorrecto) {
    // El correo no tiene el dominio correcto, mostrar un mensaje de error
    res.send("El correo debe tener el dominio @vallarta.tecmm.edu.mx");
    res.render('alumnosdoc.ejs')
  } else { 
  console.log(req.file);
  console.log('CONECTADO');
  var sql = 'INSERT INTO alumnos (Num_control, nombre, apellido_paterno, apellido_materno, carrera, semestre, correo, contrasena, fotografia, descripcion, intereses_academicos, habilidades, fortalezas, objetivos_corto_plazo, objetivos_largo_plazo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  connection.query(sql, [code, name, apepar, apemar, car, se, correo, contra, picture, des, inter, habi, forta, corto, largo], function(err, result){
      if(err) throw err;
      console.log("Numero de registros insertados: " + result.affectedRows);
      console.log(code, name, apepar, apemar, car, se, correo, contra, picture, des, inter, habi, forta, corto, largo);
      req.session.alumnoId = code;
      res.redirect('/homedoc');
  });
}
});

app.post('/login', (req, res) => {
  const tipoUsuario = req.body.tipoUsuario;
  const correo = req.body.email;
  const contrasena = req.body.pass;

  let consultaSql = '';
  let vista = '';

  if (tipoUsuario === 'alumno') {
    consultaSql = 'SELECT * FROM alumnos WHERE correo = ? AND contrasena = ?';
    vista = 'homealu.ejs';
  } else if (tipoUsuario === 'docente') {
    consultaSql = 'SELECT * FROM docentes WHERE correo = ? AND contrasena = ?';
    vista = 'homedoc.ejs';
  } else {
    // Tipo de usuario inválido
    return res.send('Tipo de usuario inválido');
  }

  // Realiza la consulta a la base de datos
  connection.query(consultaSql, [correo, contrasena], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // Inicio de sesión exitoso
      const alumno = result[0];
      // Establecer la sesión del alumno
      req.session.alumnoId = alumno.Num_control;

      if (tipoUsuario === 'alumno') {
        const sql = 'SELECT * FROM proyectos WHERE Num_control = ?'; // Consulta condicionada por el número de control o cualquier otro identificador del usuario
        connection.query(sql, [alumno.Num_control], (err, rows) => {
          if (err) throw err;
          const proyectos = rows;

          res.render(vista, { alumno, proyectos }); // Renderizar la plantilla correspondiente y pasar tanto el usuario como los proyectos
        });
      } else if (tipoUsuario === 'docente') {
        const sql = 'SELECT * FROM alumnos'; // Consulta para obtener todos los alumnos
        connection.query(sql, (err, rows) => {
          if (err) throw err;
          const alumnos = rows;

          res.render(vista, { alumno, alumnos }); // Renderizar la plantilla correspondiente y pasar tanto el usuario como los alumnos
        });
      }
    } else {
      // Credenciales incorrectas
      res.render('login.ejs');
    }
  });
});

app.post("/nuevo", upload.single('file'), (req, res) => {
  var code = req.body.num;
  var name = req.body.titulo;
  var des = req.body.descripcion;
  var mate = req.body.mat;
  var picture = req.file.filename;
  var autor = req.body.autor;

  var sql = 'INSERT INTO proyectos (Num_control, titulo, descripcion, materia, imagenes, autor) VALUES(?,?,?,?,?,?)';
  connection.query(sql, [code, name, des, mate, picture, autor], function(err, result){
    if(err) throw err;
    console.log("Número de registros insertados: " + result.affectedRows);
    console.log(code, name, des, mate, picture, autor);
     // Realiza una consulta adicional para obtener los datos actualizados del alumno y los proyectos
     const alumnoSql = 'SELECT fotografia, nombre FROM alumnos WHERE Num_control = ?';
     connection.query(alumnoSql, [code], function(err, alumnoResults) {
       if (err) throw err;
 
       const proyectosSql = 'SELECT * FROM proyectos WHERE Num_control = ?';
       connection.query(proyectosSql, [code], function(err, proyectosResults) {
         if (err) throw err;
 
         // Renderiza la plantilla homealu.ejs con los datos actualizados del alumno y los proyectos
         res.render('homealu.ejs', { alumno: alumnoResults[0], proyectos: proyectosResults });
       });
     });
  });
  
});

app.post("/nuevodoc", upload.single('file'), (req, res) => {
  var code = req.body.num;
  var name = req.body.titulo;
  var des = req.body.descripcion;
  var mate = req.body.mat;
  var picture = req.file.filename;
  var autor = req.body.autor;

  var sql = 'INSERT INTO proyectos (Num_control, titulo, descripcion, materia, imagenes, autor) VALUES(?,?,?,?,?,?)';
  connection.query(sql, [code, name, des, mate, picture, autor], function(err, result){
    if(err) throw err;
    console.log("Número de registros insertados: " + result.affectedRows);
    console.log(code, name, des, mate, picture, autor);
     // Realiza una consulta adicional para obtener los datos actualizados del alumno y los proyectos
     const alumnoSql = 'SELECT fotografia, nombre FROM alumnos WHERE Num_control = ?';
     connection.query(alumnoSql, [code], function(err, alumnoResults) {
       if (err) throw err;
 
       const proyectosSql = 'SELECT * FROM proyectos WHERE Num_control = ?';
       connection.query(proyectosSql, [code], function(err, proyectosResults) {
         if (err) throw err;
 
         // Renderiza la plantilla homealu.ejs con los datos actualizados del alumno y los proyectos
         res.render('hproyect', { alumno: alumnoResults[0], proyectos: proyectosResults });
       });
     });
  });
  
});
// Ruta para mostrar la página principal una vez que el alumno ha iniciado sesión
app.get('/homealu', function async (req, res) {
  // Obtener los datos del alumno logueado desde la base de datos
  const alumnoId = req.session.alumnoId;
  const alumnoSql = 'SELECT fotografia, nombre FROM alumnos WHERE Num_control = ?'; // Reemplaza "id" con el campo que identifique al alumno logueado
  connection.query(alumnoSql, [alumnoId], function(err, results) {
    if (err) throw err;

    if (results.length > 0) {
      const alumno = results[0];
      const proyectosSql = 'SELECT * FROM proyectos WHERE Num_control = ?';
      connection.query(proyectosSql, [alumnoId], function(err, proyectosResults) {
        if (err) throw err;

        res.render('homealu.ejs', { alumno, proyectos: proyectosResults });
      });
    } else {
      // No se encontró el alumno en la base de datos
      console.log('No se encontró el alumno en la base de datos');
      res.redirect('/login');
    }
  });
});
app.get('/buscar', (req, res) => {
  const alumnoId = req.query.num_control; // Obtener el número de control desde los parámetros de la URL

  // Consulta para obtener los datos del alumno
  const sqlAlumno = 'SELECT * FROM alumnos WHERE Num_control = ?';
  connection.query(sqlAlumno, [alumnoId], (err, alumnoResult) => {
    if (err) throw err;

    if (alumnoResult.length === 0) {
      // Manejo de error si el alumno no existe
      res.send('Alumno no encontrado');
    } else {
      const alumno = alumnoResult[0];

      // Consulta para obtener los proyectos del alumno
      const sqlProyectos = 'SELECT * FROM proyectos WHERE Num_control = ?';
      connection.query(sqlProyectos, [alumnoId], (err, proyectosResult) => {
        if (err) throw err;

        const proyectos = proyectosResult;

        res.render('biografia.ejs', { alumno, proyectos });
      });
    }
  });
});
app.get('/buscar/:num_control', (req, res) => {
  const alumnoId = req.params.num_control; // Obtener el número de control desde los parámetros de la URL

  // Consulta para obtener los datos del alumno
  const sqlAlumno = 'SELECT * FROM alumnos WHERE Num_control = ?';
  connection.query(sqlAlumno, [alumnoId], (err, alumnoResult) => {
    if (err) throw err;

    if (alumnoResult.length === 0) {
      // Manejo de error si el alumno no existe
      showModal('Alumno no encontrado');
    } else {
      const alumno = alumnoResult[0];

      // Consulta para obtener los proyectos del alumno
      const sqlProyectos = 'SELECT * FROM proyectos WHERE Num_control = ?';
      connection.query(sqlProyectos, [alumnoId], (err, proyectosResult) => {
        if (err) throw err;

        const proyectos = proyectosResult;

        res.render('biografia.ejs', { alumno, proyectos });
      });
    }
  });
});

app.get('/homedoc', (req, res) => {
  // Realiza la consulta a la base de datos para obtener la lista de alumnos
  const sql = 'SELECT * FROM alumnos';
  connection.query(sql, (err, alumnos) => {
    if (err) throw err;

    res.render('homedoc.ejs', { alumnos });
  });
});


app.post('/eliminar-alumno', (req, res) => {
  const alumnoId = req.body.alumnoId; // Obtener el ID del alumno desde el formulario

  // Consulta para eliminar el alumno de la base de datos
  const sql = 'DELETE FROM alumnos WHERE Num_control = ?';
  connection.query(sql, [alumnoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el alumno: ' + err.stack);
      res.sendStatus(500);
      return;
    }

    res.redirect('/homedoc'); // Redirigir de vuelta a la página principal después de eliminar
  });
});
app.get('/modificar-alumno', (req, res) => {
  const alumnoId = req.query.id; // Obtener el ID del alumno de la consulta

  // Obtener el alumno de la base de datos usando el ID
  connection.query('SELECT * FROM alumnos WHERE Num_control = ?', [alumnoId], (err, result) => {
    if (err) throw err;

    const alumno = result[0];
    res.render('modificar-alumno.ejs', { alumno }); // Renderizar la vista de modificación del alumno
  });
});
app.post('/modificar-alumno', upload.single('file'), (req, res) => {
  var code = req.body.num;
  var name = req.body.nombre;
  var apepar = req.body.apepa;
  var apemar = req.body.apema;
  var car = req.body.carrera;
  var se = req.body.sem;
  var correo= req.body.email;
  var contra = req.body.pass;
  var des = req.body.descripcion;
  var inter = req.body.intAca;
  var habi = req.body.hab;
  var forta= req.body.fort;
  var corto = req.body.obcorpla;
  var largo = req.body.oblarpla;
  var picture = req.file.filename;
  // Obtener los demás datos del formulario

  // Realizar la actualización del alumno en la base de datos
  connection.query('UPDATE alumnos SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, carrera = ?, semestre = ?,  correo = ?, contrasena = ?, fotografia = ?, descripcion = ?, intereses_academicos = ?, habilidades = ?, fortalezas = ?, objetivos_corto_plazo = ?, objetivos_largo_plazo = ? WHERE Num_control = ?', [ name, apepar, apemar, car, se, correo, contra, picture, des, inter, habi, forta, corto, largo, code], (err, result) => {
    if (err) throw err;

    res.redirect('/homedoc'); // Redirigir a la vista principal después de la modificación
  });
});

app.post('/eliminar-proyecto', (req, res) => {
  var proyectoId = req.body.proyectoId;

  // Consulta para eliminar el alumno de la base de datos
  const sql = 'DELETE FROM proyectos WHERE id = ?';
  connection.query(sql, [proyectoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el proyecto: ' + err.stack);
      res.sendStatus(500);
      return;
    }

    res.redirect('/homealu'); // Redirigir a la vista principal después de eliminar el proyecto
  });
});
app.get('/modificar-proyecto', (req, res) => {
  const proyectoId = req.query.id; // Obtener el ID del alumno de la consul
  // Obtener el alumno de la base de datos usando el ID
  connection.query('SELECT * FROM proyectos WHERE id = ?', [proyectoId], (err, result) => {
    if (err) throw err;

    const proyecto = result[0];
    res.render('modificar-proyecto.ejs', { proyecto }); // Renderizar la vista de modificación del alumno
  });
});

app.post('/modificar-proyecto', upload.single('file'), (req, res) => {
  const proyectoId = req.body.proyectoId;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const materia = req.body.mat;
  const autor = req.body.autor;
  const imagen = req.file.filename;

  // Realiza la actualización del proyecto en la base de datos
  connection.query('UPDATE proyectos SET titulo = ?, descripcion = ?, materia = ?, autor = ?, imagenes = ? WHERE id = ?',
    [titulo, descripcion, materia, autor, imagen, proyectoId],
    (err, result) => {
      if (err) throw err;

      res.redirect('/homealu'); // Redirige a la página de proyectos después de la modificación
    });
});
app.get('/', function(req, res) {
  // Realiza la consulta a la base de datos para obtener los alumnos
  const sql = 'SELECT * FROM alumnos';
  connection.query(sql, function(err, results) {
    if (err) throw err;

    // Renderiza la vista index.ejs y pasa los datos de los alumnos
    res.render('index.ejs', { alumnos: results });
  });
});
app.get('/proyectos', (req, res) => {
  // Consulta para obtener todos los proyectos
  const sqlProyectos = 'SELECT * FROM proyectos';
  connection.query(sqlProyectos, (err, proyectosResult) => {
    if (err) throw err;

    const proyectos = proyectosResult;

    res.render('mostrarProyectos.ejs', { proyectos });
  });
});

app.get('/alumnos', (req, res) => {
  // Consulta para obtener todos los proyectos
  const sqlAlumnos = 'SELECT * FROM alumnos';
  connection.query(sqlAlumnos, (err, alumnosResult) => {
    if (err) throw err;

    const alumnos = alumnosResult;

    res.render('mostrarAlumnos.ejs', { alumnos });
  });
});




app.get('/hproyect', (req, res) => {
  // Realiza la consulta a la base de datos para obtener la lista de alumnos
  const sql = 'SELECT * FROM proyectos';
  connection.query(sql, (err, proyectos) => {
    if (err) throw err;

    res.render('hproyect.ejs', { proyectos });
  });
});



app.post('/eliminar-proyectos', (req, res) => {
  var proyectoId = req.body.proyectoId;

  // Consulta para eliminar el alumno de la base de datos
  const sql = 'DELETE FROM proyectos WHERE id = ?';
  connection.query(sql, [proyectoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el proyecto: ' + err.stack);
      res.sendStatus(500);
      return;
    }

    res.redirect('hproyect'); // Redirigir a la vista principal después de eliminar el proyecto
  });
});
app.get('/modificar-proyectos', (req, res) => {
  const proyectoId = req.query.id; // Obtener el ID del alumno de la consul
  // Obtener el alumno de la base de datos usando el ID
  connection.query('SELECT * FROM proyectos WHERE id = ?', [proyectoId], (err, result) => {
    if (err) throw err;

    const proyecto = result[0];
    res.render('modificar-proyectodoc.ejs', { proyecto }); // Renderizar la vista de modificación del alumno
  });
});

app.post('/modificar-proyectos', upload.single('file'), (req, res) => {
  const proyectoId = req.body.proyectoId;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const materia = req.body.mat;
  const autor = req.body.autor;
  const imagen = req.file.filename;

  // Realiza la actualización del proyecto en la base de datos
  connection.query('UPDATE proyectos SET titulo = ?, descripcion = ?, materia = ?, autor = ?, imagenes = ? WHERE id = ?',
    [titulo, descripcion, materia, autor, imagen, proyectoId],
    (err, result) => {
      if (err) throw err;

      res.redirect('hproyect'); // Redirige a la página de proyectos después de la modificación
    });
});





app.get('/login', (req, res) => {
    res.render('login.ejs');
  });
app.get('/alumnos/agregar', (req, res) => {
    res.render('alumnos.ejs');
});
app.get('/alumnos/agregardoc', (req, res) => {
  res.render('alumnosdoc.ejs');
});
app.get('/proyectos/nuevo', (req, res) => {
  res.render('proyectos.ejs');
});
app.get('/proyectos/nuevodoc', (req, res) => {
  res.render('proyectosdoc.ejs');
});
app.get('/index', (req, res) => {
  res.render('index.ejs');
});






app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
  });