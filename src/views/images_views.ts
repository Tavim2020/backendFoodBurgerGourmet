import Image from '../models/image';

export default {
    render(image: Image){
        return {
            id: image.id,
            url: `http://localhost:4343/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]){
        return images.map(image => this.render(image))
    }
}