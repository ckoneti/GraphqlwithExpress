import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import {schema} from "./schemaDefinition/queries/schema.js";
import mongoose from 'mongoose'
const app = express()
const port = 8001
//connect to mongo db
mongoose.connect('mongodb+srv://admin:admin@cluster0.kimditr.mongodb.net/')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.all('/graphql', createHandler({schema}));
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})
