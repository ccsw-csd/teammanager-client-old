import { Person } from './Person';

export class Group {
  name?: string;
  members?: Person[];
  managers?: Person[];
  subgroups?: Group[];
}
