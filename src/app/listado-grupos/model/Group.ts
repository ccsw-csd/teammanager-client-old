import { Person } from './Person';

export class Group {
  id?: number;
  name?: string;
  members?: Person[];
  managers?: Person[];
  subgroups?: Group[];
  publicGroup?: boolean;
  externalId?: string;
}
