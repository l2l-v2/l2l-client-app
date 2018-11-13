import { Route } from '@angular/router';
import { ProcessInstanceComponent } from './process-instance.component';
import { JhiResolvePagingParams } from 'ng-jhipster';


export const processInstanceRoute: Route = {
  path: 'process-instances',
  component: ProcessInstanceComponent,
  resolve: {
    pagingParams: JhiResolvePagingParams
  },
  data: {
    pageTitle: 'userManagement.home.title',
    defaultSort: 'id,asc'
  }
};

