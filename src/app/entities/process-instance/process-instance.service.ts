import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ProcessInstance } from './process-instance.model';

@Injectable()
export class ProcessInstanceService {


  constructor(
    private http: HttpClient) {
  }

  query(req?: any ): Observable<HttpResponse<ProcessInstance[]>> {
    const options = createRequestOption(req);
    return this.http.get<ProcessInstance[]>(SERVER_API_URL + `/api-vessel-rb/v1/process-instances`, {params: options, observe : 'response'});
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
