import { Page, PaginationModel } from './page.model';
import { ProcessInstanceQueryEntry } from './process-instance.model';

export interface ProcessResponseQuery {
  list: {
    entries: ProcessInstanceQueryEntry [];
    pagination: PaginationModel;
  };
}
