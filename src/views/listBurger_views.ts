import listBurger from '../models/listBurger';
import imagesViews from './images_views';

export default {
    render(burger: listBurger){
        return {
            id: burger.id,
            title: burger.title,
            price: burger.price,
            type: burger.type,
            ingredient: burger.ingredient,
            avaliation: burger.avaliation,
            images: imagesViews.renderMany(burger.images)
        }
    },

    renderMany(burgers: listBurger[]){
        return burgers.map(burger => this.render(burger))
    }
}