import IControllerBase from "../common/icontroller-base";
import * as express from 'express';
import { Request, Response } from 'express';
import * as JiraAPI from 'jira-client';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import JiraIssue from '../models/jira-issue';
import Project from "../models/jira-project";


export default class JiraController implements IControllerBase {

    public path = "/jira"; 
    public router = express.Router();
    private static instance : JiraController;

    private jira = new JiraAPI({
        protocol : 'https',
        host: 'stackitchallenge.atlassian.net/',
        username : process.env.JIRA_USER_NAME,
        password : process.env.JIRA_API_KEY,
        apiVersion : '2',
        strictSSL : true
    });

    private constructor() {
        this.initRoutes();
    }

    public static getInstance() : JiraController {
        if(!JiraController.instance) {
            JiraController.instance = new JiraController();
        }
        return JiraController.instance;
    }

    initRoutes() {
        this.router.get(this.path + "/getBoards", this.getBoards);
        this.router.get(this.path + "/getProjects/:boardId", this.getProjects);
        this.router.get(this.path + "/getIssuesByBoard/:boardId",this.getIssuesByBoard);
        this.router.get(this.path + "/getIssuesByProjectId/:projectId", this.getIssuesByProjectIdReq);
        this.router.get(this.path + "/getProjectDetails/:projectId", this.getProjectDetailsReq);
    }

    private getBoards = (req : Request, resp : Response) => {
        this.jira.getAllBoards()
        .then(issue => {
          resp.send(issue);
        })
        .catch(err => {
          resp.send(err);
        });
    }

    private getIssuesByProjectIdReq = (req : Request, resp : Response) =>  {
        this.getIssuesByProjectId(req.params.projectId).subscribe ({
            next : (success) => {
                resp.send(success);
            },
            error : (error) => {
                resp.send(error);
            }
        });
    }

    private getProjects = (req : Request, resp : Response) =>  {
        this.jira.getProjects(req.params.boardId).then(
            (success) => resp.send(success),
            (error) => resp.send(error)
        );
    }  

    private getIssuesByBoard = (req: Request, resp : Response) => {
        this.getIssuesForBoard(parseInt(req.params.boardId)).subscribe(
            {
                next : (success)=> resp.send(success),
                error : (error) => resp.send(error)
            }
        );
    }

    private getProjectDetailsReq = (req : Request, resp : Response) => {
        this.getIssuesByProjectId(req.params.projectId).pipe(
            map( issues => {
                let project = (issues.length > 0) ? new Project(issues[0].fields.project) : null;
                if(project) {
                    issues.forEach( (jiraResponseAPI) => {
                        project.jiraIssues.push(new JiraIssue(jiraResponseAPI));
                    });
                }
                
                return project;
            })
        ).subscribe( {
            next : (response : Project) => {
                resp.send(response);
            },
            error : (error) => {
                resp.send(error);
            }
        } );
    }

    public getIssuesForBoard(boardId : number) : Observable<any> {
        return new Observable((subscriber)=> {
            this.jira.getIssuesForBoard(boardId).then((success)=> {
                subscriber.next(success);
            },
            (error)=> {
                subscriber.error(error);
            })
        });
    }

    public getIssuesByProjectId(projectId : any) : Observable<any> {
        return new Observable((subscriber)=> {
            this.jira.searchJira(`project=${projectId}`).then((success)=> {
                subscriber.next(success.issues);
            },
            (error)=> {
                subscriber.error(error);
            })
        });
    }
}