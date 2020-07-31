import IControllerBase from "../common/icontroller-base";
import * as express from 'express';
import { Request, Response } from 'express';


export default class JiraController implements IControllerBase {

    public path = "/jira"; 
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(this.path + "/getProjects", this.index)
    }

    private index (req : Request, resp : Response) {
            resp.send("It works!");
    }

}