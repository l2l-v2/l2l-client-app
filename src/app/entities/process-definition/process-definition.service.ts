import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ProcessDefinitionResponse, StartProcessPayload } from './process-definition.model';

@Injectable()
export class ProcessDefinitionService {


  constructor(
    private http: HttpClient) {
  }

  queryAll(runtimeBundle: string , req?: any ): Observable<HttpResponse<ProcessDefinitionResponse[]>> {
    const options = createRequestOption(req);
    return this.http.get<ProcessDefinitionResponse[]>(SERVER_API_URL + `/${runtimeBundle}/v1/process-definitions`,
      {params: options, observe : 'response'});
  }

  queryOne(runtimeBundle: string , processDefinitionId: string ): Observable<HttpResponse<ProcessDefinitionResponse[]>> {
    return this.http.get<ProcessDefinitionResponse[]>(SERVER_API_URL + `/${runtimeBundle}/v1/process-definitions/${processDefinitionId}`,
      {observe : 'response'});
  }


  readStartForm(runtimeBundle: string , processDefinitionId: string ): Observable<HttpResponse<StartProcessPayload>> {
    if (!!runtimeBundle && !!processDefinitionId) {
      return this.http.get<StartProcessPayload>(SERVER_API_URL + `/${runtimeBundle}/v2/process-definitions/` +
     `${processDefinitionId}/start-form`,
        { observe : 'response'});
    }
  }

}
