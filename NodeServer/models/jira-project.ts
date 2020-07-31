interface IProject {
    id : string,
    key : string,
    name : string, 
    projectType : string,
    simplified : boolean
}

export default class Project implements IProject{
    constructor (
        public id : string,
        public key : string,
        public name : string, 
        public projectType : string,
        public simplified : boolean
    ) {
        
    }
}