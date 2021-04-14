import { PersonDto } from "./personDto";

export class PersonAbsenceDto {
    id: string|undefined;
    person: PersonDto|undefined;
    year: number|undefined;
    month: number|undefined;
    date: String|undefined;  
    type: String|undefined; 
    constructor() {}
}
  