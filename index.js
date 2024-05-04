const express = require('express');
const bofyparser = require('body-parser');
const db = require('./src/models/index');
const bodyParser = require('body-parser');

const sequelize = db.sequelize;

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

const categorieRoutes = require('./src/routes/CategorieRoutes');
const produitRoutes = require('./src/routes/ProduitRoutes.js');

app.use('/api', categorieRoutes);
app.use('/api', produitRoutes);

sequelize.authenticate()
.then(()=>{
    console.log('connection successfully');
})
.catch(err =>{
    console.error('unable to connect to database')
});

app.listen(PORT,()=> {
    console.log('server running on port ',PORT);
})