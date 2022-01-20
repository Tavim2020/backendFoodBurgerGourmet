import { Router } from 'express';
import multer from 'multer';
import listBurgersController from './controllers/listBurgersController';
import path from 'path';


import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/burgerList', listBurgersController.index);

routes.get('/admin', (req, res)=> res.sendFile(path.join(__dirname, '.', 'html', 'index.html')));



routes.post('/burgerupload', upload.array('images'), listBurgersController.create);

routes.post('/validateAdmin', (req, res) => {
    const {username, password} = req.body;

    if(username === `${process.env.USERNAMEADMIN}` && password === `${process.env.PASSWORD}`){

        return res.status(200).json({ message: 'Login Efetuado'});
    }
    else{

        return res.status(400).json({ message: 'Username ou Password Errado'});
    }

})



routes.put('/burgerList', listBurgersController.update);




routes.delete('/burgerList', listBurgersController.delete);



export default routes;