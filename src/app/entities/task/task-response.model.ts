import { Page, PaginationModel } from './page.model';
import {TaskQueryEntry} from "./task.model";


export interface TaskResponseQuery {
  list: {
    entries: TaskQueryEntry [];
    pagination: PaginationModel;
  };
}
