import { PersonDto } from "./personDto";

export class PersonAbsenceDto {
    id: string|undefined;
    person: PersonDto|undefined;
    year: number|undefined;
    month: number|undefined;
    date: string|undefined;  
    type: string|undefined; 
    constructor() {}
}
  