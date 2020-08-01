import TimeEntry from './time-entry';
import Utils from '../common/utils';
import { timingSafeEqual } from 'crypto';
export default interface IJiraIssue {
    id : number,
    key : string, 
    statusCategory : string,
    assignee: string,
    summary: string,
    totalDuration?: string,
    totalDurationMillSeconds: number,
    estimatedDuration?: string,
    estimatedDurationMillSeconds: number,
    togglEntries? : TimeEntry[]
}

interface JiraIssueAPIResponse {
    expand : string,
    id : number,
    key : string,
    fields : { 
        project : any,
        status : any,
        assignee : any,
        summary : string,
        timeestimate : number
    }
}

export default class JiraIssue implements IJiraIssue{
    public id : number;
    public key : string;
    public statusCategory : string;
    public assignee : string;
    public summary : string;
    public totalDurationMillSeconds : number;
    public estimatedDurationMillSeconds : number;

    constructor(response : JiraIssueAPIResponse) {
        this.id = response.id;
        this.key = response.key;
        this.summary = response.fields.summary;
        this.statusCategory = (response.fields.status) ? response.fields.status.statusCategory.name : "";
        this.assignee = (response.fields.assignee) ? response.fields.assignee.displayName : "";
        this.estimatedDurationMillSeconds = (response.fields.timeestimate) ? response.fields.timeestimate : 0;
        this.totalDurationMillSeconds = 0; 
        this.estimatedDuration = Utils.segToTime(this.estimatedDurationMillSeconds);
        this.totalDuration = Utils.msToTime(this.totalDurationMillSeconds);
        this.togglEntries = [];
    }
}