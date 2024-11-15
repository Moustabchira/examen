import express from "express";
import artworkDataValidator from "./utils.js"
import ArtWorkController from "./ArtWorkController.js";

export default (app) => {
    app.use('/test', (_, res) =>{
        res.send('test');
    });

    app.post('/artworks', artworkDataValidator,ArtWorkController.create());

    app.get('/artworks', ArtWorkController.getAll());

    app.pust('/artworks/:id', artworkDataValidator,ArtWorkController.update());

    app.Delete('/artworks/:id', ArtWorkController.delete());

    app.get('artworks/filter', ArtWorkController.filter());
}