import IControllerBase from "../common/icontroller-base";
import * as express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import { Observable } from "rxjs";
import { filter, throttleTime, map} from 'rxjs/operators';
import Project from "../models/jira-project";
import TimeEntry from '../models/time-entry';
import ITimeEntry  from '../models/time-entry';
export default class ToggleController implements IControllerBase {
    public path : string = "/toggl";
    public router = express.Router();
    
    private static instance : ToggleController = null;
    
    initRoutes() {
        this.router.get(`${this.path}/`,this.home);
        this.router.get(`${this.path}/getTimeEntries/:issueKey`,this.getTimeEntriesByProjectKeyReq);
    }

    private constructor() {
        this.initRoutes();
    }

    private home = (req: Request, resp : Response)=> {
        this.getTimeEntries().subscribe({
            next : (success : TimeEntry[])=> {
                resp.send(success);
            },
            error : (fail) => {
                resp.send(fail);
            }
        });
    };

    private getTimeEntriesByProjectKeyReq  = async (req: Request, resp : Response) => {
        const matchEntries = this.getTimeEntries()
        .pipe( 
            map( (data) => {
               return data.filter((value) => {
                    if(value.desc) {
                        return value.desc.includes(req.params.issueKey);
                    }
                })
            })
        ).subscribe( (success) => {
            resp.send(success);
        },(error)=> {
            resp.send(error);
        })
        
    } 

    public static getInstance() : ToggleController {
        if(!ToggleController.instance){
            ToggleController.instance = new ToggleController();
        }
        return ToggleController.instance;
    }

    

    public getTimeEntries() : Observable<TimeEntry[]> {
        return new Observable( (observer)=> {
            axios.get("https://www.toggl.com/api/v8/me", {
                params : {
                    with_related_data : true
                },
                auth : {
                    username : process.env.TOGGL_API_KEY,
                    password : "api_token"
                }
            }).then(
                (success) => {
                    let toReturn : TimeEntry[] = [];
                    success.data.data.time_entries.forEach((item)=> {
                        let timeEntry = new TimeEntry(item.id,item.description,item.start,item.stop,item.duration);
                        if(item.tags) {
                            timeEntry.tags = item.tags;
                            timeEntry.assignCategory();
                        }
                        toReturn.push(timeEntry);
                    });
                    observer.next(toReturn);
                },
                (fail) => observer.error(fail),
            );
        });
        
    }

    //  public getTimeEntriesByProjectKey(projectKey : string) {
    //     return this.getTimeEntries().pipe( 
    //         filter( value => value.description.toLowerCase().includes(projectKey.toLowerCase()))
    //     );
    // }


}