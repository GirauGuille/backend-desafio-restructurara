import mongoose from "mongoose";
import config from '../../config/config.js'

const URI = config.mongo_uri

mongoose
    .connect(URI)
    .then(() => console.log ('Conectado a la base de datos MONGDB-ELECTROGIRAU'))
    .catch ((error) => console.log(error))