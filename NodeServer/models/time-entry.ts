export default interface ITimeEntry {
    id: number,
    desc: string,
    start: string,
    stop: string,
    duration: number,
    durationMillSeconds: number,
    tags? : string[], 
    category: string
}

export default class TimeEntry implements ITimeEntry {
    public durationMillSeconds : number = 0; 
    public category : string = "";
    constructor (
       public id: number,
       public desc: string,
       public start: string,
       public stop: string,
       public duration: number,
       public tags? : string[], 
    ) {
        if(!tags) {
            this.tags = [];
        }

        this.durationMillSeconds = this.duration * 1000;
    }
}