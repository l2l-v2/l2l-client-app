import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */
import { ProcessInstanceComponent } from './process-instance/process-instance.component';
import { entityState } from './entity.route';
import { ProcessInstanceService } from './process-instance/process-instance.service';
import { ProcessDefinitionComponent } from './process-definition/process-definition.component';
import { TaskComponent } from './task/task.component';
import { ProcessDefinitionService } from './process-definition/process-definition.service';
import { TaskService } from './task/task.service';


@NgModule({
    // prettier-ignore
    imports: [
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
      SharedModule, RouterModule.forChild(entityState)
    ],
    declarations: [
      ProcessInstanceComponent,
      ProcessDefinitionComponent,
      TaskComponent,
    ],
    entryComponents: [
      ProcessInstanceComponent,
      ProcessDefinitionComponent,
      TaskComponent,
    ],
    providers: [
      ProcessInstanceService,
      ProcessDefinitionService,
      TaskService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule {

}
