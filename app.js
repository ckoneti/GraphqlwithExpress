import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import {schema} from "./schemaDefinition/queries/schema.js";
const app = express()
const port = 8000
app.all('/graphql', createHandler({schema}));

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})