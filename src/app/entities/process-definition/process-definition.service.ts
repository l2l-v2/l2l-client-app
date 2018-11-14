import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ProcessDefinitionResponse } from './process-definition.model';

@Injectable()
export class ProcessDefinitionService {


  constructor(
    private http: HttpClient) {
  }

  query(runtimeBundle: string , req?: any ): Observable<HttpResponse<ProcessDefinitionResponse[]>> {
    const options = createRequestOption(req);
    return this.http.get<ProcessDefinitionResponse[]>(SERVER_API_URL + `/${runtimeBundle}/v1/process-definitions`,
      {params: options, observe : 'response'});
  }

  suspend(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      return this.http.post(SERVER_API_URL +  + `/${runtimeBundle}/v1/process-instances/${processInstanceId}/suspend`,
        undefined);
    }
  }

  activate(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      return this.http.post(SERVER_API_URL +  `/${runtimeBundle}/v1/process-instances/${processInstanceId}/activate`,
        undefined);
    }
  }
}
