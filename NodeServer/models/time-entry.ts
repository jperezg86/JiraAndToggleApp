export default interface ITimeEntry {
    id: number,
    desc: string,
    start: string,
    stop: string,
    duration: string,
    durationMillSeconds: number,
    tags : string[], 
    category: string
}

export default class TimeEntry implements ITimeEntry {
    constructor (
       public id: number,
       public desc: string,
       public start: string,
       public stop: string,
       public duration: string,
       public durationMillSeconds: number,
       public tags : string[], 
       public category: string
    ) {}
}