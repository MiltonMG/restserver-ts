import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'

//Rutas
import userRoutes from '../routes/usuario.routes';
import db from '../db/connection';


class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        //iniciando middlewares
        this.middlewares();

        //iniciando mis rutas 
        this.routes();


    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    //Conectar BD
    async dbConnection() {

        try {
            await db.authenticate();
            console.log('db online');
            

        } catch (error) {
            throw new Error(error as string);
        }

    }


    listen() {

        this.app.listen(  this.port, () => {
            console.log('Servidor corriendo en puerto!! ',this.port);
            
        })

    }


}

export default Server;



