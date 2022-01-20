import express from 'express';
import "./database/connection";
import fileupload from "express-fileupload";
import routes from './routes';
import path from 'path';
import bodyParser from 'body-parser';
// import 'express-async-errors';
// import errorHandler from './errors/handle';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))


app.use(fileupload()); 
app.use(express.static('public'));


app.use(routes);

// app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '.', 'uploads')));


const PORT = process.env.PORT || 4343;

app.listen(PORT);