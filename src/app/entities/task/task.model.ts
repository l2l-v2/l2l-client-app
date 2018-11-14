import { PaginationModel } from '../page.model';

export interface TaskModel {
    id?: string;
    applicationName?: string;
    initiator?: string;
    processDefinitionId?: string;
    processDefinitionKey?: string;
    startDate?: string;
    status?: string;
    lastModified?: string;
}
export interface TaskQueryEntry {
  entry: TaskModel;
}

export interface TaskResponseQuery {
  list: {
    entries: TaskQueryEntry [];
    pagination: PaginationModel;
  };
}
