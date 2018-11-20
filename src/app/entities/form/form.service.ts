import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SERVER_API_URL } from 'src/app/app.constants';
import { FormDefinitionModel } from './form.model';

@Injectable()
export class FormService {

  constructor(
    private http: HttpClient) {
  }

  readStartForm(runtimeBundle: string , processDefinitionId: string ): Observable<HttpResponse<FormDefinitionModel>> {
    if (!!runtimeBundle && !!processDefinitionId) {
      return this.http.get<FormDefinitionModel>(SERVER_API_URL + `/${runtimeBundle}/v2/form/${processDefinitionId}`,
        { observe : 'response'});
    }
  }

}
