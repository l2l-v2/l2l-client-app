import { Route } from '@angular/router';
import { TaskComponent } from './task.component';
import { JhiResolvePagingParams } from 'ng-jhipster';


export const taskRoute: Route = {
  path: 'tasks',
  component: TaskComponent,
  resolve: {
    pagingParams: JhiResolvePagingParams
  },
  data: {
    pageTitle: 'userManagement.home.title',
    defaultSort: 'id,asc',
    runtimeBundle: 'api-vessel-rb'
  }
};

