import { CenterDto } from "src/app/core/center/centerDto";
import { PersonDto } from "src/app/core/person/personDto";

export class AbsenceDto {
    id?: string;
    center?: CenterDto;
    person?: PersonDto;
    year?: number;
    month?: number;
    date?: Date;
    type?: string;
  }
  