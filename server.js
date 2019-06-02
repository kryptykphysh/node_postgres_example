// server.js

import 'babel-polyfill';
import dotenv from 'dotenv';
import express from 'express';
import ReflectionWithJSObject from './src/usingJSObject/controllers/Reflection';
import ReflectionWithDB from './src/usingDB/controllers/Reflection';

dotenv.config();
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJSObject;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({ 'message': 'Yay! First endpoint working!' });
})
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

app.listen(3000)
console.log('app running on port ', 3000);
