import { Pageable } from '../../core/to/Pageable';
import { ListadoGrupos } from './ListadoGrupos';

export class ListadoGruposPage {
  content?: ListadoGrupos[];
  pageable?: Pageable;
  totalElements?: number;
}
