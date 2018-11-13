import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ProcessInstanceService } from './process-instance.service';
import { ProcessInstanceQueryEntry } from './process-instance.model';

export class ProcessInstanceDataSource implements DataSource<ProcessInstanceQueryEntry> {

  private processInstanceSubject = new BehaviorSubject<ProcessInstanceQueryEntry[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);

  private processInstances: ProcessInstanceQueryEntry[];


  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();

  constructor(private processService: ProcessInstanceService) { }

  connect(): Observable<any[]> {
    return this.processInstanceSubject.asObservable();
  }

  update(row: ProcessInstanceQueryEntry) {
    const index: number = this.processInstances.findIndex(el => el.entry.id === row.entry.id);
    this.processInstances.splice(index, 1, row);
    this.processInstanceSubject.next(this.processInstances);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.processInstanceSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
 }
}
