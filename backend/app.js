const express = require('express');
const RecordsRoutes=require('./routes/record');
const UserRoutes=require('./routes/user')
const middleware=require('./middleware/middleware')
const connectToDatabase=require('./db');
const authenticate = require('./middleware/auth');
  


const app=express();    

app.use(express.json());
connectToDatabase();

app.use('/api/records', authenticate, RecordsRoutes);
app.use('/api/users', UserRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports=app;