import { PersonDto } from "./PersonDto";

export class PersonAbsenceDto {
    id: string|undefined;
    person: PersonDto|undefined;
    year: number|undefined;
    month: number|undefined;
    date!: string;  
    type: string|undefined; 
    constructor() {}
}
  