import { Routes } from '@angular/router';

import {
    processInstanceRoute
} from './';

const ENTITY_ROUTES = [
  processInstanceRoute
];

export const entityState: Routes = [
    {
        path: '',
        children: ENTITY_ROUTES
    }
];
