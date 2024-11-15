import { Prisma } from "@prisma/client";

const prisma = new Prisma();

export default class ArtWorkService {

    getAllArtwork() {
        try{
            return prisma.artwork.findMany();
        } catch(error) {
            throw new Error(error);
        }
    }
    
    getArtwork(_id) {
        try {
            return prisma.artwork.findUnique({
                where: {
                    id:_id
                }
            });
        } catch(error) {
            throw new Error(error);
        }
    }

    create(artwork_data) {
        try {
            return prisma.artwork.create(artwork_data);
        } catch(error) {
            throw new Error(error);
        }
    }

    
    update(id, ertwork_data) {
        return {};
    }

    delete(id) {
        return {};
    }
}

