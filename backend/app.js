require('dotenv').config();
const express = require('express')
const cors = require('cors')
const useRoutes = require('./routes/index')

const app = express();

const port = 3000;
const db = require('./db');

app.use(cors())
app.use(express.json());
app.use('/', useRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    db.initDataBase().then(() => console.log('Sucesso ao conectar com o banco')).catch(error => console.log({ error }))
})