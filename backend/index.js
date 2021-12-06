const express = require('express');
const db = require('./config/db');
const cors = require('cors');
//importer le package HTTP de NODE JS pour avoir les outils pour créer le server
const http = require('http');
const app = express();
const path = require('path')
const userRoutes = require('./routes/user');
app.use(cors());
app.use(express.json())

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**a fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur*** */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

//gérer les problèmes de CORS (Cross - Origin - Request - Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/*  
// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM posts", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });*/
/*
//Route to get one post
app.get("/api/auth/login", (req,res)=>{
const password = req.body.password;
const email = req.body.email;
 db.query("SELECT email, password FROM user WHERE email = ?", email, password,
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });
*/
/*
app.get('/api/auth/login', (req, res, next)=> {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT email, password FROM user", [email, password], (err, result) => {
        if(err) {
            console.log("err");
            console.log(err);
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
        console.log("resultat---->")
   console.log(result)
   document.location.href = "/home";  
    })
    next();
})
*/

//************************************************************************************************************************** */
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
/*
// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })
*/
const server = http.createServer(app);
//**écouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console*/
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);