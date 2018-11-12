import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProcessResponseQuery } from './process-response.model';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable()
export class ProcessInstanceService {


  constructor(
    private http: HttpClient) {
  }

  query(page?: number, size?: number, sortProperty?: string, sortDirection?: string ): Observable<ProcessResponseQuery> {
    let sorting: string;
    if (sortProperty && sortDirection) {
      sorting = `${sortProperty},${sortDirection}`;
    }
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', size + '')
      .set('sort', sorting);

    return this.http
      .get<ProcessResponseQuery>(SERVER_API_URL + `/query/v1/process-instances`, {
        headers: {
          'Accept': 'application/json'
        }, params: params
      }).map((instances: ProcessResponseQuery) => {
        return instances;
      });
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
