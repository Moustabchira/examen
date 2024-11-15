import * as status from "./constantes.js"
import artworkDataValidator from "./utils.js"
import ArtworkService from "./ArtWorkService.js"
import { Prisma } from "@prisma/client";

const prisma = new Prisma();

export default class ArtWorkController {
    artworkService;

    constructor(){
        this.artworkService = new ArtworkService();
    }

    async create(req, res) {
        const data = req.body;
        try{ 

            const artworkValidator = artworkDataValidator();
            for(let key in data){
                artworkValidator[key] = data[key];
            }
            const artwork = await this.artworkService.create(data);
            res.status(status.HTTP_200_OK).json(artwork);
           
        }catch(error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({
                error: `error`
            });
        }
        
    }
 
    async getAll(req, res) {

        try {
            const artworks = await this.artworkService.getAllArtwork();
            res.status(status.HTTP_200_OK).json(artworks);
        } catch(error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async update(req, res) {
        const artworkId = req.params.id;
        const artworkData = req.body;
        try {
            const artworkValidator = artworkDataValidator();
            for(let key in artworkData){
                artworkValidator[key] = artworkData[key];
            }
            const updatedArtwork = await artworkService.update(artworkId, artworkData);
            if (updatedArtwork) {
                res.json({ message: 'Artwork mis à jour avec succès', updatedUser });
            } else {
                res.status(status.HTTP_400_BAD_REQUEST).json({ error: 'User non trouvé' });
            }
        } catch (error) {
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
    }

    async delete(req, res) {
        const {id} = req.params.id;
        try {
            const deleteArtwork = await this.artworkService.delete(parseInt(id));
            res.status(status.HTTP_200_OK).json(deleteArtwork);
        } catch(error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async filter(req, res) {
        const { type, year, artist } = req.query;

        try {
            const filtersData = {};

            if (year) {
                filtersData.year = year; 
            }
            if (type) {
                filtersData.type = type;  
            }
            if (artist) {
                filtersData.artist = artist; 
            }
            const filteredArtworks = prisma.artwork.findAll({
                where: filters 
            });

            if (filteredArtworks.length === 0) {
                return res.status(status.HTTP_STATUS_NOT_FOUND).json({ message: 'Aucun oeuvre d\'art correspond' });
            }

            res.status(status.HTTP_200_OK).json({
                message: 'artwork retrouver avec succès!',
                data: filteredArtworks
            });
        } catch (error) {
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({
                message: 'Erreur de filtrage d\'un art d\'oeuvre',
                error: error.message
            });
        }
    }

    }

