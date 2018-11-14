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
    pageTitle: 'runtimeBundle.title',
    defaultSort: 'id,asc',
    runtimeBundle: 'api-vessel-rb'
  }
};

