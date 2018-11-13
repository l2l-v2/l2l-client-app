import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { TaskResponseQuery } from './task-response.model';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable()
export class TaskService {


  constructor(
    private http: HttpClient) {
  }

  query(page?: number, size?: number, sortProperty?: string, sortDirection?: string ): Observable<TaskResponseQuery> {
    let sorting: string;
    if (sortProperty && sortDirection) {
      sorting = `${sortProperty},${sortDirection}`;
    }
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', size + '')
      .set('sort', sorting);

    return this.http
      .get<TaskResponseQuery>(SERVER_API_URL + `runtime/tasks/`, {
        headers: {
          'Accept': 'application/json'
        }, params: params
      }).map((instances: TaskResponseQuery) => {
        return instances;
      });
  }

  complete(taskId: string) {
    if ( !!taskId) {
      const data = new URLSearchParams();
      data.append( 'action' , 'complete');
      data.append( 'variables' , []);
      return this.http.post(SERVER_API_URL +  `/runtime/tasks/{taskId}`,
        data);
    }
  }
}
