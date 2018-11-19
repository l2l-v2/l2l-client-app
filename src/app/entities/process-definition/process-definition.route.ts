import { ActivatedRouteSnapshot, Resolve, Route, RouterStateSnapshot, Routes } from '@angular/router';
import { ProcessDefinitionComponent } from './process-definition.component';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { ProcessStartComponent } from './process-start.component';
import { Injectable } from '@angular/core';
import { ProcessDefinitionService } from './process-definition.service';
import { ProcessDefinition } from './process-definition.model';


@Injectable({ providedIn: 'root' })
export class ProcessDefinitionResolve implements Resolve<any> {
  constructor(private service: ProcessDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['processDefinitionId'] ? route.params['processDefinitionId'] : null;
    if (id) {
      return this.service.queryOne(route.params['runtimeBundle'] , id);
    }
    return new ProcessDefinition();
  }
}
export const processDefinitionRoute: Routes = [
  {
    path: 'process-definitions',
    component: ProcessDefinitionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'runtimeBundle.title',
      defaultSort: 'id,asc',
      runtimeBundle: 'api-vessel-rb'
    }
  },
  {
    path: 'process-definitions/:processDefinitionId/start',
    component: ProcessStartComponent,
    resolve: {
      processDefinition : ProcessDefinitionResolve
    },
    data: {
      pageTitle: 'runtimeBundle.title',
      defaultSort: 'id,asc',
      runtimeBundle: 'api-vessel-rb'
    }
  }
];

