require('dotenv').config();
const express = require('express')
const app = express();

const useRoutes = require('./routes/index')

const port = 3000;
const db = require('./db');

app.use(express.json());
app.use('/', useRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    db.initDataBase().then(() => console.log('Sucesso ao conectar com o banco')).catch(error => console.log({ error }))
})