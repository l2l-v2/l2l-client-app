import { Component, OnInit } from '@angular/core';
import {Task, TaskQueryEntry} from './task.model';
import {TaskDatasource} from './task.datasource';
import {TaskService} from "./task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private   tasks: task[];
  dataSource: TaskDataSource;
  displayedColumns = [ 'id', 'name' , 'owner' , 'parentTask' , 'priority' , 'processDefinition' , 'processInstance' , 'suspended' ];
  total: number;
  constructor(private taskService: TaskService ) { }

  ngOnInit() {
    this.dataSource = new TaskDataSource(this.taskService);
  }

  queryInstances(): void {
    this.dataSource.queryProcessInstance(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  // 需要根据datasource改写

  complete(row: TaskQueryEntry): void {
    this.taskService.complete(row.entry.id)
      .subscribe(
        (response) => {
          const mockRes = <TaskQueryEntry>{
            entry: {
              id: row.entry.id,
              processDefinitionId: row.entry.processDefinitionId,
              taskDefinitionKey: row.entry.taskDefinitionKey,
              assignee: row.entry.assignee,
              status: 'RUNNING'
            }
          };
          this.dataSource.update(mockRes);
          console.log('POST call successful value returned in body');
        },
        (error) => {
          console.log('POST call in error', error.message);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }
}
