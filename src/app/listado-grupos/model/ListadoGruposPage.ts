import { Pageable } from '../page/Pageable';
import { ListadoGrupos } from './ListadoGrupos';

export class ListadoGruposPage {
  content?: ListadoGrupos[];
  pageable?: Pageable;
  totalElements?: number;
}
