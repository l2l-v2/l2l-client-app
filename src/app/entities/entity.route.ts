import { Routes } from '@angular/router';

import {
    processInstanceRoute,
    processDefinitionRoute,
    taskRoute

} from './';

const ENTITY_ROUTES = [
  processInstanceRoute,
  taskRoute,
  ...processDefinitionRoute
];

export const entityState: Routes = [
    {
        path: '',
        children: ENTITY_ROUTES
    }
];
