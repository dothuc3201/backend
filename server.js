const express = require('express');
const path = require('path');
const cors = require('cors')
const {sequelize} = require('./models')
const {rootRouter} = require('./routers');
const app = express();

//app.use(express.json());
app.use(express.json({
  limit: '50mb'
}));

app.use(express.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));

app.use("/public", express.static(path.join(__dirname, './public')));

app.use(cors());

app.use('/api', rootRouter);  

app.listen(3002, async () => {
    console.log(`Example app listening at http://localhost:3002`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })