import { CenterDto } from "src/app/core/to/CenterDto";
import { PersonDto } from "src/app/core/to/PersonDto";

export class AbsenceDto {
    id?: string;
    center?: CenterDto;
    person?: PersonDto;
    year?: number;
    month?: number;
    date?: Date;
    type?: string;
  }
  