import { Route } from '@angular/router';
import { ProcessDefinitionComponent } from './process-definition.component';
import { JhiResolvePagingParams } from 'ng-jhipster';


export const processDefinitionRoute: Route = {
  path: 'process-definitions',
  component: ProcessDefinitionComponent,
  resolve: {
    pagingParams: JhiResolvePagingParams
  },
  data: {
    pageTitle: 'userManagement.home.title',
    defaultSort: 'id,asc',
    runtimeBundle: 'api-vessel-rb'
  }
};

