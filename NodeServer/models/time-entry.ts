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
        }else {
            this.assignCategory();
        }
        this.durationMillSeconds = this.duration * 1000;
    }


    public assignCategory() {
        const categories = {
            refactoring : "ALPHA",
            bug_fix : "ALPHA",
            test_automation : "ALPHA",
            testing : "ALPHA",
            implementation : "ALPHA",
            refining : "ALPHA",
            code_review : "ALPHA",
            deployment : "ALPHA",
            tech_research : "ALPHA",
            qa_updates : "ALPHA",
            qa_testing : "ALPHA",
            _non_billable : "BETA",
            _video_review : "BETA",
            _pair_working : "BETA",
            _meeting: "BETHA",
            qa_automation : "OMEGA",
            planning: "OMEGA",
            design: "OMEGA",
            estimation: "OMEGA",
            coordination_work: "OMEGA",
            process: "OMEGA",
            training: "OMEGA",
            pm_admin: "OMEGA",
            accounting: "OMEGA",
            payroll: "OMEGA",
            invoices: "OMEGA",
            compliance: "OMEGA",
            admin: "OMEGA",
            onboarding: "OMEGA",
            off_boarding: "OMEGA",
            evaluation: "OMEGA",
            recruiting: "OMEGA",
            interviewing: "OMEGA"
        }
        let tag : string; 
        if(this.tags.length > 1) {
            this.category = categories[this.tags[1]];
        }else {
            this.category = categories[this.tags[0]];
        }
        
    }
}