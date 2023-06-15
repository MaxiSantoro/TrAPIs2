/*
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const { initialize, checkAuthenticated } = require('./auth.js');
const db = require('./db.js');
const setupSwagger = require('./swagger');
*/

import express from 'express';
import db from './db.js';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import { initialize, checkAuthenticated } from './auth.js';
import setupSwagger from './swagger.js';


class TrAPIsBackend {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));

    initialize(app); // Utilizamos el método initialize de auth.js
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Página de inicio de sesión
 *     responses:
 *       200:
 *         description: Devuelve la página HTML de inicio de sesión.
 */
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.post('/save/', this._doSave);
/**
* @swagger
* /auth/google/:
*   get:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: inicia el proceso de autenticación con Google cuando se accede a la ruta.
*/
app.get('/auth/google/', passport.authenticate('google', {
  scope: ['email', 'profile']
}));
/**
* @swagger
* /auth/google/callback:
*   get:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: permite al usuario cerrar sesión en la aplicación y redirigirlo a la página de inicio de sesión.
*/
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failure'
}));
/**
* @swagger
* /login/success:
*   get:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: establece una redirección desde la ruta después de un inicio de sesión exitoso.
*/
app.get('/login/success', (req, res) => {
    res.redirect('/index.html');        // Redirige a index.html en caso de éxito
});
/**
* @swagger
* /login/failure:
*   get:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description:  código configura la respuesta para la ruta indicando que el inicio de sesión ha fallado.
*/
app.get('/login/failure', (req, res) => {
  res.send('Inicio de sesión fallido');
});
/**
* @swagger
* /:
*   get:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: configura la respuesta para la ruta raíz de la aplicación y redirige o muestra el archivo "index.html" según el estado de autenticación del usuario.
*/
app.get('/', this._goHome.bind(this));
/**
* @swagger
* /auth/google/:
*   post:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: permite que un usuario cierre sesión en la aplicación enviando una solicitud POST a "/logout", finalizando la sesión y redirigiéndolo a la página de inicio de sesión.
*/
app.post("/logout", (req, res) => {
  req.logOut(err => console.log(err));
  res.redirect("/login");
});
/**
* @swagger
* /auth/google/:
*   post:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: configura un endpoint para buscar eventos mediante una solicitud.
*/
app.post("/search-events", async (req, res) => {
  const { query } = req.body;

  try {
    const events = await db.collection("Event").find({ nombre: { $regex: query, $options: "i" } }).toArray();

    res.json(events);
  } catch (error) {
    console.error("Error al buscar eventos en la base de datos:", error);
    res.status(500).json({ message: "Error al buscar eventos" });
  }
});

/**
* @swagger
* /auth/google/:
*   post:
*     summary: Página de inicio de sesión
*     responses:
*       200:
*         description: configura la ruta de logout y luego inicia el servidor para escuchar en el puerto 3000.
*/
app.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
setupSwagger(app);

    app.listen(3000, () => console.log('CORRIENDO en http://localhost:3000'));
  }

  _goHome(req, res) {
    if (req.isAuthenticated()) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
      res.redirect('/login');
    }
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const query = { word: word.toLowerCase() };
    const collection = db.collection("dict");
    const stored = await collection.findOne(query);
    const response = {
      word: word,
      definition: stored ? stored.definition : ''
    };
    res.json(response);
  }

  async _doSave(req, res) {
    const query = { word: req.body.word.toLowerCase() };
    const update = { $set: { definition: req.body.definition } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
}

new TrAPIsBackend();

