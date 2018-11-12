import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */
import { ProcessInstanceComponent } from './process-instance/process-instance.component';
import { entityState } from './entity.route';
import { ProcessInstanceService } from './process-instance/process-instance.service';
import { JhiLanguageHelper } from '../core';
import { JhiLanguageService } from 'ng-jhipster';


@NgModule({
    // prettier-ignore
    imports: [
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
      SharedModule, RouterModule.forChild(entityState)
    ],
    declarations: [ProcessInstanceComponent],
    entryComponents: [ProcessInstanceComponent],
    providers: [   ProcessInstanceService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
