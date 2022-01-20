import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import listBurger from '../models/listBurger';
import listBurgerViews from '../views/listBurger_views';



interface UpdateNew {
    title: string | undefined | any;
    price: number | undefined | any;
    type: string | undefined | any;
    ingredient: string | undefined | any;
    avaliation: number | undefined | any;
    images: (string | number)[] | any | undefined | object[] ;
}

export default {
    async index(req: Request, res: Response){
        const listBurgerRepository = getRepository(listBurger);

        const listBurgerListed = await listBurgerRepository.find({
            relations: ['images']
        }); 

        return res.json(listBurgerViews.renderMany(listBurgerListed))
    },
    async create(req: Request, res: Response){

        // console.log(req);

        const {
            title,
            price,
            type,
            ingredient,
            avaliation,
        } = req.body;

        const listBurgerRepository = getRepository(listBurger);

        const requestImages = req.files as unknown as Express.Multer.File[];

        const images = requestImages.map((images) => {
            return {
                path: images.fieldname
            }
        });

        console.log(title);

        const data = {
            title,
            price,
            type,
            ingredient,
            avaliation,
            images
        };

        console.log(data)

        if(data.title && data.price && data.type &&
           data.ingredient && data.avaliation === undefined &&
           data.images
           ){
                if(data.title.length < 3){
                    return res.status(400).json({ message: "Por favor insira um nome maior que 3 caracteres"});
                }
                else if(data.price <= 0 ){
                    return res.status(400).json({ message: "Por favor o valor do produto não pode ser menor ou igual a zero"});
                }
                else if(data.type.length < 3 ){
                    return res.status(400).json({ message: "Por favor coloque o tipo do lanche na descrição. Ex:Picanha, Vegano, etc..."});
                }
                else if(data.ingredient.length < 7){
                    return res.status(400).json({ message: "Por favor insira os ingredientes necessários para fazer a receita"});
                }
                else{
                    data.avaliation = 0;

                    console.log(data)

                    const ListBurgerCreate = listBurgerRepository.create(data);
                
                    await listBurgerRepository.save(ListBurgerCreate);
                
                    return res.status(201).json(ListBurgerCreate);
                }

           }
           else{
               return res.status(400).json({ message: "Por favor preencha todos os campos válidos"})
           }

    },

    async update(req: Request, res: Response){
        const {
            title,
            data,
        } = req.body;

        const listBurgerRepository = getRepository(listBurger);

        
        const updateBurger: UpdateNew = {
            title: '',
            price: '',
            type: '',
            avaliation: '',
            ingredient: '',
            images: []
        }

        try{
            const listBurgerRegister = await listBurgerRepository.findOneOrFail(
                { 
                    title,
                }, 
                {
                    relations: ['images']         
                }
            );
            

                if(data && listBurgerRegister){
                    if(data.title){
                        updateBurger.title = data.title;
                    }
                    else{
                        updateBurger.title = listBurgerRegister.title
                    }
        
                    if(data.price){
                        updateBurger.price = data.price;
                    }
                    else{
                        updateBurger.price = listBurgerRegister.price
                    }
        
                    if(data.type){
                        updateBurger.type = data.type;
                    }
                    else{
                        updateBurger.type = listBurgerRegister.type
                    }
        
                    if(data.avaliation){
                        updateBurger.avaliation = data.avaliation;
                    }
                    else{
                        updateBurger.avaliation = listBurgerRegister.avaliation
                    }
        
                    if(data.ingredient){
                        updateBurger.ingredient = data.ingredient;
                    }
                    else{
                        updateBurger.ingredient = listBurgerRegister.ingredient
                    }
        
                    if(data.images){
                        updateBurger.images = data.images;
                    }
                    else{
                        updateBurger.images = listBurgerRegister.images;
                    }
        
                }
        
        
                if(listBurgerRegister.title && updateBurger){
                    await listBurgerRepository.update(listBurgerRegister.id, { 
                        title: updateBurger.title,
                        price: updateBurger.price,
                        type: updateBurger.type,
                        ingredient: updateBurger.ingredient,
                        avaliation: updateBurger.avaliation,
                    }); 
        
                    return res.status(200).json({message: 'Update Successful'});
                }
            }
        catch(error){
            return res.status(400).json({ message: 'oooopss... Nome não encontrado!' })         
        }
    },

    async delete(req: Request, res: Response){
        const {
            title,
        } = req.body;

        const listBurgerRepository = getRepository(listBurger);

        
        try{
            await listBurgerRepository.findOneOrFail(
                {
                    title
                },
                {
                    relations: ['images']
                }
            )
            await listBurgerRepository.delete({ 
                title: `${title}`
            });

            
            return res.status(200).json({message: 'Burger Deletado.'});  

        }

        catch(error){

            return res.status(400).json({message: 'Burger Não Encontrado.'});       
        }

    }
}