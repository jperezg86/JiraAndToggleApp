import * as express from 'express';
import { Application } from 'express';
import AppSettings from './models/app-settings';

export default class App {
    public app : Application
    public port : number

    constructor(appInit : AppSettings){
        this.app = express();
        this.port = appInit.port;
        this.middleWares(appInit.middleWares);
        this.routes(appInit.controllers);
    }

    private routes(controllers : any[]) {
        controllers.forEach(controller => {
                this.app.use("/",controller.router);
        });
    }


    private middleWares(middleWares : any[]){
        middleWares.forEach((middleware) => {
                this.app.use(middleware);
        });
    }

    public listen() {
        this.app.listen(this.port, ()=> {
            console.log(`App listening on the http://localhost:${this.port}`);
        })
    }
}