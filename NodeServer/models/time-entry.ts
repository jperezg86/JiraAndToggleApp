export default interface ITimeEntry {
    id: number, 
    guid: string,
    wid: number,
    pid: number,
    billable: boolean,
    start: Date,
    stop: Date,
    duration: number,
    description: string,
    tags : string[],
    duronly: false,
    at: Date,
    uid: number
}

export default class TimeEntry implements ITimeEntry {
    constructor (
        public id: number, 
        public guid: string,
        public wid: number,
        public pid: number,
        public billable: boolean,
        public start: Date,
        public stop: Date,
        public duration: number,
        public description: string,
        public tags : string[],
        public duronly: false,
        public at: Date,
        public uid: number
    ) {}
}