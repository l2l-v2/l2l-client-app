export interface Task {
  assignee?: string;
  createTime?: string;
  delegationState?: string;
  description?: string;
  dueDate?: string;
  execution?: string;
  id?: string;
  name?: string;
  owner?: string;
  parentTask?: string;
  priority?: string;
  processDefinition?: string;
  processInstance?: string;
  suspended?: string;
  taskDefinitionKey?: string;
  url?: string;
  tenantId?: string;
}

export interface TaskQueryEntry {
  entry: task;
}
