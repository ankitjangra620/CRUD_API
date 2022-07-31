import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import mongoose from 'mongoose'

dotenv.config();
mongoose.connect(process.env.DB_URL,{useNewUrlParser : true,useUnifiedTopology: true})

const db = mongoose.connection.useDb("users");

db.once('open',()=>{
    console.log("Mongo Db connected successfully")
})
db.on('error',(error)=>{
    console.log(`Error occured while connecting to mongodb = ${error}`)
})
const app = express();

//middlewares
app.use(bodyParser.json());
app.use('/users',userRoutes)
app.use(function(req, res, next) {
    res.setTimeout(200);
    next();
});

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hello from Ankit")
})

app.listen(PORT,()=>{console.log(`Server is running at port ${PORT}`)})