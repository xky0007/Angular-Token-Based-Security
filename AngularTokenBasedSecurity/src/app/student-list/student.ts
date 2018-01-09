export interface IStudent {
    StudentId?: number,
    FirstName: string,
    LastName: string,
    Street: string,
    City: string,
    State: string,
    Email: string,
    Telephone: string
}

export class Student implements IStudent{
    constructor(       
        public FirstName: string,
        public LastName: string,
        public Street: string,
        public City: string,
        public State: string,
        public Email: string,
        public Telephone: string,
        public StudentId?:number,){
    }
}