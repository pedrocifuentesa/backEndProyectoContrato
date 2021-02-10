//modulos Terceros

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');
require('dotenv').config()

// rutas
const routersV1 = require('./routes/v1/routes');
const app = express();

//console.log(process.env.NODE_ENV);

app.use(cors({
  credentials: true,
  origin: true
}));
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization','Authentication');
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'SisContratos',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  httpOnly: false
}));

routersV1(app);

app.use( (error, req, res, next) =>{
    console.log(error);
    const status= error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
      result: false,
      message: message,
      data: data
    })
  });

app.listen(process.env.PORT ,()=>{
  console.log('Server ok');
})