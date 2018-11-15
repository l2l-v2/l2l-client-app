import { PaginationModel } from '../page.model';

export interface TaskModel {
  appName?: string;
  appVersion?: string;
  serviceName?: string;
  serviceFullName?: string;
  serviceType?: string;
  serviceVersion?: string;
  id?: string;
  assignee?: string;
  name?: string;
  createdDate?: string;
  priority?: string;
  processDefinitionId?: string;
  processInstanceId?: string;
  status?: string;
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
