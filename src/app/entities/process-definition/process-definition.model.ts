import { PaginationModel } from '../page.model';

export interface ProcessDefinitionModel {
    id?: string;
    appName?: string;
    appVersion?: string;
    serviceName?: string;
    serviceFullName?: string;
    serviceType?: string;
    serviceVersion?: string;
    key?: string;
    version?: string;
}

export interface ProcessDefinitionEntry {
  entry: ProcessDefinitionModel;
}

export interface ProcessDefinitionResponse {
  list: {
    entries: ProcessDefinitionEntry [];
    pagination: PaginationModel;
  };
}
