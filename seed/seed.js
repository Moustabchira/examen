import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const prisma = new PrismaClient()
const dataPath = "db_data_seed.json";
app.use(bodyParser.json());

async function seedRun() {
    const file = await fs.open(dataPath, 'r');
    const db_content = await file.readFile( {
        encoding: 'utf-8'
    });
    console.log(typeof db_content);
    const data = JSON.parse(db_content);
    console.log(data);
    file.close();
    for (const artwork of data) {
        await prisma.artwork.create({ data: artwork });
        console.log(`Inserer`);
    }
    prisma.artwork.create(db_content);
}

seedRun()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
    })