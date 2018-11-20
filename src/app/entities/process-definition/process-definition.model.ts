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

export interface ProcessDefinitionsResponse {
  list: {
    entries: ProcessDefinitionEntry [];
    pagination: PaginationModel;
  };
}

// start form
export interface StartProcessPayload {
  id?: string;
  processDefinitionId?: string;
  processDefinitionKey?: string;
  processInstanceName?: string;
  businessKey?: string;
  variables?: Map<string, object>;
}


// class
export class  ProcessDefinition implements  ProcessDefinitionModel {
  constructor(
    public id?: string,
    public appName?: string,
    public appVersion?: string,
    public serviceName?: string,
    public serviceFullName?: string,
    public serviceType?: string,
    public serviceVersion?: string,
    public key?: string,
    public version?: string
  ) {
      this.id = id ? id : null;
      this.appName = appName ? appName : null;
      this.appVersion = appVersion ? appVersion : null;
      this.serviceName = serviceName ? serviceName : null;
      this.serviceFullName = serviceFullName ? serviceFullName : null;
      this.serviceType = serviceType ? serviceType : null;
      this.serviceVersion = serviceVersion ? serviceVersion : null;
      this.key = key ? key : null;
      this.version = version ? version : null;
  }
}
