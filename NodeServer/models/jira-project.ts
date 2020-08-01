import JiraIssue from './jira-issue';
interface IJiraProjectResponse {
    id : number,
    key : string,
    name : string, 
    projectType : string,
    simplified : boolean
}

interface IProject {
    projectID : number;
    jiraIssues : JiraIssue [];

}
export default class Project implements IProject{
    public projectID : number; 
    jiraIssues : JiraIssue[];

    constructor (jiraResponse : IJiraProjectResponse) {
        this.projectID = jiraResponse.id; 
        this.jiraIssues = [];
    }
}